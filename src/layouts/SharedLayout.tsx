import { Outlet } from 'react-router-dom';

export const SharedLayout = ({ children = <Outlet /> }: Props) => {
  return <div className="public-wrapper">{children}</div>;
};

type Props = {
  children?: JSX.Element;
};
