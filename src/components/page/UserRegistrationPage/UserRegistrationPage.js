import React from 'react';
import {UserRegistrationForm} from '../../organisms/Index.js';
import {PageBackground} from '../../molecules/Index.js';
import {Logo} from '../../atoms/Index.js';

const UserRegistrationPage = () => {
  return (
    <PageBackground>    
        <Logo top="5vh" left="-50vw" right="10vw" bottom="15vh" />    
        <UserRegistrationForm />
    </PageBackground>
  );
};

export default UserRegistrationPage;
