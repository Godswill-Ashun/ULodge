import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { userRole, setUserRole } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Role: {userRole}</Text>
      <Button
        title="Go to Booking"
        onPress={() => navigation.navigate('BookingScreen')}
      />
      <Button
        title="Go to Admin"
        onPress={() => navigation.navigate('AdminScreen')}
      />
      <Button title="Reset Role" onPress={() => setUserRole('student')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
});
