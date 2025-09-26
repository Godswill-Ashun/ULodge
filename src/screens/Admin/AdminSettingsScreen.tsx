// C:\Users\AMG\Project\ULodge\src\screens\Admin\AdminSettingsScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function AdminSettingsScreen() {
  const navigation = useNavigation();

  // Navigation handlers
  const handleRegisterHostel = () => navigation.navigate('RegisterHostelScreen' as never);
  const handleManageHostels = () => navigation.navigate('ManageHostelsScreen' as never);
  const handleViewBookings = () => navigation.navigate('ViewBookingsScreen' as never);
  const handleManageUsers = () => navigation.navigate('ManageUsersScreen' as never);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.reset({ index: 0, routes: [{ name: 'AuthScreen' as never }] });
    } catch (error: any) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Settings</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={handleRegisterHostel}>
          <Text style={styles.cardText}>Register Hostel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleManageHostels}>
          <Text style={styles.cardText}>Manage Hostels</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleViewBookings}>
          <Text style={styles.cardText}>View Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleManageUsers}>
          <Text style={styles.cardText}>Manage Users</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.logoutCard]} onPress={handleLogout}>
          <Text style={styles.cardText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    gap: 15,
  },
  card: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutCard: {
    backgroundColor: '#ff4d4d',
  },
});
