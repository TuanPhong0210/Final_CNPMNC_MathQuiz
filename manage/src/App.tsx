import { FC } from 'react';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';

const App: FC = () => {
  return (
    <ThemeConfig>
      <Router />
    </ThemeConfig>
  );
};

export default App;
