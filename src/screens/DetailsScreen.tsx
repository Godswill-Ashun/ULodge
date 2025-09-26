// src/screens/DetailsScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type DetailsRouteProp = RouteProp<{ params: { hostel: any } }, 'params'>;

const DetailsScreen = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation();
  const { hostel } = route.params;

  const [selectedRoom, setSelectedRoom] = useState(hostel.rooms[0]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{hostel.name}</Text>
      <Text style={styles.location}>{hostel.location}</Text>

      <Text style={styles.subtitle}>Available Rooms:</Text>
      {hostel.rooms.map((room: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={[styles.roomCard, selectedRoom.type === room.type && styles.selectedRoom]}
          onPress={() => setSelectedRoom(room)}
        >
          <Text>
            {room.type} - ${room.price} {room.availability !== undefined ? `| Available: ${room.availability}` : ''}
          </Text>
        </TouchableOpacity>
      ))}

      <Button
        title="Book This Room"
        onPress={() => navigation.navigate('BookingScreen', {
          hostelName: hostel.name,
          location: hostel.location,
          roomType: selectedRoom.type,
          price: selectedRoom.price,
        } as never)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  location: { fontSize: 16, marginBottom: 15 },
  subtitle: { fontSize: 18, marginBottom: 10 },
  roomCard: { padding: 15, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  selectedRoom: { backgroundColor: '#d0f0c0', borderColor: '#4caf50' },
});

export default DetailsScreen;
