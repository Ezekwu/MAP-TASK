import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';

const QuoteDetailsPage = lazy(() => import('@/pages/QuoteDetailsPage'));
const RespondToQuote = lazy(() => import('@/pages/RespondToQuote'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '/procurement/quotes',
        element: <QuoteDetailsPage />,
      },
      {
        path: '/procurement/quotes/respond-to-quote',
        element: <RespondToQuote />,
      },
    ],
  },
]);
export default router;
