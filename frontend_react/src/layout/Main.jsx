import React, { useEffect } from 'react'
import { Outlet, useLoaderData, useSubmit, useNavigation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getExpDuration } from '../util/auth';
import Loader from '../components/Loader';

const Main = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  const { state } = useNavigation();

  useEffect(() => {
    if (!token) { return; }

    if (token === "TOKEN EXP") {
      submit(null, { action: "/logout", method: "post" })
    }

    const duration = getExpDuration(); //calculate time
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" })
    }, [duration]) //setTimeout will work when duration is 0
    console.log(duration)
  }, [token, submit])

  return (
    <section className='main'>
      <Navbar />
      {
        state === "loading" ? (<Loader />) : (<Outlet />)
      }
    </section>
  )
}

export default Main