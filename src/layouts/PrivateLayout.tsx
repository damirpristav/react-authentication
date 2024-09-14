import { useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useGlobalProvider } from 'hooks';
import { Button } from 'components';
import { logout } from 'actions/auth';
import { removeUserFromLS } from 'actions/localStorage';

export const PrivateLayout = ({ children = <Outlet /> }: Props) => {
  const { user, showPageLoader, setUser } = useGlobalProvider();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setUser(null);
      removeUserFromLS();
      toast.success('Successfully logged out!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <>
      {showPageLoader && (
        <div className="page-loading">
          <div className="loader"></div>
        </div>
      )}
      <header className="header">
        <div className="container">
          <Link to="/" className="header__logo">
            <p>Laravel/React Auth</p>
          </Link>
          <div className="header__actions">
            <Button
              label="Logout"
              type="button"
              className="button button--small"
              onClick={onLogout}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </div>
      </header>
      <div className="container">{children}</div>
    </>
  );
};

type Props = {
  children?: JSX.Element;
};
