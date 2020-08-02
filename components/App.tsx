import React from 'react';
import Head from 'next/head';

import GlobalStyle from '../theme/global';

interface Props {
  children: React.ReactNode;
}
const App = ({ children }: Props) => (
  <>
    <Head>
      <link rel="shortcut icon" type="image/x-icon" href="static/favicon.ico" />
      <link rel="icon" type="image/png" href="static/favicon.png" />
      <link rel="apple-touch-icon" href="static/favicon.png" />
    </Head>
    <GlobalStyle />
    <main>{children}</main>
  </>
);

export default App;
