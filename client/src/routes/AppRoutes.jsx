import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Login from '../pages/Login'
import Dashboard from '../dashboard/pages/Dashboard'
import DashboardBody from '../dashboard/pages/DashboardBody'
import AddProducts from '../dashboard/pages/AddProducts'
import DashboardProducts from '../dashboard/pages/DashboardProducts'
import DashboardProductsDetails from '../dashboard/pages/DashboardProductsDetails'
import DashboardUpdateProducts from '../dashboard/pages/DashboardUpdateProducts'
import { SecureRoute } from './SecureRoute'
import DashboardAdminProfile from '../dashboard/pages/DashboardAdminProfile'


const secureRouteWrapper = (element) => <SecureRoute>{element}</SecureRoute>;

const AppRoutes = () => {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <Login />,
            children: [
                {
                    path:"/home",
                    element: <HomePage />
                }]
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
            children: [
                {
                  path: '/dashboard',
                  element: secureRouteWrapper(<DashboardBody />)
                },
                {
                    path: '/dashboard/addProducts',
                    element: secureRouteWrapper(<AddProducts/>)
                },
                {
                    path: '/dashboard/products',
                    element: secureRouteWrapper(<DashboardProducts/>)
                },
                {
                    path:'/dashboard/products/details/:id',
                    element:secureRouteWrapper(<DashboardProductsDetails/>)
                },
                {
                    path:'/dashboard/products/update/:id',
                    element:secureRouteWrapper(<DashboardUpdateProducts/>)
                },
                {
                    path:'/dashboard/adminProfile',
                    element:secureRouteWrapper(<DashboardAdminProfile/>)
                }
            ]
        }
    ])
    return (
        <div><RouterProvider router={routes} /></div>
    )
}

export default AppRoutes