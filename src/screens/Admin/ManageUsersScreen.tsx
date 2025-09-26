import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface User {
  id: string;
  email: string;
  role: 'student' | 'manager' | 'admin';
}

export default function ManageUsersScreen() {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch all users from Firestore
  const fetchUsers = async () => {
    try {
      const querySnapshot = await firestore().collection('users').get();
      const allUsers: User[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        allUsers.push({
          id: docSnap.id,
          email: data.email,
          role: data.role || 'student', // default student
        });
      });
      setUsers(allUsers);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  // Update user role
  const updateUserRole = async (userId: string, newRole: 'student' | 'manager' | 'admin') => {
    try {
      await firestore().collection('users').doc(userId).update({ role: newRole });
      fetchUsers(); // refresh list
    } catch (error: any) {
      Alert.alert('Update Failed', error.message);
    }
  };

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Text style={styles.userEmail}>{item.email}</Text>
      <Text style={styles.userRole}>Role: {item.role}</Text>

      <View style={styles.buttonRow}>
        {item.role !== 'manager' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => updateUserRole(item.id, 'manager')}
          >
            <Text style={styles.buttonText}>Make Manager</Text>
          </TouchableOpacity>
        )}

        {item.role !== 'admin' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => updateUserRole(item.id, 'admin')}
          >
            <Text style={styles.buttonText}>Make Admin</Text>
          </TouchableOpacity>
        )}

        {item.role !== 'student' && (
          <TouchableOpacity
            style={[styles.button, styles.revertButton]}
            onPress={() => updateUserRole(item.id, 'student')}
          >
            <Text style={styles.buttonText}>Revert to Student</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'green', marginBottom: 20 },
  userCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userEmail: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  userRole: { fontSize: 14, color: '#555', marginBottom: 10 },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  button: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  revertButton: { backgroundColor: '#ff4d4d' },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});
