import React from 'react';
import {UserRegistrationForm} from '../../organisms/Index.js';
import {PageBackground} from '../../molecules/Index.js';
import {Logo} from '../../atoms/Index.js';

const UserRegistrationPage = () => {
  return (
    <PageBackground>    
        <Logo top="5vh" right='50vw' width="auto" height="auto" />  
        <UserRegistrationForm />
    </PageBackground>
  );
};

export default UserRegistrationPage;
