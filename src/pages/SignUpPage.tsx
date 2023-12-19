import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { handlePostRequest } from '../utils/api/axios';
import { useMutation, useQueryClient } from 'react-query';

const Container = styled(Box)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const style = {
  alighItems: 'center',
  gap: '2rem',
  padding: '5rem',
  background: '#fff',
  borderRadius: '0.5rem',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
};

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  const queryClient = useQueryClient();

  const validateUsername = (value: string) => {
    const regex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    if (!regex.test(value)) {
      setUsernameError('Invalid username');
    } else {
      setUsernameError('');
    }
  };

  const validateEmail = (value: string) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (!regex.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/;
    if (!regex.test(value)) {
      setPasswordError('Password must be 8-12 digits, including upper and lower case letters');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = useMutation('user', () => handlePostRequest('auth/register', { email, password, username }), {
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries('user');
      setIsSigned(true);
    },
  });

  if (isSigned) return <Navigate to="/login" />;

  return (
    <Container>
      <Stack sx={{ ...style }} component="form" onSubmit={() => handleSubmit.mutateAsync()}>
        <Typography> Sign Up Page</Typography>
        <TextField
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            validateUsername(e.target.value);
          }}
          error={Boolean(usernameError)}
          helperText={usernameError}
          required
          sx={{ width: '60%' }}
        />
        <TextField
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          error={Boolean(emailError)}
          helperText={emailError}
          required
          sx={{ width: '60%' }}
        />
        <TextField
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          error={Boolean(passwordError)}
          helperText={passwordError}
          required
          sx={{ width: '60%' }}
        />
        <TextField
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validateConfirmPassword(e.target.value);
          }}
          error={Boolean(confirmPasswordError)}
          helperText={confirmPasswordError}
          required
          sx={{ width: '60%' }}
        />
        <Stack flexDirection={'row'} gap="1rem">
          <Button type="submit" variant="contained" sx={{ width: '8rem' }}>
            Sign Up
          </Button>
          <Link to="/login" style={{ all: 'unset' }}>
            <Button variant="contained" sx={{ width: '8rem' }}>
              Login
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SignUpPage;
