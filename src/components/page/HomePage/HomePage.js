import React from 'react';
import {Background} from '../../atoms/Index';
import useFetch from '../../../hooks/useFetch.js';
import { Layout   } from '../../organisms/Index';

const HomePage = () => {
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/posts');
  return (
    <Background>
      <Layout>
        <h1>Home Page</h1>
        {loading ? <p>Carregando...</p> : data.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </Layout>
    </Background>
  );
};

export default HomePage;
