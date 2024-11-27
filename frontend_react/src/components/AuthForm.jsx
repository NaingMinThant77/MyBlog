import React from 'react'
import { Link, Form, useSearchParams, useActionData, useNavigation } from 'react-router-dom';

const AuthForm = () => {
    const data = useActionData();
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get("mode") === "login"
    const isSubmitting = navigation.state === "submitting"
    // http://localhost:5173/login?mode=login
    return (
        <section className="flex justify-center items-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <p className="text-lg font-semibold text-center mb-4">
                    {isLogin ? "Login to your account." : "Create your new account."}
                </p>
                {data && data.errors && (
                    <ul className="text-red-500 text-sm mb-4">
                        {Object.values(data.errors).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
                {data && data.message && (
                    <p className="text-green-500 text-sm mb-4">{data.message}</p>
                )}
                <Form method="post" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : isLogin ? "Login" : "Register"}
                    </button>
                </Form>
                <p className="text-sm text-center mt-4">
                    {isLogin ? (
                        <span>
                            Don't have an account?{' '}
                            <Link to="/auth?mode=signup" className="text-indigo-600 hover:underline">
                                Register Here
                            </Link>
                        </span>
                    ) : (
                        <span>
                            Already have an account?{' '}
                            <Link to="/auth?mode=login" className="text-indigo-600 hover:underline">
                                Login Here
                            </Link>
                        </span>
                    )}
                </p>
            </div>
        </section>
    )
}

export default AuthForm