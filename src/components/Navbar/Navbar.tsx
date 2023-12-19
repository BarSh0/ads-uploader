import ChatIcon from '@mui/icons-material/Chat';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, Stack } from '@mui/material';
import UserAvatar from '../UserAvatar/UserAvatar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  all: unset;
  cursor: pointer;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.5rem;
`;

const routes = [
  {
    name: 'Automations',
    path: '/',
    icon: <ChatIcon fontSize="large" />,
  },
  {
    name: 'Connections',
    path: '/connections',
    icon: <FormatListBulletedIcon fontSize="large" />,
  },
];

const Navbar = () => {
  return (
    <Stack flexDirection={'row-reverse'} height="100%" alignItems="center" justifyContent={'space-between'}>
      <StyledLink to="/settings">
        <SettingsIcon fontSize="large" />
        Settings
      </StyledLink>
      <Stack flexDirection={'row-reverse'} alignItems="center" justifyContent="space-evenly" gap={3}>
        {routes.map((route) => (
          <span key={route.name}>
            <StyledLink to={route.path}>
              {route.icon}
              {route.name}
            </StyledLink>
            <Divider orientation="vertical" flexItem sx={{ borderColor: 'white' }} />
          </span>
        ))}
      </Stack>
      <UserAvatar />
    </Stack>
  );
};

export default Navbar;
