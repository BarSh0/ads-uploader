// import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
// import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import LogoutIcon from '@mui/icons-material/Logout';
import { List, ListItemButton, ListItemIcon, ListItemText, Stack, styled } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FastForwardIcon from '@mui/icons-material/FastForward';

const Header = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-bottom: rgba(0, 0, 0, 0.05) solid 1px;
`;

const Menu = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="menu desktop">
      <Header>
        <h1 style={{ textAlign: 'center' }}> Adverise</h1>
      </Header>
      <Stack justifyContent={'space-between'} paddingX={'10px'}>
        <List component="nav" aria-label="main mailbox folders">
          {/* <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            component={Link}
            to="/"
            sx={{
              borderRadius: '1rem',
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Automations" />
          </ListItemButton> */}
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            component={Link}
            to="/buisnesses"
            sx={{
              borderRadius: '1rem',
            }}
          >
            <ListItemIcon>
              <FastForwardIcon />
            </ListItemIcon>
            <ListItemText primary="Ads Uploader" />
          </ListItemButton>
          {/* <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
            component={Link}
            to="/connections"
            sx={{
              borderRadius: '1rem',
            }}
          >
            <ListItemIcon>
              <ViewKanbanIcon />
            </ListItemIcon>
            <ListItemText primary="Connections" />
          </ListItemButton> */}
        </List>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            selected={selectedIndex === 5}
            onClick={(event) => handleListItemClick(event, 5)}
            component={Link}
            to="/settings"
            sx={{
              borderRadius: '1rem',
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 6}
            onClick={(event) => handleListItemClick(event, 6)}
            component={Link}
            to="/login"
            sx={{
              borderRadius: '1rem',
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Stack>
    </div>
  );
};

export default Menu;
