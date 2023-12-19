/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import user from '../data/user';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.2)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1.4)',
      opacity: 0,
    },
  },
}));

const UserProfilePage = () => {
  return (
    <Box padding={'1rem'}>
      {JSON.stringify(user)}
      {/* 
      <div>a</div>
      <div>a </div>
      <div>a </div>
      <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
      <Avatar alt="Remy Sharp" variant="rounded" />
    </StyledBadge> */}
    </Box>
  );
};

export default UserProfilePage;
