import React from 'react'
import { Form, Link, useActionData, useNavigation } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import uuid from 'react-uuid';
import { redirect, json } from 'react-router-dom';
import { getToken } from '../util/auth';

function PostForm({ header, btnText, oldPostData, method }) {
    const data = useActionData();
    const navigaion = useNavigation();
    const isSubmitting = navigaion.state === "submitting";

    return (
        <section className="p-6 w-96 mx-auto bg-white shadow-lg rounded-lg mt-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{header}</h1>
                <Link to="/" className="text-indigo-600 hover:underline">
                    <ArrowLeftIcon className="h-6 w-6" />
                </Link>
            </div>
            {data && data.errors && (
                <ul className="text-red-500 text-sm mb-4">
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            )}
            <Form method={method} className="space-y-5">
                <div>
                    <label htmlFor="form-title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="form-title"
                        name="title"
                        required
                        defaultValue={oldPostData?.title || ''}
                        className="mt-1 block w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="form-image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="url"
                        id="form-image"
                        name="image"
                        required
                        defaultValue={oldPostData?.image || ''}
                        className="mt-1 block w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="form-date" className="block text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <input
                        type="date"
                        id="form-date"
                        name="date"
                        required
                        defaultValue={oldPostData?.date || ''}
                        className="mt-1 block w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500 "
                    />
                </div>
                <div>
                    <label htmlFor="form-description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="form-description"
                        name="description"
                        rows="4"
                        required
                        defaultValue={oldPostData?.description || ''}
                        className="mt-1 block w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : btnText}
                </button>
            </Form>
        </section>
    )
}

export default PostForm

// function formatDate(dateString) {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month
//     const day = String(date.getDate()).padStart(2, '0'); // Add leading zero to day
//     return `${year}-${month}-${day}`;
// }

export const action = async ({ request, params }) => {
    const data = await request.formData();
    const token = getToken();

    const postData = { //pure/js object
        id: uuid(),
        title: data.get("title"), //name
        description: data.get("description"),
        image: data.get("image"),
        date: data.get("date"),
    }

    // let url = "http://localhost:8080/posts";
    let url = `${import.meta.env.VITE__DOMAIN}/posts`;
    const method = request.method;

    if (method === "PATCH") {
        const id = params.id;
        url = `${import.meta.env.VITE__DOMAIN}/posts/${id}`
    }

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(postData),
    });

    if (response.status === 422) {
        return response
    }

    if (!response.ok) {
        throw json({ message: "Failed to save post." }, { status: response.status });
    }
    return redirect("/");

}

//https://myblog-frontend-ma1o.onrender.com