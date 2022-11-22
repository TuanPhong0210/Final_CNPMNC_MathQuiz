import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';

// hooks
import useSettings from '../hooks/useSettings';
//
import './globalSelectors.css';
import token from './token';

interface ThemeConfigProps {
  children: ReactNode;
}

const ThemeConfig = ({ children }: ThemeConfigProps) => {
  const { themeMode } = useSettings();
  const isLight = themeMode === 'light';
  const themeOptions = {
    token: isLight ? { ...token.light } : { ...token.dark },
  };
  return <ConfigProvider theme={themeOptions}>{children}</ConfigProvider>;
};

export default ThemeConfig;
