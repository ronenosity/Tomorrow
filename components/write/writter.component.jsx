import React from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

import { scheme } from '../../lib/theme';
import moment from "moment";

const Writter = styled.div`
  grid-area: writter;
  border-right: 1px solid ${scheme.gray[4]};
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

const Title = styled.input`
  border: 0;
  outline: none;
  box-shadow: none;
  background-color: ${scheme.gray[1]};
  height: 60px;
  padding: 0px 40px;
  color: ${scheme.gray[8]};
  font-size: 2.4rem;
  font-weight: 700;
  margin: 20px 0;

  &::placeholder {
    color: ${scheme.gray[5]};
  }
`;
const Text = styled.span`
  border: 0;
  outline: none;
  box-shadow: none;
  background-color: ${scheme.gray[1]};
  color: ${scheme.gray[8]};
  font-size: 2.4rem;
  font-weight: 700;
  &::placeholder {
    color: ${scheme.gray[5]};
  }
`;

const Container = styled.div`
  margin: 20px 35px;
  display: flex;
  flex-direction: column;
`;

const DatePicker = styled.input`
  box-shadow: none;
  border: 1px solid ${scheme.gray[6]};
  background-color: ${scheme.gray[1]};
  color: ${scheme.gray[8]};
  font-size: 1.5rem;
  font-weight: 700;
  width: 200px;
  &::placeholder {
    color: ${scheme.gray[5]};
  }
`;

const WritePaper = styled(Textarea)`
  font-size: 1.4rem;
  resize: none;
  outline: none;
  border: 0;
  background-color: ${scheme.gray[1]};
  color: ${scheme.gray[8]};
  padding: 0 40px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
    sans-serif;

  &::placeholder {
    color: ${scheme.gray[5]};
  }
`;

export default props => {
  return (
    <Writter>
        <Container>
            <Text>Event Date</Text>
            <DatePicker type="date" onChange={e => props.onChangeDate(e.target.value)} placeholder={moment().format('MM/DD/YYYY')} />
        </Container>
        <Title placeholder="What's up?" onChange={e => props.onChangeTitle(e.target.value)} />
        <WritePaper placeholder="Write down all your thoughts..." onChange={e => props.onChangeContent(e.target.value)} />
    </Writter>
  );
};
