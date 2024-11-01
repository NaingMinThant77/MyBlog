import React from 'react'
import { json, useLoaderData } from 'react-router-dom'
import PostItem from '../components/PostItem';

const Posts = () => {
    const posts = useLoaderData();

    return (
        <>
            {
                posts.length > 0 ? posts.map(post => (<PostItem key={post.id} post={post} />)) : <h3 className='errorPage'>There is no post now. Please create.</h3>
            }
        </>
    )
}

export default Posts

export const loader = async () => {
    const response = await fetch("http://localhost:8080/posts")
    if (!response.ok) {
        throw json({ message: "Unable to fetch posts." }, { status: response.status });
    } else {
        const data = await response.json();
        return data.posts;
    }
}