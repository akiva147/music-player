import { useState } from 'react'
import './App.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout, LoadingIcon } from './pages/Layout'
import { ErrorPage } from './components/common/ErrorPage'
import { GlobalProvider } from './providers/GlobalProvider'
import { HomePage } from './components/common/HomePage'
import { AudioPlayer } from './components/AudioPlayer'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '/song/:songId',
                element: <AudioPlayer />,
            },
            {
                path: '*',
                element: <Navigate to={'/'} replace />,
            },
        ],
    },
])

function App() {
    return (
        <GlobalProvider>
            <RouterProvider router={router} fallbackElement={LoadingIcon} />
        </GlobalProvider>
    )
}

export default App
