export const signup = async ({ name, username, password }) => {
    const res = await fetch(`${process.env.REACT_APP_DATABASE_URL}/api/v1/user/signup`, {
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
    const res = await fetch(`${process.env.REACT_APP_DATABASE_URL}/api/v1/user/login`, {
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
    const res = await fetch(`${process.env.REACT_APP_DATABASE_URL}/api/v1/users/${id}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })
    return await res.json();
}