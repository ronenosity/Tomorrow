import React, { useEffect } from 'react';
import { useAuthContext } from '../../contexts/auth';
import { useNavigateToDashboard } from '../../../navigation';

const AdminRoleListener: React.FC = () => {
  const { isAdmin, loading } = useAuthContext();
  const navigateToDashboard = useNavigateToDashboard();
  useEffect(() => {
    if (!isAdmin && !loading) {
      navigateToDashboard();
    }
  }, [isAdmin, loading, navigateToDashboard]);
  return null;
};

export default AdminRoleListener;
