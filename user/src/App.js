import './App.css';

// hooks
import useAuth from './hooks/useAuth';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';

const App = () => {
  const { isInitialized } = useAuth();
  return isInitialized ? (
    <ThemeConfig>
      <Router />
    </ThemeConfig>
  ) : (
    'Loading...'
  );
};

export default App;
