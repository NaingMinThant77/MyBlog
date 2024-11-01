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
    <section className='details'>
      <div className='detail-header'>
        <div>
          <p className='details-title'>{title.toUpperCase()}</p>
          <p className='date'><CalendarDaysIcon className='clockIcon' /><span>{date}</span></p>
        </div>
        <Link to={"/"}><ArrowLeftIcon className='arrowIcon' /></Link>
      </div>
      <img src={image} alt={title} />
      <p className='decription'>{description}</p>
      {
        isToken && <div className='detail-footer'>
          <Link to={`edit-post`}><p className='btn sm'>Edit</p></Link>
          <p className='btn sm' onClick={postDeleteHandler}>Delete</p>
        </div>
      }
      <hr />
    </section>
  )
}

export default PostDetail