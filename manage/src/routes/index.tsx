import { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

// config
import { rootResources } from '../config';
// guards
import AuthGuard from '../guards/AuthGuard';
import AccessGuard from '../guards/AccessGuard';
// layouts
import MainLayout from '../layouts/main';
// pages
import Loading from '../pages/external/Loading';
// redux
import { useAppSelector } from '../redux/hooks';
import { selectAccessControl } from '../redux/slices/accessControl';

const PageLoader =
  (Component: React.LazyExoticComponent<(props: any) => JSX.Element>) => (props: any) => {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  };

const Router = () => {
  const { resources } = useAppSelector(selectAccessControl);
  const root = rootResources(resources);
  return useRoutes([
    // Main routes
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Dashboard /> },
        {
          path: 'access-control',
          children: [
            { path: '', element: <Navigate to="/access-control/roles" replace /> },
            {
              path: 'roles',
              element: (
                <AccessGuard
                  accessConditions={root['access control']?.children?.find(
                    (e) => e._id === 'roles'
                  )}
                >
                  <Roles />
                </AccessGuard>
              ),
            },
            {
              path: 'resources',
              element: (
                <AccessGuard
                  accessConditions={root['access control']?.children?.find(
                    (e) => e._id === 'resources'
                  )}
                >
                  <Resources />
                </AccessGuard>
              ),
            },
            {
              path: 'operations',
              element: (
                <AccessGuard
                  accessConditions={root['access control']?.children?.find(
                    (e) => e._id === 'operations'
                  )}
                >
                  <Operations />
                </AccessGuard>
              ),
            },
          ],
        },
      ],
    },
    // Auth routes
    {
      path: 'auth',
      children: [
        { path: '', element: <Navigate to="/auth/login" replace /> },
        { path: 'login', element: <Login /> },
      ],
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
const Roles = PageLoader(lazy(() => import('../pages/access-control/Roles')));
const Resources = PageLoader(lazy(() => import('../pages/access-control/Resources')));
const Operations = PageLoader(lazy(() => import('../pages/access-control/Operations')));
// Auth
const Login = PageLoader(lazy(() => import('../pages/Login')));
// External
const Denied = PageLoader(lazy(() => import('../pages/external/Denied')));
const NotFound = PageLoader(lazy(() => import('../pages/external/NotFound')));
export default Router;
