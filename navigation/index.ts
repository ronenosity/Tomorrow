import { useRouter } from 'next/router';
import { useCallback } from 'react';
import ROUTES from './routes';

type NavigateFunction = (options?: Record<any, any>) => void;

export const useNavigateToDashboard = (): NavigateFunction => {
  const router = useRouter();
  return useCallback(
    async (options?: Record<any, any>) => {
      await router.push(ROUTES.DASHBOARD, ROUTES.DASHBOARD, options);
    },
    [router],
  );
};

export default {
  useNavigateToDashboard,
};
