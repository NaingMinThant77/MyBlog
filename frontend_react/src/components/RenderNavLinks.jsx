import React from 'react';
import { NavLink, useRouteLoaderData } from 'react-router-dom';
import { usePostContext } from '../util/PostContext';

const RenderNavLinks = ({ setIsMenuOpen }) => {
    const isToken = useRouteLoaderData("root");
    const { totalPosts } = usePostContext();
    const baseClasses =
        "text-lg font-semibold bg-black p-3 rounded-xl transition-colors";

    return (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `${baseClasses} ${isActive ? 'text-indigo-400' : 'text-white hover:text-indigo-400'}`
                }
                onClick={() => setIsMenuOpen(false)}
            >
                Posts - {totalPosts}
            </NavLink>
            {isToken && (
                <NavLink
                    to="create-post"
                    className={({ isActive }) =>
                        `${baseClasses} ${isActive ? 'text-indigo-400' : 'text-white hover:text-indigo-400'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Create Post
                </NavLink>
            )}
            {!isToken && (
                <NavLink
                    to="/auth?mode=login"
                    className={({ isActive }) =>
                        `${baseClasses} ${isActive ? 'text-indigo-400' : 'text-white hover:text-indigo-400'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                >
                    Login
                </NavLink>
            )}
            {isToken && (
                <NavLink
                    to="/logout"
                    className={`${baseClasses} text-white hover:text-indigo-400`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Logout
                </NavLink>
            )}
        </>
    );
};

export default RenderNavLinks;
