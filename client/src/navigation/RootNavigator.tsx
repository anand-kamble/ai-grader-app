import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages';
import { DashboardLayout } from '../layouts';

const RootNavigator = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
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
