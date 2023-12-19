import { Avatar, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { useMutation, useQueryClient } from 'react-query';
import { platformSettings } from '../../data/Platforms';
import useAuth, { IUser } from '../../hooks/useAuth';
import { handlePutRequest } from '../../utils/api/axios';
import { toast } from 'react-hot-toast';

const StyledSocialAvatar = styled(Avatar)`
  border-radius: 1rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;

const PlatformConnect = (platform: platformSettings) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const updateTokens = useMutation((variables: any) => handlePutRequest('/users/me', variables), {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });
  const onDisconnect = async () => {
    if (!platform.disconnect) {
      window.alert('This platform is not supported yet');
      return;
    }
    platform.disconnect();
    await updateTokens.mutateAsync({ platform: platform.name, isConnect: false });
    toast.success('Disconnected successfully');
  };

  const onConnect = async () => {
    let res;
    if (!platform.connect) {
      window.alert('This platform is not supported yet');
      return;
    }
    res = await platform.connect();
    res.platform = platform.name;
    res.isConnect = true;
    updateTokens.mutateAsync(res);
    toast.success('Connected successfully');
  };
  const platformName = platform.name as keyof IUser['platforms'];
  const isConnected = user?.platforms ? user?.platforms[platformName]?.isConnect : false;

  return (
    <Stack flexDirection={'row'} alignItems="center">
      <Stack flexDirection={'row'} gap={2} alignItems="center" flex={9}>
        <StyledSocialAvatar variant="rounded" src={platform.icon} alt={platform.name} sx={{ width: 60, height: 60 }} />
        <Stack flexDirection={'column'}>
          <Typography textTransform={'capitalize'} fontWeight={900}>
            {platform.name}
          </Typography>
          <Typography fontSize={12}>Lorem ipsum dolor sit amet </Typography>
        </Stack>
      </Stack>
      <div style={{ flex: 3 }}>
        {!isConnected ? (
          <Button variant="contained" onClick={onConnect} fullWidth>
            Connect
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={onDisconnect} fullWidth>
            Connected
          </Button>
        )}
      </div>
    </Stack>
  );
};

export default PlatformConnect;
