import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled, { keyframes } from 'styled-components';
import Router from 'next/router';

import { scheme } from '../../lib/theme';
import { graphQLErrorHandler } from '../../lib/graphql.utils';

const errorFieldAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 400px;
  background-color: ${scheme.white};
  padding: 20px;
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.div`
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${scheme.gray[8]};
`;

const FormSubtitle = styled.p`
  color: ${scheme.gray[6]};
  margin: 0;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  color: ${scheme.gray[7]};
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: 0;
  box-shadow: none;
  background-color: ${scheme.gray[2]};
  padding: 10px;
  border-radius: 5px;
  font-size: 1.4rem;
`;

const ErrorField = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: ${scheme.red[2]};
  color: ${scheme.gray[8]};
  animation: ${errorFieldAnimation} 0.5s linear;
`;

const Button = styled.button`
  border: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  background-color: ${scheme.gray[8]};
  padding: 10px 20px;
  color: ${scheme.white};
  font-size: 1.4rem;
  border-radius: 5px;

  &:active {
    background-color: ${scheme.gray[7]};
  }
`;

const CREATE_COMMUNITY_MUTATION = gql`
  mutation CREATE_COMMUNITY_MUTATION($name: String!, $description: String!, $picture: String!) {
    createCommunity(name: $name, description: $description, picture: $picture) {
      id
    }
  }
`;

export default class Login extends Component {
  state = { name: '', description: '', picture: '', error: null };

  handleName = name => this.setState({ name });
  handleDescription = description => this.setState({ description });
  handlePicture = picture => this.setState({ picture });
  handleSubmit = callback => {
    const { name, description, picture } = this.state;
    if (name === '' || description === '' || picture === '') {
      return this.setState({ error: 'Some of your fields are empty.' });
    }
    this.setState({ error: null }, async () => {
      const {
        data,
      } = await callback();
      if (!!data) {
        window.location.href = '/';
      }
    });
  };

  render() {
    const { name, description, picture, error } = this.state;
    return (
      <Mutation mutation={CREATE_COMMUNITY_MUTATION} variables={{ name, description, picture }}>
        {(createCommunity, { loading }) => {
          return (
            <Wrapper>
              <FormTitle>Add a new Community</FormTitle>
              <FormRow>
                <Label>Name</Label>
                <Input type="text" name="name" value={name} onChange={e => this.handleName(e.target.value)} />
              </FormRow>
              <FormRow>
                <Label>Description</Label>
                <Input type="text" name="description" value={description} onChange={e => this.handleDescription(e.target.value)} />
              </FormRow>
              <FormRow>
                <Label>Picture</Label>
                <Input type="text" name="picture" value={picture} onChange={e => this.handlePicture(e.target.value)} />
              </FormRow>
              {error && (
                <FormRow>
                  <ErrorField>{error}</ErrorField>
                </FormRow>
              )}
              <FormRow>
                <Button onClick={() => this.handleSubmit(createCommunity)} disabled={loading}>
                  {loading ? 'Creating...' : 'Create'}
                </Button>
              </FormRow>
            </Wrapper>
          );
        }}
      </Mutation>
    );
  }
}
