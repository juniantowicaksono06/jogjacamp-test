import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import RootLayout from './layout/RootLayout';

const TestLayout = React.lazy(() => import('./pages/TestLayout'));
const TestLayoutForm = React.lazy(() => import('./pages/TestLayoutForm'));
const TestSelect = React.lazy(() => import('./pages/TestSelect'));

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route
                index
                element={
                    <Navigate to="/test-layout" replace />
                }
            />
            <Route 
                path="/test-layout"
                element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <TestLayout />
                    </React.Suspense>
                }
            />
            <Route 
                path="/test-layout-form"
                element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <TestLayoutForm />
                    </React.Suspense>
                }
            />
            <Route 
                path="/test-select"
                element={
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <TestSelect />
                    </React.Suspense>
                }
            />
        </Route>
    )
)

export default Router;