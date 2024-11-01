// Detail.js
import React from 'react';
import { redirect, useLoaderData, useRouteLoaderData, json } from 'react-router-dom';
import PostDetail from '../components/PostDetail';
import { getToken } from '../util/auth';

const Detail = () => {
    // const post = useLoaderData();
    const post = useRouteLoaderData("post-detail")

    return (
        <div>
            <PostDetail post={post} />
        </div>
    );
};

export default Detail;

export const loader = async ({ params }) => {
    const { id } = params;
    const response = await fetch(`http://localhost:8080/posts/${id}`);

    if (!response.ok) {
        throw json({ message: "Post not found" }, { status: 404 });
    }

    const data = await response.json();
    return data.post;
};

export const action = async ({ request, params }) => {
    const id = params.id;
    const response = await fetch(`http://localhost:8080/posts/${id}`, {
        method: request.method,
        headers: {
            Authorization: "Bearer " + getToken(),
        }
    })
    if (!response.ok) {
        throw json({ message: "Failed to delete post." }, { status: response.status });
    }

    return redirect("/");
}
