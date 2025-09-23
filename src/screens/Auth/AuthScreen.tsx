import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppStack';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthScreen'>;

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.replace('HomeScreen');
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      navigation.replace('HomeScreen');
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
