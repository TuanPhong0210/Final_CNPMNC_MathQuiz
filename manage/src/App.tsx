import { FC } from 'react';

// components
import Drawer from './components/Drawer';
// hooks
import useAuth from './hooks/useAuth';
// pages
import Loading from './pages/external/Loading';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';

const App: FC = () => {
  const { isInitialized } = useAuth();
  return isInitialized ? (
    <ThemeConfig>
      <Router />
      <Drawer />
    </ThemeConfig>
  ) : (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Loading />
    </div>
  );
};

export default App;
