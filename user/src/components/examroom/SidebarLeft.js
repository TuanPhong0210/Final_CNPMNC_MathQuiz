import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material';

const drawerWidth = 240;

function SidebarLeft({ questions }) {
  const { window } = questions;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {questions.map((question, index) => (
          <ListItem id={question._id} key={index} disablePadding>
            <ListItemButton>
              {/* <Link href={`#${question._id}`}> */}
              <ListItemTextStyle primary={`Question ${index + 1}: ${question.content}`} />
              {/* </Link> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              position: 'static',
              boxSizing: 'border-box',
              width: drawerWidth,
              height: 'calc(100vh - 104px)',
              color: '#fff',
              backgroundColor: '#461a42',
              borderRadius: '0 16px 16px 0',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

const ListItemTextStyle = styled(ListItemText)({
  height: '24px',
  whiteSpace: 'nowrap',
  span: {
    height: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

SidebarLeft.propTypes = {
  window: PropTypes.func,
};

export default SidebarLeft;
