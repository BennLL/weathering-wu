import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signup } from "../api/users";


export function Signup() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const signupMutation = useMutation({
        mutationFn: () => signup({ name, username, password }),
        onSuccess: () => navigate('/login'),
        onError: () => alert('Failed to sign up!'),
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        signupMutation.mutate();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-sm mx-auto p-4"
        >
            <input
                type="text"
                name="enter-name"
                id="enter-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-black"
            />

            <input
                type="text"
                name="create-username"
                id="create-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-black"
            />

            <input
                type="password"
                name="create-password"
                id="create-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-black"
            />

            <button
                type="submit"
                disabled={signupMutation.isPending}
                className="mt-2 px-4 py-2 rounded-md border disabled:opacity-60 disabled:cursor-not-allowed hover:text-black hover:bg-white"
            >
                {signupMutation.isPending ? "Creating Account..." : "Sign Up"}
            </button>
        </form>
    );

}