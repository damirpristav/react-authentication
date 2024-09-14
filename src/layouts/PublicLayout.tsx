import { useGlobalProvider } from 'hooks';
import { Link, Navigate, Outlet } from 'react-router-dom';

export const PublicLayout = ({ children = <Outlet /> }: Props) => {
  const { user, showPageLoader } = useGlobalProvider();

  if (user) {
    return <Navigate to="/" />;
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
            <Link to="/sign-in" className="button button--small">
              Sign in
            </Link>
            <Link to="/sign-up" className="button button--small">
              Sign up
            </Link>
          </div>
        </div>
      </header>
      <div className="public-wrapper">{children}</div>
    </>
  );
};

type Props = {
  children?: JSX.Element;
};
