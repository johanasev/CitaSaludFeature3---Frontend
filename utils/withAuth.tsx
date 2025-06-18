// utils/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: any, allowedRoles: string[]) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const rol = localStorage.getItem('rol');

      if (!rol || !allowedRoles.includes(rol)) {
        router.replace('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
