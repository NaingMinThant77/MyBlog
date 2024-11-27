import React from 'react'
import { CalendarDaysIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';

const PostDetail = ({ post }) => {
  const { description, image, title, date } = post;
  const submit = useSubmit();
  const isToken = useRouteLoaderData("root")

  const postDeleteHandler = () => {
    const confirmStatus = window.confirm("Are you sure want to delete this post?")
    if (confirmStatus) {
      submit(null, { method: "DELETE" });
    }
  }

  return (
    <section className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500 flex items-center">
            <CalendarDaysIcon className="h-5 w-5 mr-2" />
            <span>{date}</span>
          </p>
        </div>
        <Link to="/" className="text-indigo-600 hover:underline">
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
      </div>
      <img src={image} alt={title} className="w-full object-cover rounded-lg mb-4" />
      <p className="text-gray-700 mb-6 text-justify">&emsp;&emsp;{description}</p>
      {isToken && (
        <div className="flex space-x-4 justify-end">
          <button
            className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-100"
            onClick={postDeleteHandler}
          >
            Delete
          </button>
          <Link to="edit-post" className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-100">
            Edit
          </Link>
        </div>
      )}
    </section>
  )
}

export default PostDetail