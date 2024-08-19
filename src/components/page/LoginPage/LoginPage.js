import React from 'react';
import { PageBackground } from 'components/molecules/Index';
import { LoginForm } from '../../organisms/Index';
import useFetch from '../../../hooks/useFetch.js';
import { Box } from '@mui/material';

const LoginPage = () => {
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/posts');

  return (
    <PageBackground>
        <LoginForm onSubmit={(data) => console.log(data)} />
    </PageBackground>
  );
};

export default LoginPage;
