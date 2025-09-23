import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type DetailsRouteProp = RouteProp<{ params: { hostel: any } }, 'params'>;

const DetailsScreen = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation();
  const { hostel } = route.params;

  const [selectedRoom, setSelectedRoom] = useState(hostel.rooms[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{hostel.name}</Text>
      <Text style={styles.location}>{hostel.location}</Text>

      <Text style={styles.subtitle}>Available Rooms:</Text>
      {hostel.rooms.map(room => (
        <TouchableOpacity
          key={room.type}
          style={[
            styles.roomCard,
            selectedRoom.type === room.type && styles.selectedRoom
          ]}
          onPress={() => setSelectedRoom(room)}
        >
          <Text>{room.type} - ${room.price}</Text>
        </TouchableOpacity>
      ))}

      <Button
        title="Book This Room"
        onPress={() =>
          navigation.navigate('BookingScreen', {
            hostelName: hostel.name,
            location: hostel.location,
            roomType: selectedRoom.type,
            price: selectedRoom.price
          } as never)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  location: { fontSize: 16, marginBottom: 15 },
  subtitle: { fontSize: 18, marginBottom: 10 },
  roomCard: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },
  selectedRoom: {
    backgroundColor: '#d0f0c0',
    borderColor: '#4caf50'
  },
});

export default DetailsScreen;
