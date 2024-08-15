import React from 'react';
import PageBackground from '../../molecules/PageBackground/Index.js';
import UserRegistrationForm from '../../molecules/UserRegistrationForm/Index.js';
import { Typography,  } from '@mui/material';
import { Logo } from 'components/atoms/Index.js';

const UserRegistrationPage = () => {
  return (
    <PageBackground>    

        <Logo top="5vh" left="-50vw" right="10vw" bottom="15vh" />    
        <UserRegistrationForm />
    </PageBackground>
  );
};

export default UserRegistrationPage;
