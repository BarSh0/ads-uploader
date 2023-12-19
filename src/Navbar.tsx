import React from 'react';
import UserAvatar from './components/UserAvatar/UserAvatar';
import { Badge, IconButton, Stack, styled } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useWindowSize from './hooks/useWindowSize';
import MobileMenu from './components/Navbar/MobileMenu';

const IconsStack = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: 0.5rem;
`;

const Navbar = () => {
  const { width } = useWindowSize();

  return (
    <div className="navbar">
      {width < 700 && <MobileMenu />}
      <UserAvatar />
      <IconsStack>
        <IconButton aria-label="settings">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </IconsStack>
    </div>
  );
};

export default Navbar;
