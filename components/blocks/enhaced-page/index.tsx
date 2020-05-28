import React from 'react';
import Page from '../page';
import NavBar from '../nav-bar';
// import Footer from '../footer';

interface Props {
  children: React.ReactNode;
}
const EnhancedPage: React.FC<Props> = ({ children }: Props) => {
  return (
    <Page>
      <Page.Header>
        <NavBar />
      </Page.Header>
      <Page.Content>{children}</Page.Content>
      {/*<Page.Footer>*/}
      {/*  <Footer />*/}
      {/*</Page.Footer>*/}
    </Page>
  );
};

export default EnhancedPage;
