import React from 'react';
import PropTypes from 'prop-types'; // Importe o PropTypes
import { UserRegistrationForm } from '../../organisms/Index.js';
import { PageBackground } from '../../molecules/Index.js';
import { Logo } from '../../atoms/Index.js';

const UserRegistrationPage = ({ someProp }) => { // Suponha que someProp seja uma prop que você pode passar
  return (
    <PageBackground>
      <Logo top="5vh" right='50vw' width="auto" height="auto" />
      <UserRegistrationForm />
    </PageBackground>
  );
};

// Definindo PropTypes para o componente UserRegistrationPage
UserRegistrationPage.propTypes = {
  someProp: PropTypes.string, // Exemplo de um propType, ajuste conforme as props reais
};

export default UserRegistrationPage;
