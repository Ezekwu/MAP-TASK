import { lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { userIsLoggedIn } from './navigationGuards';

import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLoginPage from '@/pages/admin/auth/AdminLoginPage';

const DashboardPage = lazy(() => import('../pages/app/DashboardPage'));
const CalendarPage = lazy(() => import('../pages/app/CalendarPage'));
const RegistrationPage = lazy(() => import('../pages/auth/RegistrationPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const RestPassword = lazy(() => import('../pages/auth/ResetPasswordPage'));

const PageError = lazy(() => import('../components/errors/PageError'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute
        reRouteUrl="/auth/login"
        allowNavigation={userIsLoggedIn()}
      >
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <PageError />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/calendar',
        element: <CalendarPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <ProtectedRoute reRouteUrl="/" allowNavigation={!userIsLoggedIn()}>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'join',
        element: <RegistrationPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password',
        element: <RestPassword />,
      },
    ],
  },
  {
    path: '/admin',
    element: <Outlet />,
    children: [
      {
        path: 'auth',
        element: (
          <ProtectedRoute reRouteUrl="/" allowNavigation={!userIsLoggedIn()}>
            <AuthLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'login',
            element: <AdminLoginPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    // This route is the wildcard. Any route that does not exist would be redirected to this route. replace it with your 404 page.
    element: <Navigate to="/" replace />,
  },
]);
export default router;
