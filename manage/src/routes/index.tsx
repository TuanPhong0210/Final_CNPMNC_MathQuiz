import { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

// layouts
import MainLayout from '../layouts/main';
// pages
import Loading from '../pages/external/Loading';

const PageLoader =
  (Component: React.LazyExoticComponent<(props: any) => JSX.Element>) => (props: any) => {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  };

const Router = () => {
  return useRoutes([
    // Main routes
    {
      path: '/',
      element: <MainLayout />,
      children: [{ path: '', element: <Dashboard /> }],
    },
    // Auth routes
    {
      path: 'auth',
      children: [{ path: '', element: <Navigate to="/auth/login" replace /> }],
    },
    // External routes
    {
      path: 'external',
      children: [
        { path: '', element: <Navigate to="/external/denied" replace /> },
        { path: 'denied', element: <Denied /> },
      ],
    },
    // Not matched any routes
    {
      path: '*',
      children: [
        { path: '*', element: <Navigate to="/404" replace /> },
        { path: '404', element: <NotFound /> },
      ],
    },
  ]);
};

// Main
const Dashboard = PageLoader(lazy(() => import('../pages/Dashboard')));
// External
const Denied = PageLoader(lazy(() => import('../pages/external/Denied')));
const NotFound = PageLoader(lazy(() => import('../pages/external/NotFound')));

export default Router;
