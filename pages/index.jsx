import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { QueryStringProvider } from '../lib/query.context';

import App from '../components/App';
import Navigation from '../components/blocks/navigation/navigation.component';
import Communities from '../components/blocks/dashboard/Communities';
import Threads from '../components/blocks/dashboard/Threads';
import Thread from '../components/blocks/dashboard/Thread';

const Dashboard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas: 'navigation navigation navigation' 'communities threads thread';
  grid-template-rows: 60px auto;
  grid-template-columns: 350px 450px auto;
`;

export default props => {
  return (
    <>
      <Head>
        <title>RFS | Dashboard</title>
      </Head>
      <QueryStringProvider queryString={props.query}>
        <App>
          <Dashboard>
            <Navigation />
            <Communities />
            {props.query.c && <Threads community={props.query.c} />}
            {props.query.t && <Thread community={props.query.c} thread={props.query.t} />}
          </Dashboard>
        </App>
      </QueryStringProvider>
    </>
  );
};
