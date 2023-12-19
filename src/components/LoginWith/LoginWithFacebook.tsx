import { useMutation, useQueryClient } from 'react-query';
import facebookSettings from '../../data/Platforms/facebook';
import { StyledSocialAvatar } from '../../pages/styles';
import { signInWithFacebook } from '../../services/connectService/facebook.connect';

const LoginWithFacebook = () => {
  const queryClient = useQueryClient();

  const handleLogin = useMutation(signInWithFacebook, {
    onSuccess: (res) => {
      localStorage.setItem('token', res.data);
      window.location.href = '/';
      queryClient.invalidateQueries('user');
    },
  });

  return (
    <StyledSocialAvatar
      variant="rounded"
      src={facebookSettings.icon}
      alt={facebookSettings.name}
      sx={{ width: 60, height: 60 }}
      onClick={() => handleLogin.mutate()}
    />
  );
};

export default LoginWithFacebook;
