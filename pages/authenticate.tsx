import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import App from '../components/App';
import Navigation from '../components/blocks/navigation/navigation.component';
import Authentication from '../components/blocks/authenticate/Authentication';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas: 'navigation' 'authentication';
  grid-template-rows: 60px auto;
  grid-template-columns: auto;
`;

const Authenticate = () => {
    return (
      <>
        <Head>
          <title>RFS | Authentication</title>
        </Head>
        <App>
          <Container>
            <Navigation />
            <Authentication />
          </Container>
        </App>
      </>
    );
};
export default Authenticate;
