import { styled } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
//
import Header from './Header';

const MainLayout = () => {
  const [background, setBackground] = useState(() => {
    const storageTheme = JSON.parse(localStorage.getItem('theme'));
    return storageTheme === 'light'
      ? 'url(/images/default_theme-day.jpg)'
      : 'url(/images/default_theme-night.jpg)';
  });
  const onChangeTheme = (themeMode) => {
    setBackground(themeMode);
  };
  return (
    <RootStyle>
      <Header parrentChangeTheme={onChangeTheme} />
      <ContentStyle
        sx={{
          backgroundImage: background,
        }}
      >
        <Outlet />
      </ContentStyle>
    </RootStyle>
  );
};

const RootStyle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
});

const ContentStyle = styled('div')({
  height: '100vh',
  paddingTop: '90px',
  color: '#fff',
});

export default MainLayout;
