import React from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { Link, useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError();
    let title = "An Error Occurred!";
    let message = "Something went wrong!";

    if (error.status === 404) {
        title = "Not Found!";
        message = error.data.message || "The requested resource could not be found.";
    } else if (error.status === 422) {
        title = "Validation Error!";
        message = error.data.message || "Please check your input.";
    } else if (error.status === 500) {
        title = "Server Error!";
        message = error.data.message || "An unexpected error occurred on the server.";
    }

    return (
        <section className='errorPage'>
            <div><ExclamationTriangleIcon className='icon' />
                <h1>{title}</h1>
                <p>{message}</p>
                <Link to={"/"}><p className='btn er-btn'>Go back home</p></Link>
            </div>
        </section>
    )
}


export default Error