// src/screens/SettingsScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('AuthScreen');
    } catch (error: any) {
      Alert.alert('Logout failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings ⚙️</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManagerSettingsScreen' as never)}
      >
        <Text style={styles.buttonText}>Manager Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdminSettingsScreen' as never)}
      >
        <Text style={styles.buttonText}>Admin Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'green', marginBottom: 30 },
  button: {
    backgroundColor: 'green',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  logoutButton: { backgroundColor: '#ff4d4d' },
});
