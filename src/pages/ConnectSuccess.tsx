/* eslint-disable jsx-a11y/img-redundant-alt */
import { Button, Stack, Typography } from '@mui/material';
import Image from '../../assets/images/success.png';

const ConnectSuccess = () => {
  const handleCilck = () => {
    window.close();
  };
  return (
    <Stack alignItems={'center'} justifyContent="center" gap={5} height="100%">
      <img src={Image} alt="image" loading="eager" width={250} />
      <Typography fontWeight={900}>Connection Success</Typography>
      <Button variant="contained" onClick={handleCilck}>
        Back To App
      </Button>
    </Stack>
  );
};

export default ConnectSuccess;
