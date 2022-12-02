import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  FormControlLabel,
  Menu,
  MenuItem,
  styled,
  Switch,
  Typography,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_AUTHENTICATION } from '../routes/path';

const settings = ['Profile'];

const Header = (props) => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [themeMode, setThemeMode] = useState(() => {
    const storageTheme = JSON.parse(localStorage.getItem('theme'));
    return storageTheme ?? 'light';
  });

  const handleLogOut = () => {
    logout();
    navigate(PATH_AUTHENTICATION.login);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onChangeTheme = () => {
    if (themeMode === 'light') {
      setThemeMode('dark');
      props.parrentChangeTheme('url(/images/default_theme-night.jpg)');
    } else {
      setThemeMode('light');
      props.parrentChangeTheme('url(/images/default_theme-day.jpg)');
    }
  };

  if (themeMode) {
    const jsonTheme = JSON.stringify(themeMode);
    localStorage.setItem('theme', jsonTheme);
  }

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: '100%' },
          ml: { sm: '240px' },
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="/images/white-brandmark-600x164.png"
            alt="White Brandmark"
            style={{ height: '24px' }}
          />
          <AvatarStyle>
            <FormControlLabel
              style={{ margin: '0 10px' }}
              control={
                <Switch
                  size="small"
                  checked={themeMode === 'dark'}
                  onChange={onChangeTheme}
                  color="error"
                />
              }
              label={themeMode === 'dark' ? <span>🌜</span> : <span>🌞</span>}
            />

            {profile && (
              <Box sx={{ flexGrow: 0, marginLeft: '30px' }}>
                <Tooltip title="Open Infomation">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar {...stringAvatar(profile)} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </AvatarStyle>
        </Toolbar>
      </AppBar>
    </>
  );
};

const AvatarStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  right: 0,
});

export default Header;
