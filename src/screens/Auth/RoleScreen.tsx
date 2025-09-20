import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Role'>;

const RoleScreen = ({ navigation }: Props) => (
  <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
    <Text>Role Screen</Text>
    <Button title="Go to Home" onPress={() => navigation.replace('Home')} />
  </View>
);

export default RoleScreen;
