import logo from "../assets/logo-small.png";
import {useContext, useState} from "react";
import {AuthContext} from "../App.tsx";
import {Link} from "react-router-dom";

export default function Navbar() {
  const {logout} = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  return (
      <nav className="bg-blue-600 border-gray-200 dark:bg-gray-900 absolute w-full top-0 left-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Logo"/>
            <span
                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FilmStock Tracker</span>
          </Link>
          <button
              onClick={() => setIsOpen(!isOpen)}
              data-collapse-toggle="navbar-default" type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div className={`${isOpen ? 'w-full' : 'hidden'} md:block md:w-auto" id="navbar-default`}>
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
              <li>
                <Link to="/create"
                      className="block py-2 px-3 rounded md:hover:bg-transparent md:border-0 hover:text-gray-300">
                  Create
                </Link>
              </li>
              <li>
                <a href="#"
                   onClick={logout}
                   className="block py-2 px-3 rounded md:hover:bg-transparent md:border-0 hover:text-gray-300">
                  Log out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}
