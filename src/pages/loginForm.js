import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../api/users";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setToken] = useAuth();

    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: () => login({ username, password }),
        onSuccess: (data) => {
            setToken(data.token)
            navigate('/')
        },
        onError: () => alert('Failed to log in!'),
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        loginMutation.mutate();
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto p-4">

            <input
                type="text"
                name="create-username"
                id="create-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} placeholder="Username"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-black"
            />

            <input
                type="password"
                name="create-password"
                id="create-password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-black" />

            <button
                type="submit"
                disabled={loginMutation.isPending}
                className="mt-2 px-4 py-2 rounded-md border disabled:opacity-60 disabled:cursor-not-allowed hover:text-black hover:bg-white"
            >
                {loginMutation.isPending ? 'Logging in...' : 'Log in'}
            </button>
        </form>
    );
}