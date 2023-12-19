import twitterSettings from '../../data/Platforms/twitter';
import { StyledSocialAvatar } from '../../pages/styles';
import { useMutation, useQueryClient } from 'react-query';
import { signInWithTwitter } from '../../services/connectService/twitter.connect';

const LoginWithTwitter = () => {
  const queryClient = useQueryClient();

  const handleLogin = useMutation(signInWithTwitter, {
    onSuccess: (res) => {
      localStorage.setItem('token', res.data);
      window.location.href = '/';
      queryClient.invalidateQueries('user');
    },
  });

  return (
    <StyledSocialAvatar
      variant="rounded"
      src={twitterSettings.icon}
      alt={twitterSettings.name}
      sx={{ width: 60, height: 60 }}
      onClick={() => handleLogin.mutate()}
    />
  );
};

export default LoginWithTwitter;
