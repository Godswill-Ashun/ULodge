// src/screens/Manager/RegisterHostelScreen.tsx
import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface Room {
  type: string;
  price: string;
}

export default function RegisterHostelScreen() {
  const navigation = useNavigation();
  const { userRole } = useContext(UserContext);
  const currentUser = auth().currentUser;

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]);

  if (userRole !== 'manager') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Access Denied</Text>
        <Text>You do not have permission to register hostels.</Text>
      </View>
    );
  }

  const handleAddRoom = () => setRooms([...rooms, { type: '', price: '' }]);
  const handleRemoveRoom = (index: number) => {
    const updated = [...rooms];
    updated.splice(index, 1);
    setRooms(updated);
  };
  const handleRoomChange = (index: number, field: 'type' | 'price', value: string) => {
    const updated = [...rooms];
    updated[index][field] = value;
    setRooms(updated);
  };

  const handleRegister = async () => {
    if (!name || !location || rooms.length === 0) {
      Alert.alert('Error', 'Please fill all fields and add at least one room.');
      return;
    }

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      if (!room.type || !room.price || isNaN(Number(room.price))) {
        Alert.alert('Error', `Room ${i + 1} is invalid. Make sure type and price are correct.`);
        return;
      }
    }

    try {
      await firestore().collection('hostels').add({
        name,
        location,
        rooms: rooms.map(r => ({
          type: r.type,
          price: Number(r.price),
          availability: 20 // default availability
        })),
        createdBy: currentUser?.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
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

      <TextInput style={styles.input} placeholder="Hostel Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />

      <Text style={{ fontWeight: 'bold', marginTop: 20, alignSelf: 'flex-start' }}>Rooms</Text>
      {rooms.map((room, index) => (
        <View key={index} style={styles.roomRow}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder="Room Type"
            value={room.type}
            onChangeText={v => handleRoomChange(index, 'type', v)}
          />
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 10 }]}
            placeholder="Price"
            value={room.price}
            onChangeText={v => handleRoomChange(index, 'price', v)}
            keyboardType="number-pad"
          />
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveRoom(index)}>
            <Text style={{ color: '#fff' }}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddRoom}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>+ Add Room</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register Hostel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'green', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10, backgroundColor: '#fff', marginBottom: 10 },
  roomRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  removeButton: { backgroundColor: '#ff4d4d', borderRadius: 5, padding: 10, marginLeft: 10 },
  addButton: { backgroundColor: 'green', borderRadius: 10, padding: 12, marginBottom: 20, alignItems: 'center', width: '100%' },
  button: { backgroundColor: 'green', borderRadius: 25, paddingVertical: 12, paddingHorizontal: 20, width: '80%', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
