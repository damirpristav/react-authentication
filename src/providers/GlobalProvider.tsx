import { getUserFromLS, removeUserFromLS, saveUserToLS } from 'actions/localStorage';
import { getUser } from 'actions/users';
import { createContext, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { User } from 'types';
import { useAxiosInterceptors } from 'hooks';

type GlobalContextProps = {
  user: User | null;
  showPageLoader: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setShowPageLoader: Dispatch<SetStateAction<boolean>>;
  setIsUserFetched: Dispatch<SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContextProps>(undefined!);

export const GlobalProvider = ({ children = <Outlet /> }: Props) => {
  const [user, setUser] = useState<User | null>(getUserFromLS());
  const [showPageLoader, setShowPageLoader] = useState(true);
  const [isUserFetched, setIsUserFetched] = useState(false);

  useAxiosInterceptors(() => {
    setUser(null);
    removeUserFromLS();
  });

  const fetchUser = useCallback(async () => {
    try {
      const res = await getUser();
      setUser(res.data);
      setIsUserFetched(true);
      saveUserToLS(res.data);
    } catch {
      // not authenticated
    } finally {
      setShowPageLoader(false);
    }
  }, []);

  useEffect(() => {
    if (!isUserFetched) {
      fetchUser();
    }
  }, [isUserFetched, fetchUser]);

  return (
    <GlobalContext.Provider value={{ user, showPageLoader, setUser, setShowPageLoader, setIsUserFetched }}>
      {children}
    </GlobalContext.Provider>
  );
};

type Props = {
  children?: JSX.Element;
};
