import React from 'react'
import { Form, Link, useActionData } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import uuid from 'react-uuid';
import { redirect, json } from 'react-router-dom';
import { getToken } from '../util/auth';

function PostForm({ header, btnText, oldPostData, method }) {
    const data = useActionData();

    return (
        <section className='form-section'>
            <div className='detail-header'>
                <p>{header}</p>
                <Link to={"/"}><ArrowLeftIcon className='arrowIcon' /></Link>
            </div>
            {
                data && data.errors && (
                    <ul>
                        {
                            Object.values(data.errors).map(err => (
                                <li key={err}>{err}</li>
                            ))
                        }
                    </ul>
                )
            }
            <Form method={method}>
                <div className='form-input'>
                    <label htmlFor="form-title">Title</label>
                    <input type="text" id='form-title' name='title' required defaultValue={oldPostData ? oldPostData.title : ''} />
                </div>
                <div>
                    <label htmlFor="form-image">Image</label>
                    <input type="url" id='form-image' name='image' required defaultValue={oldPostData ? oldPostData.image : ''} />
                </div>
                <div>
                    <label htmlFor="form-date">Date</label>
                    <input type="date" id='form-date' name='date' required defaultValue={oldPostData ? formatDate(oldPostData.date) : ''} />
                </div>
                <div>
                    <label htmlFor="form-description">Description</label>
                    <textarea name="description" id="form-description" rows={5} cols={30} required defaultValue={oldPostData ? oldPostData.description : ''}></textarea>
                </div>
                <button className='btn'>{btnText}</button>
            </Form>
        </section>
    )
}

export default PostForm

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero to day
    return `${year}-${month}-${day}`;
}

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
    let url = `${process.env.REACT_APP_DOMAIN}/posts`;
    const method = request.method;

    if (method === "PATCH") {
        const id = params.id;
        url = `${process.env.REACT_APP_DOMAIN}/posts/${id}`
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