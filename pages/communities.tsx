import React from 'react';
import Head from "next/head";
import styled from "styled-components";
import { ToastContainer } from 'react-toastify';
import App from '../components/App';

import Navigation from "../components/blocks/navigation/navigation.component";
import AllCommunities from '../components/blocks/all-communities/index';

const Dashboard = styled.div`
  grid-template-areas: 'navigation navigation navigation' 'communities threads thread';
  grid-template-rows: 60px auto 100px;
`;

const CommunitiesPage = () => {
  return (
    <>
      <Head>
        <title>RFS | Dashboard</title>
      </Head>
      <App>
        <Dashboard>
          <Navigation />
          <AllCommunities />
        </Dashboard>
        <ToastContainer />
      </App>
    </>
  );
};

export default CommunitiesPage;
