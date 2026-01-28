export const signup = async ({ name, username, password }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/v1/user/signup`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password }),
    })

    if (!res.ok) {
        throw new Error('Failed to sign up!')
    }
    return await res.json();
}

export const login = async ({ username, password }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/v1/user/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
        throw new Error('Failed to log in!')
    }
    return await res.json();
}

export const getUserInfo = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/v1/users/${id}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
    return await res.json();
}

export const updateFavoriteCity = async (id, cityData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/v1/users/${id}/updateFavorite`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cityData)
    })
    return await res.json();
}

export const getUserFavoriteCity = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/v1/users/${id}/getFavorite`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
    return await res.json();
}

export const addToSavedCityList = async (id, cityData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/v1/users/${id}/addToSavedCityList`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cityData)
    })
    return await res.json();
}

export const removeFromSavedCityList = async (id, cityData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/v1/users/${id}/removefromSavedCityList`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cityData)
    })
    return await res.json();
}

export const getFromSavedCityList = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/v1/users/${id}/getFromSavedCityList`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
    return await res.json();
}