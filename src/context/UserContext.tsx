import React, { createContext, useState, ReactNode } from 'react';

type UserContextType = {
  userRole: string;
  setUserRole: (role: string) => void;
};

export const UserContext = createContext<UserContextType>({
  userRole: 'student',
  setUserRole: () => {},
});

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [userRole, setUserRole] = useState('student');

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
