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

const ADMIN_KEY = 'protosets';

export default class AdminKey extends Component {
  state = { open: false, key: '', error: null };
  handleKey = key => {
    this.setState({ key})
  };

  handleOpen = () => {
  if (this.state.key === ADMIN_KEY) {
    this.setState({ open: true})
  } else {
    this.setState({ open: false, error: 'Wrong key, please try again' })
  }
  };

  render() {
    const { error, open } = this.state;
    const { Form } = this.props;
    if (open) return <Form />
    return (
      <Wrapper>
        <FormTitle>ADMIN</FormTitle>
        <FormSubtitle>Please inform your admin key.</FormSubtitle>
        <FormRow>
          <Label>KEY</Label>
          <Input type="password" name="key"  onChange={e => this.handleKey(e.target.value)} />
        </FormRow>
        {error && (
          <FormRow>
            <ErrorField>{error}</ErrorField>
          </FormRow>
        )}
        <FormRow>
          <Button onClick={this.handleOpen}>
            Enter
          </Button>
        </FormRow>
      </Wrapper>
    );
  }
}
