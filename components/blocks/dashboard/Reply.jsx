import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import markdown from 'markdown-it';
import emoji from 'markdown-it-emoji';
import { Box } from '@material-ui/core';
import Badge from '../badge';

import Typography from "@material-ui/core/Typography";
import { scheme } from '../../../lib/theme';

const ReplyWhen = styled.div`
  color: ${scheme.gray[6]};
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 40px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${scheme.gray[2]};
    ${ReplyWhen} {
      opacity: 1;
    }
  }
`;

const ReplyData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ReplyMeta = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AuthorPicture = styled.div`
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;
  border-radius: 50%;
  background-color: ${scheme.gray[3]};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.picture});
  margin-right: 20px;
`;

const ReplyAuthor = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: ${scheme.gray[8]};
`;

const AuthorUsername = styled.div`
  color: ${scheme.gray[6]};
  margin-left: 5px;
`;

const ReplyContent = styled.div`
  color: ${scheme.gray[8]};

  p {
    margin: 0;
  }
`;

const EmDash = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  color: ${scheme.gray[6]};
`;

const md = new markdown({ linkify: true }).use(emoji);

const Reply = ({ reply }) => {
  return (
    <Container>
      <AuthorPicture picture={reply.author.avatar} />
      <ReplyData>
        <ReplyAuthor>
          <AuthorName>{`${reply.author.name} ${reply.author.lastName}`}</AuthorName>
          <Box display="flex" marginLeft={1} alignItems="flex-end">
            <Typography variant="subtitle2">{reply.author.stars}</Typography>
            <Badge stars={reply.author.stars} />
          </Box>
          <AuthorUsername>@{reply.author.username}</AuthorUsername>
          <ReplyWhen>
            <EmDash>–</EmDash>
            {format(reply.createdAt, 'hh:mm:ss A')}
          </ReplyWhen>
        </ReplyAuthor>
        <ReplyContent dangerouslySetInnerHTML={{ __html: md.render(reply.content) }} />
      </ReplyData>
    </Container>
  );
};

export default Reply;
