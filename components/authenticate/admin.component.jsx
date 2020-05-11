import React from 'react';
import styled from 'styled-components';

import AdminFlow from './adminFlow.component';
import AdminKey from "./adminKey.component";

const Authentication = styled.div`
  grid-area: authentication;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
`;

export default () => {
  return (
    <Authentication>
        <AdminKey Form={AdminFlow} />
    </Authentication>
  );
};
