// src/screens/Auth/AuthScreen.tsx
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const { setUserRole } = useContext(UserContext);
  const navigation = useNavigation();
  const auth = getAuth();

  const handleAuth = async () => {
    setError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setUserRole('student'); // default role
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setUserRole('student'); // simplified for now
      }
      navigation.navigate('HomeScreen' as never); // go to HomeScreen
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title={isSignUp ? 'Sign Up' : 'Login'} onPress={handleAuth} />

      <Text
        style={styles.toggleText}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  toggleText: { textAlign: 'center', color: 'blue', marginTop: 10 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});

export default AuthScreen;
