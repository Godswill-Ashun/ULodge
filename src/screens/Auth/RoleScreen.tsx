import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function RoleScreen() {
  const { setUserRole } = useContext(UserContext);
  const navigation = useNavigation();

  const selectRole = (role: string) => {
    setUserRole(role);
    navigation.navigate(role === 'admin' ? 'Admin' : 'Home');
  };

  return (
    <View style={styles.container}>
      <Text>Select Role:</Text>
      <Button title="Student" onPress={() => selectRole('student')} />
      <Button title="Admin" onPress={() => selectRole('admin')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
});
