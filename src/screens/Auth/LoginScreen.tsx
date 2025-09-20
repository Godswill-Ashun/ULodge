import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => (
  <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
    <Text>Login Screen</Text>
    <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
    <Button title="Go to Role" onPress={() => navigation.navigate('Role')} />
  </View>
);

export default LoginScreen;
