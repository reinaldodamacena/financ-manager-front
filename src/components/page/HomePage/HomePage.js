import React from 'react';
import {PageBackground} from '../../molecules/Index';
import useFetch from '../../../hooks/useFetch.js';
import { NavBar, SideBar   } from '../../organisms/Index';

const HomePage = () => {
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/posts');
  return (
    <PageBackground>

        <NavBar />
        <SideBar />
    </PageBackground>
  );
};

export default HomePage;
