import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import LoginWithFacebook from '../components/LoginWith/LoginWithFacebook';
import LoginWithGoogle from '../components/LoginWith/LoginWithGoogle';
import LoginWithTwitter from '../components/LoginWith/LoginWithTwitter';
import { handlePostRequest } from '../utils/api/axios';

const Container = styled(Box)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled(Stack)`
  gap: 2rem;
  padding: 5rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();

  const handleLogin = useMutation('user', () => handlePostRequest('auth/login', { email, password }), {
    onSuccess: (res) => {
      localStorage.setItem('token', res.data);
      window.location.href = '/';
      queryClient.invalidateQueries('user');
    },
  });

  return (
    <Container>
      <FormBox>
        <Typography textAlign={'center'}>Sign In With</Typography>
        <Stack flexDirection={'row'} gap={3} justifyContent={'center'}>
          <LoginWithTwitter />
          <LoginWithFacebook />
          <LoginWithGoogle />
        </Stack>
        <Typography textAlign={'center'}> Or </Typography>
        <TextField
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <TextField
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <Stack flexDirection={'row'} gap="1rem">
          <Button onClick={() => handleLogin.mutate()} variant="contained" sx={{ width: '8rem' }}>
            Login
          </Button>
          <Link to="/signup" style={{ all: 'unset' }}>
            <Button variant="contained" sx={{ width: '8rem' }}>
              SignUp
            </Button>
          </Link>
        </Stack>
      </FormBox>
    </Container>
  );
};

export default LoginPage;
