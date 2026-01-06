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

    const { data: userInfo } = useQuery({
        queryKey: ['users', userId],
        queryFn: () => getUserInfo(userId),
        enabled: !!userId,
    });

    return (
        <div>
            <div className="titleSection">
                <h1>Weathering WU</h1>
            </div>
            <div className="nav-menu ">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Search
                </NavLink>

                {!token ? (
                    <>
                        <NavLink to="/signup" className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }>
                            Sign Up
                        </NavLink>
                        <NavLink to="/login" className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }>
                            Login
                        </NavLink>
                    </>
                ) : (
                    <div className="user-info">
                        <span>
                            Logged in as <b className="username">{userInfo?.name || "User"}</b>
                        </span>
                        <button
                            onClick={() => setToken(null)}
                            className="logout-btn"
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