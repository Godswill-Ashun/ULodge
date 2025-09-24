// src/context/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from '@react-native-firebase/auth';
import { getFirestore, doc, onSnapshot } from '@react-native-firebase/firestore';

type UserContextType = {
  userRole: string;
  setUserRole: (role: string) => void;
  currentUser: FirebaseUser | null;
};

export const UserContext = createContext<UserContextType>({
  userRole: 'student',
  setUserRole: () => {},
  currentUser: null,
});

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [userRole, setUserRole] = useState('student');
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    let unsubscribeRole: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      // Clean up previous listener if switching users
      if (unsubscribeRole) unsubscribeRole();

      if (user) {
        const userRef = doc(db, 'users', user.uid);

        // Listen for real-time role updates
        unsubscribeRole = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserRole(snapshot.data()?.role || 'student');
          } else {
            setUserRole('student');
          }
        });
      } else {
        setUserRole('student');
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeRole) unsubscribeRole();
    };
  }, []);

  return (
    <UserContext.Provider value={{ userRole, setUserRole, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
