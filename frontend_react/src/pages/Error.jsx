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
        <section className="min-h-screen flex flex-col items-center justify-center bg-mediumBlue text-white">
            <div className="bg-darkBlue p-6 rounded-lg text-center shadow-lg">
                <div className='flex justify-center items-center'><ExclamationTriangleIcon className="w-32 h-32 mb-4 text-lightBlue" /></div>
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                <p className="mb-4">{message}</p>
                <Link to="/" className="px-4 py-2 bg-lightBlue text-darkBlue rounded-lg hover:bg-white transition">
                    Go back home
                </Link>
            </div>
        </section>
    )
}


export default Error