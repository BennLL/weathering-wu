import { createUser, loginUser, getUserInfoById, updateFavoriteCity, getUserFavoriteCity, getFromSavedCityList, addToSavedCityList, removeFromSavedCityList } from "../services/user.js"

export function userRoutes(app) {
    app.post('/api/v1/user/signup', async (req, res) => {
        try {
            const user = await createUser(req.body)
            return res.status(201).json({ username: user.username })
        } catch (e) {
            return res.status(400).json({
                error: "failed to create the user, does the username already exist?"
            })
        }
    })

    app.post('/api/v1/user/login', async (req, res) => {
        try {
            const token = await loginUser(req.body)
            return res.status(200).send({ token })
        } catch (e) {
            return res.status(400).json({
                error: "login failed, did you enter the correct username/password?"
            })
        }
    })

    app.get('/api/v1/users/:id', async (req, res) => {
        const userInfo = await getUserInfoById(req.params.id)
        return res.status(200).send(userInfo)
    })

    app.post('/api/v1/users/:id/updateFavorite', async (req, res) => {
        try {
            const favorited = await updateFavoriteCity(req.params.id, req.body)
            return res.status(200).json(favorited)
        } catch (e) {
            return res.status(400).json({
                error: "Favoriting city failed."
            })
        }
    })

    app.get("/api/v1/users/:id/getFavorite", async (req, res) => {
        const userFav = await getUserFavoriteCity(req.params.id)
        return res.status(200).send(userFav)
    })

    app.post("/api/v1/users/:id/addToSavedCityList", async (req, res) => {
        try {
            const addedCity = await addToSavedCityList(req.params.id, req.body)
            return res.status(200).json(addedCity)
        } catch (e) {
            return res.status(400).json({
                error: "Adding failed."
            })
        }
    })

    app.post("/api/v1/users/:id/removefromSavedCityList", async (req, res) => {
        try {
            const cityData = req.body;
            const updatedUser = await removeFromSavedCityList(req.params.id, cityData);
            return res.status(200).json(updatedUser)
        } catch (e) {
            return res.status(400).json({
                error: "Removing failed."
            })
        }
    })

    app.get("/api/v1/users/:id/getFromSavedCityList", async (req, res) => {
        try { 
            const userSaved = await getFromSavedCityList(req.params.id)
            return res.status(200).send(userSaved || [])
        } catch (e) { 
            console.error(e);
            return res.status(500).json({ error: "Could not fetch list" });
        }
    })

}

