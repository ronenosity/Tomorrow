import React from 'react';
import styled from 'styled-components';
import markdown from 'markdown-it';
import emoji from 'markdown-it-emoji';
import moment from 'moment';

import { scheme } from '../../lib/theme';

const Preview = styled.div`
  grid-area: preview;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  border: 0;
  outline: none;
  box-shadow: none;
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

const WritePaper = styled.div`
  font-size: 1.4rem;
  color: ${scheme.gray[8]};
  padding: 0 40px;

  &::placeholder {
    color: ${scheme.gray[5]};
  }
`;

const Text = styled.span`
  border: 0;
  outline: none;
  box-shadow: none;
  padding: 0px 40px;
  background-color: ${scheme.gray[1]};
  color: ${scheme.gray[8]};
  font-size: 2.4rem;
  font-weight: 700;
  &::placeholder {
    color: ${scheme.gray[5]};
  }
`;

const md = new markdown().use(emoji);

export default props => {
  return (
    <Preview>
      <Text dangerouslySetInnerHTML={{ __html: md.render(moment(props.date).format('MM/DD/YYYY')) }} />
      <Title dangerouslySetInnerHTML={{ __html: md.render(props.title) }} />
      <WritePaper dangerouslySetInnerHTML={{ __html: md.render(props.content) }} />
    </Preview>
  );
};
