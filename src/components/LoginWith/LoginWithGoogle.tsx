import googleSettings from '../../data/Platforms/google';
import { StyledSocialAvatar } from '../../pages/styles';

const LoginWithGoogle = () => {
  return (
    <StyledSocialAvatar
      variant="rounded"
      src={googleSettings.icon}
      alt={googleSettings.name}
      sx={{ width: 60, height: 60 }}
    />
  );
};

export default LoginWithGoogle;
