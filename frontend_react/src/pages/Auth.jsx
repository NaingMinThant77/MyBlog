import React from 'react'
import AuthForm from '../components/AuthForm'
import { redirect, json } from 'react-router-dom'

const Auth = () => {
    return (
        <>
            <AuthForm />
        </>
    )
}

export default Auth
// http://localhost:5173/login?mode=login
export const action = async ({ request }) => {//back of ? - searchParams
    const searchParams = new URL(request.url).searchParams; //ES6
    const mode = searchParams.get("mode")

    if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: "Invalid mode." }, { status: 400 });
    }

    const data = await request.formData();

    const authData = {
        email: data.get("email"),
        password: data.get("password")
    }

    const response = await fetch(`http://localhost:8080/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData)
    })

    // 422 - invalid data, 401 - user credential
    if (response.status === 422 || response.status === 401) {
        return response
    }

    if (!response.ok) {
        throw json({ message: "Authentication failed." }, { status: response.status });
    }

    const resData = await response.json();
    const token = resData.token; //from backend

    localStorage.setItem("token", token);
    // console.log(token)
    const expDate = new Date();
    expDate.setHours(expDate.getHours() + 1);
    localStorage.setItem("exp", expDate.toISOString())

    return redirect("/")
}

