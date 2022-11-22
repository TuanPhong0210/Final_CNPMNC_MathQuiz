import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

// pages
import Loading from '../pages/Loading';

const PageLoader = (Component) => (props) => {
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
            children: [
                { path: '', element: <Home />},
                { path: 'examroom', element: <ExamRoom /> },
                { path: 'score', element: <Score /> },
            ]
        }
    ])
}

export default Router;

const Home = PageLoader(lazy(() => import('../pages/Home')));
const ExamRoom = PageLoader(lazy(() => import('../pages/ExamRoom')));
const Score = PageLoader(lazy(() => import('../pages/Score')));
