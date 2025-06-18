// utils/withAuth.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: any, allowedRoles: string[]) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const rol = localStorage.getItem('rol');

        // Solo permitir si existe rol y está en los roles permitidos
        if (rol && allowedRoles.includes(rol)) {
          setIsAuthorized(true);
        } else {
          router.replace('/login');
        }
      }
    }, []);

    if (!isAuthorized) return null; // o un loader si quieres

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
