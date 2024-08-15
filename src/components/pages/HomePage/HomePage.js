import React from 'react';
import Navbar from '../../organisms/Navbar/Index';
import LoginForm from '../../molecules/LoginForm/Index';
import useFetch from '../../../hooks/useFetch';
import PageBackground from '../../molecules/PageBackground/Index.js';

const HomePage = () => {
  const { data, loading } = useFetch('https://api.example.com/data');

  return (
    <PageBackground>
      <main>
        {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
        <LoginForm onSubmit={(data) => console.log(data)} />
      </main>
    </PageBackground>
  );
};

export default HomePage;
