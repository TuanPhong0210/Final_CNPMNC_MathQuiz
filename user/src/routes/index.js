import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

// pages
import Loading from '../components/Loading';
// layouts
import MainLayout from '../layouts';

const PageLoader = (Component) => (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};

const Router = () => {
  return useRoutes([
    {
      path: 'auth',
      element: <MainLayout />,
      children: [{ path: 'login', element: <Login /> }],
    },
    // Main routes
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'examroom', element: <ExamRoom /> },
        { path: 'score', element: <Score /> },
      ],
    },
  ]);
};

export default Router;

const Home = PageLoader(lazy(() => import('../pages/Home')));
const ExamRoom = PageLoader(lazy(() => import('../pages/ExamRoom')));
const Score = PageLoader(lazy(() => import('../pages/Score')));
const Login = PageLoader(lazy(() => import('../pages/Login')));
