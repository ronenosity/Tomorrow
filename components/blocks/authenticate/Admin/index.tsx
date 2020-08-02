import React from 'react';

import AdminFlow from '../AdminFlow';
import AdminKey from "../AdminKey";
import { Container } from './styles';

const Admin: React.FC = () => {
    return (
      <Container>
        <AdminKey Form={AdminFlow} />
      </Container>
    );
};

export default Admin;