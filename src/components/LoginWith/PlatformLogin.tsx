import { useMutation, useQueryClient } from 'react-query';
import { StyledSocialAvatar } from '../../pages/styles';

type PlatformSettings = {
  name: string;
  icon: any;
  url: string;
  connect: Function;
  disconnect: Function;
  signIn: Function;
};

const PlatformLogin = ({ settings }: { settings: PlatformSettings }) => {
  const queryClient = useQueryClient();

  console.log(settings);

  const handleLogin = useMutation(settings.signIn(), {
    onSuccess: (res: any) => {
      localStorage.setItem('token', res.data);
      window.location.href = '/';
      queryClient.invalidateQueries('user');
    },
  });

  return (
    <StyledSocialAvatar
      variant="rounded"
      src={settings.icon}
      alt={settings.name}
      sx={{ width: 60, height: 60 }}
      onClick={() => handleLogin.mutate()}
    />
  );
};

export default PlatformLogin;
