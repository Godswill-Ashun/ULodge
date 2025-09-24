// src/screens/RegisterHostelScreen.tsx
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import auth from '@react-native-firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

export default function RegisterHostelScreen() {
  const navigation = useNavigation();
  const { userRole } = useContext(UserContext);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rooms, setRooms] = useState('');
  const [price, setPrice] = useState('');

  const db = getFirestore(); // Native Firestore instance
  const currentUser = auth().currentUser; // Native Auth instance

  // Only managers can register hostels
  if (userRole !== 'manager') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Access Denied</Text>
        <Text>You do not have permission to register hostels.</Text>
      </View>
    );
  }

  const handleRegister = async () => {
    if (!name || !location || !rooms || !price) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (isNaN(Number(rooms)) || isNaN(Number(price))) {
      Alert.alert('Error', 'Rooms and Price must be numbers');
      return;
    }

    try {
      await addDoc(collection(db, 'hostels'), {
        name,
        location,
        rooms: Number(rooms),
        price: Number(price),
        createdBy: currentUser?.uid,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Hostel registered successfully!');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register New Hostel</Text>

      <TextInput
        style={styles.input}
        placeholder="Hostel Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Rooms"
        value={rooms}
        onChangeText={setRooms}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Price per Night"
        value={price}
        onChangeText={setPrice}
        keyboardType="number-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register Hostel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
