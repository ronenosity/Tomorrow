import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as NewApolloProvider } from '@apollo/react-hooks';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@material-ui/core';
import withApolloClient from '../lib/with-apollo-client';
import theme from '../theme';
import AuthProvider from '../components/contexts/auth';
import CommunitiesProvider from '../components/contexts/communities';
import CategoriesProvider from "../components/contexts/categories";
import "react-datepicker/dist/react-datepicker.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <NewApolloProvider client={apolloClient}>
            <ApolloProvider client={apolloClient}>
              <CookiesProvider>
                <AuthProvider>
                  <CategoriesProvider>
                    <CommunitiesProvider>
                      <Component {...pageProps} />
                    </CommunitiesProvider>
                  </CategoriesProvider>
                </AuthProvider>
              </CookiesProvider>
            </ApolloProvider>
          </NewApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
