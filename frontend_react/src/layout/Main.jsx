import React, { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getExpDuration } from '../util/auth';
import Loader from '../components/Loader';

const Main = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  const { state } = useNavigation();


  useEffect(() => {
    if (!token) return;

    if (token === 'TOKEN EXP') {
      submit(null, { action: '/logout', method: 'post' });
    }

    const duration = getExpDuration();
    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, duration);
  }, [token, submit]);

  return (
    <section className="flex flex-col min-h-screen bg-lightBlue text-darkBlue">
      <Navbar />

      <div
        className={`flex-grow flex items-center justify-center transition-all mt-3 `}
      >
        {state === 'loading' ? <Loader /> : <Outlet />}
      </div>
    </section>
  );
};

export default Main;
