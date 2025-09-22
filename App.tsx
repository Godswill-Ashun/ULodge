// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';
import { UserProvider } from './src/context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
