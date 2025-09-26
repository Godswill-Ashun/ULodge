// src/screens/Manager/ManagerSettingsScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ManagerSettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manager Settings</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterHostelScreen' as never)}
      >
        <Text style={styles.buttonText}>Register Hostel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManageHostelScreen' as never)}
      >
        <Text style={styles.buttonText}>Manage Hostel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewBookingsScreen' as never)}
      >
        <Text style={styles.buttonText}>View Bookings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'green', textAlign: 'center', marginBottom: 20 },
  button: {
    backgroundColor: 'green',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
