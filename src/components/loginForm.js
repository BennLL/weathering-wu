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
        <form onSubmit={handleSubmit}>

            <input type="text" name="create-username" id="create-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />

            <input type="password" name="create-password" id="create-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

            <button type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? 'Logging in...' : 'Log in'}
            </button>
        </form>
    );
}