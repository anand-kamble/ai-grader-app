import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Home, Login } from '../pages';
import { DashboardLayout } from '../layouts';
import { Header, Toast } from '../components';



const RootNavigator = () => {
    return (
        <>
            <BrowserRouter>
            <Header />
            <Toast />
                <Routes>
                    <Route path="/" element={<Home/>} />

                    <Route path="/login" element={<Login/>} />

                    <Route path="/dashboard" element={
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    } />

                    <Route path="/dashboard/:course" element={
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    } />

                    <Route path="*" element={<div>404</div>} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RootNavigator;
