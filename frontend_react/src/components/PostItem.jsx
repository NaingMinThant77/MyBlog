import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';

const PostItem = ({ post, index }) => {
    const { id, title, date, image } = post;
    return (
        <section className=" w-96 mx-auto bg-white p-4 rounded-lg shadow-lg">
            <button className='border border-blue-700 px-2 mb-2 rounded-xl'>No-{index + 1}</button>
            <Link to={`${id}`}>
                <img
                    src={image}
                    alt={title}
                    className="h-40 object-cover w-full rounded"
                />
            </Link>
            <Link to={`${id}`}><p className="text-center text-l font-semibold mt-2 truncate whitespace-nowrap overflow-hidden">{title}</p></Link>
            <p className="flex items-center gap-2 text-gray-600 mt-2">
                <CalendarDaysIcon className="w-5 h-5" />
                <span>{date}</span>
            </p>
        </section>

    );
};

export default PostItem;
