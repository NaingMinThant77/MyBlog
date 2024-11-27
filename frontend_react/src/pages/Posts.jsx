import React, { useEffect, useState } from 'react';
import { json, useLoaderData } from 'react-router-dom';
import PostItem from '../components/PostItem';

import { usePostContext } from '../util/PostContext';

const Posts = () => {
    const posts = useLoaderData();

    const { setTotalPosts } = usePostContext();
    const totalPosts = posts.length;

    useEffect(() => {
        setTotalPosts(totalPosts);
    }, [totalPosts, setTotalPosts]);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2;

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const maxPaginationButtons = 5;

    // Calculate posts to display on the current page
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

    // Calculate the range of pagination buttons to display
    const startPage = Math.max(1, currentPage - Math.floor(maxPaginationButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPaginationButtons - 1);
    // const paginationButtons = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    const paginationButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        paginationButtons.push(i);
    }


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="h-96 flex flex-col justify-center items-center gap-4">
            {posts.length > 0 ? (
                <>
                    {/* Display Current Posts */}
                    <div className="flex flex-col flex-f gap-3">
                        {currentPosts.map((post, index) => (
                            <PostItem key={post.id} post={post} index={startIndex + index} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className=" flex justify-center items-center gap-2 ">
                        {/* Prev Button */}
                        <button
                            className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-400'}`}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Prev
                        </button>

                        {/* Pagination Buttons */}
                        {paginationButtons.map(page => (
                            <button
                                key={page}
                                className={`px-4 py-2 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-300'}`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-400'}`}
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <h3 className="errorPage">There is no post now. Please create.</h3>
            )}
        </div>
    );
};

export default Posts;

export const loader = async () => {
    const response = await fetch(`${import.meta.env.VITE__DOMAIN}/posts`);
    if (!response.ok) {
        throw json({ message: "Unable to fetch posts." }, { status: response.status });
    } else {
        const data = await response.json();
        return data.posts;
    }
};
