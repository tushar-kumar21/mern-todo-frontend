import React from 'react'
import MernComp from './MernComp';
import { createBrowserRouter, Route, RouterProvider, useNavigate } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';

const App = () => {

      const router = createBrowserRouter([
        {
            path: '/',
            element: <MernComp/>
        },
        {
            path: '/register',
            element: <Register/>
        },
        {
            path: '/login',
            element: <Login/>
        }
    ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App;