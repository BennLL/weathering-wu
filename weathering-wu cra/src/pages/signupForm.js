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
            className="signup-form"
        >
            <input
                type="text"
                name="enter-name"
                id="enter-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="signup-input"
            />

            <input
                type="text"
                name="create-username"
                id="create-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="signup-input"
            />

            <input
                type="password"
                name="create-password"
                id="create-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="signup-input"
            />

            <button
                type="submit"
                disabled={signupMutation.isPending}
                className="signup-button"
            >
                {signupMutation.isPending ? "Creating Account..." : "Sign Up"}
            </button>
        </form>
    );
}