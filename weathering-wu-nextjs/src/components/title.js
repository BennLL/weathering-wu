"use client";

import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { getUserInfo } from '../api/users.js';

function Title() {
    const [token, setToken] = useAuth();
    const pathname = usePathname();

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

    const getLinkClass = (path) => {
        return pathname === path ? "nav-link active" : "nav-link";
    };

    return (
        <div>
            <div className="titleSection">
                <h1>Weathering WU</h1>
            </div>
            <div className="nav-menu ">
                {!token ? (
                    <>
                        <Link href="/" className={getLinkClass("/")}>
                            Search
                        </Link>

                        <Link href="/signup" className={getLinkClass("/signup")}>
                            Sign Up
                        </Link>

                        <Link href="/login" className={getLinkClass("/login")}>
                            Login
                        </Link>
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