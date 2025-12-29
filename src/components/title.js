import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { getUserInfo } from '../api/users.js';

function Title() {
    const [token, setToken] = useAuth();

    let userId = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userId = decoded.sub || decoded.id || decoded._id;
        } catch (e) {
            console.error("Invalid token", e);
        }
    }

    const { data: userInfo, isLoading } = useQuery({
        queryKey: ['users', userId],
        queryFn: () => getUserInfo(userId),
        enabled: !!userId,
    });

    return (
        <div>
            <div className="titleSection">
                <h1>Weathering WU</h1>
            </div>
            <div className="flex flex-row gap-6 justify-center p-6 ">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-black" : "text-white hover:bg-white/10"
                        }`
                    }
                >
                    Search
                </NavLink>

                {!token ? (
                    <>
                        <NavLink to="/signup" className={({ isActive }) =>
                            `px-4 py-2 rounded-md transition-all ${isActive ? "bg-white text-black" : "text-white hover:bg-white/10"}`
                        }>
                            Sign Up
                        </NavLink>
                        <NavLink to="/login" className={({ isActive }) =>
                            `px-4 py-2 rounded-md transition-all ${isActive ? "bg-white text-black" : "text-white hover:bg-white/10"}`
                        }>
                            Login
                        </NavLink>
                    </>
                ) : (
                    <div className="flex items-center gap-4 text-white">
                        <span>
                            Logged in as <b className="text-blue-400">{userInfo?.name || "User"}</b>
                        </span>
                        <button
                            onClick={() => setToken(null)}
                            className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Title