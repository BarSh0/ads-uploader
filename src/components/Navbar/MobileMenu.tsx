import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { List, ListItemButton, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledIconButton = styled(IconButton)`
  border-radius: 0.5rem !important;
`;

export default function MobileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <StyledIconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon fontSize="large" />
      </StyledIconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
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
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
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
          </ListItemButton>
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
        </List>
      </Menu>
    </React.Fragment>
  );
}