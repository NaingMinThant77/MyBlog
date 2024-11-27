import React, { createContext, useState, useContext } from 'react';

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
    const [totalPosts, setTotalPosts] = useState(0);

    return (
        <PostContext.Provider value={{ totalPosts, setTotalPosts }}>
            {children}
        </PostContext.Provider>
    );
};
