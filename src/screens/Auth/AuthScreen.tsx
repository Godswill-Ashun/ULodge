// src/screens/Auth/AuthScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from '@react-native-firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppStack';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthScreen'>;

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const auth = getAuth(); // Modular Auth
  const firestore = getFirestore(); // Modular Firestore

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Automatic navigation on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('HomeScreen'); // Navigate once user is confirmed
      }
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth, navigation]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation is handled by onAuthStateChanged
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create Firestore document for the new user
      await setDoc(doc(firestore, 'users', user.uid), {
        role: 'student',
        managerOfHostels: [],
        isDeveloper: false,
        displayName: user.displayName || '',
        email: user.email,
        createdAt: serverTimestamp(),
      });

      // Navigation handled by onAuthStateChanged
    } catch (error: any) {
      Alert.alert('Signup failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ULodge Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6 },
});

export default AuthScreen;
