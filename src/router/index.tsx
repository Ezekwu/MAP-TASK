import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { userIsLoggedIn } from './navigationGuards';

import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

const DashboardPage = lazy(() => import('../pages/app/DashboardPage'));
const RegistrationPage = lazy(() => import('../pages/auth/RegistrationPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));

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
    children: [
      {
        path: '/',
        element: <DashboardPage />,
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
    ],
  },
]);
export default router;
