// src/screens/ManagerSettingsScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ManagerSettingsScreen() {
  const navigation = useNavigation();

  const handleRegisterHostel = () => {
    navigation.navigate('RegisterHostelScreen' as never);
  };

  const handleEditHostelProfile = () => {
    Alert.alert('Feature', 'Edit Hostel Profile feature coming soon.');
  };

  const handleChangeHostelDetails = () => {
    Alert.alert('Feature', 'Change Hostel Details feature coming soon.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manager Settings</Text>

      <TouchableOpacity style={styles.button} onPress={handleRegisterHostel}>
        <Text style={styles.buttonText}>Register Hostel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleEditHostelProfile}>
        <Text style={styles.buttonText}>Edit Hostel Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleChangeHostelDetails}>
        <Text style={styles.buttonText}>Change Hostel Details</Text>
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
