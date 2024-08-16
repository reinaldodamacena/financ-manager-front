import React from 'react';
import {LoginForm,PageBackground} from '../../molecules/Index';
import useFetch from '../../../hooks/useFetch.js';

const LoginPage = () => {
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/posts');
  return (
    <PageBackground>
      <main>
        <LoginForm onSubmit={(data) => console.log(data)} />
      </main>
    </PageBackground>
  );
};

export default LoginPage;
