import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import { Avatar, ListItemIcon, Tooltip, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';

const StyledLink = styled(Link)`
  all: unset;
  font-size: 3rem;
  cursor: pointer;
`;

const UserStack = styled(Stack)`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: 0.5rem;
  flex-direction: row !important;
  padding: 0.5rem;
  align-items: center;
  gap: 2rem;
`;

const UserAvatar = () => {
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    setAnchorEl(null);
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <UserStack>
      <Tooltip title="User Profile" arrow>
        <Avatar
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          alt="Bar Shoshani"
          src={user?.picture}
          variant="rounded"
          sx={{ width: 50, height: 50, borderRadius: '.5rem', cursor: 'pointer' }}
        />
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar src={user?.picture} /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Stack gap={0.5}>
        <StyledLink to="/user-profile">
          <Typography fontWeight={900} textAlign="initial">
            {user?.username}
          </Typography>
        </StyledLink>
        <Typography fontSize={12}> CEO / Co-Founder </Typography>
      </Stack>
    </UserStack>
  );
};

export default UserAvatar;
