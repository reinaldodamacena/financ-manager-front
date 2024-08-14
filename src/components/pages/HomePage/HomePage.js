import React from 'react';
import Navbar from '../../organisms/Navbar/Index';
import LoginForm from '../../molecules/LoginForm/Index';
import useFetch from '../../../hooks/useFetch';

const HomePage = () => {
  const { data, loading } = useFetch('https://api.example.com/data');

  return (
    <div>
        <h1>Home Page</h1>
      <Navbar />
      <main>
        {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
        <LoginForm onSubmit={(data) => console.log(data)} />
      </main>
    </div>
  );
};

export default HomePage;
