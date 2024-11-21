import { lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { authGuard, userIsLoggedIn } from './navigationGuards';

import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '@/layouts/AdminLayout';

const DashboardPage = lazy(() => import('../pages/app/DashboardPage'));
const CalendarPage = lazy(() => import('../pages/app/CalendarPage'));
const SignUpPage = lazy(() => import('../pages/auth/SignUpPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const PersonalDetalsPage = lazy(
  () => import('../pages/auth/PersonalDetailPage'),
);
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const RestPassword = lazy(() => import('../pages/auth/ResetPasswordPage'));

// ADMIN ROUTES

const AdminLoginPage = lazy(() => import('../pages/admin/auth/LoginPage'));
const AdminOverview = lazy(
  () => import('../pages/admin/dashboard/OverviewPage'),
);
const AdminMealsPage = lazy(() => import('../pages/admin/dashboard/MealsPage'));
const AdminSchedulesPage = lazy(
  () => import('../pages/admin/dashboard/SchedulesPage'),
);

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
        element: <SignUpPage />,
      },
      {
        path: 'personal-details',
        element: <PersonalDetalsPage />,
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
        path: '',
        element: <AdminLayout />,
        children: [
          {
            path: '',
            element: <AdminOverview />,
          },
          {
            path: 'meals',
            element: <AdminMealsPage />,
          },
          {
            path: 'schedules',
            element: <AdminSchedulesPage />,
          },
        ],
      },
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
