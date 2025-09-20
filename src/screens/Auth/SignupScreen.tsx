import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => (
  <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
    <Text>Signup Screen</Text>
    <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
  </View>
);

export default SignupScreen;
