import React from 'react';
import LoginForm from '../../molecules/LoginForm/Index';
import useFetch from '../../../hooks/useFetch';
import PageBackground from '../../molecules/PageBackground/Index.js';

const HomePage = () => {
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/posts');
  return (
    <PageBackground>
      <main>
        <LoginForm onSubmit={(data) => console.log(data)} />
      </main>
    </PageBackground>
  );
};

export default HomePage;
