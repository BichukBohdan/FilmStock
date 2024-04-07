import logo from '../assets/logo-small.png'
import React, {useContext, useState} from "react";
import {AuthContext} from "../App.tsx";
import Spinner from "../components/Spinner.tsx";

export default function AuthPage({loading}: {loading: boolean}) {
  const {login} = useContext(AuthContext)
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true)
  const [userData, setUserData] = useState<{username: string, password: string}>({
    username: '',
    password: '',
  })

  const handleUserField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    login(`/api/auth/${isLoginPage ? 'login' : 'register'}`, userData)
  }

  if (loading) return <Spinner />

  return (
      <section className="bg-gray-50 dark:bg-gray-900 md:min-w-[500px] w-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
                className="w-8 h-8 mr-2"
                src={logo}
                alt="logo"
            />
            FilmStock Tracker
          </a>
          <div
              className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {isLoginPage ? 'Sign in to your account' : 'Registration'}
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                      name="username"
                      id="username"
                      value={userData.username}
                      onChange={handleUserField}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={userData.password}
                      onChange={handleUserField}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isLoginPage ? 'Sign in' : 'Sign up'}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {isLoginPage ? 'Don’t have an account yet?' : 'Already registered?'}{" "}
                  <span
                      onClick={() => setIsLoginPage(!isLoginPage)}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    {isLoginPage ? 'Sign up' : 'Sign in'}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}
