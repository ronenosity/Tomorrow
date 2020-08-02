import React from 'react';

import { Container } from './styles';

import Login from '../Login';
import Register from '../Register';


const Authentication = () => {
    return (
      <Container>
        <Login />
        <Register />
      </Container>
    );
};

export default Authentication;
