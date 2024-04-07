import {createContext, useCallback, useMemo, useState} from "react";
import {useRequest} from "./hooks/request.hook.ts";
import {toast, ToastContainer} from "react-toastify";
import AuthPage from "./pages/AuthPage.tsx";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Navbar from "./components/Navbar.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import CreationPage from "./pages/CreationPage.tsx";
import HomePage from "./pages/HomePage.tsx";


type Auth = {
  isAuth: boolean,
  login: (url: string, credentials: {}) => void,
  logout: () => void
}
export const AuthContext = createContext<Auth>({
  isAuth: !!JSON.parse(String(localStorage.getItem('userData')))?.token,
  login: () => {
  },
  logout: () => {
  }
})

function App() {
  const {request, loading} = useRequest()
  const [isAuth, setIsAuth] = useState(!!JSON.parse(String(localStorage.getItem('userData')))?.token)

  const login = useCallback((url: string, credentials: {}) => {
    request({url, body: credentials, method: 'POST'})
        .then(({token}) => {
          localStorage.setItem('userData', JSON.stringify({
            token
          }))
          setIsAuth(true)
          toast.success('Authorization successful')
        })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('userData')
    setIsAuth(false)
  }, [])

  const contextValue = useMemo(() => ({
    isAuth,
    login,
    logout
  }), [isAuth, login, logout])

  return (
      <div className='w-screen h-screen bg-gray-50'>
        <AuthContext.Provider value={contextValue}>
          <ToastContainer/>
          <BrowserRouter>
            {isAuth && <Navbar/>}
            <div className='flex items-center justify-center w-full h-full'>

              {isAuth && (
                  <Routes>
                    <Route path={'/'} element={<HomePage />} />
                    <Route path={'/create'} element={<CreationPage />} />
                    <Route path='*' element={<Navigate to={'/'} />} />
                  </Routes>
              )}
              {!isAuth && (
                  <Routes>
                    <Route path={'/'} element={<AuthPage loading={loading} />} />
                    <Route path='*' element={<Navigate to={'/'} />} />
                  </Routes>
              )}

            </div>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
  )
}

export default App
