// src/screens/BookingScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc, serverTimestamp } from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppStack';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingScreen'>;

const BookingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { hostelName, location, roomType, price } = route.params || {};
  const [fullName, setFullName] = useState('');

  const auth = getAuth();
  const firestore = getFirestore();

  const handleBooking = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to book');
      return;
    }

    try {
      const bookingRef = await addDoc(collection(firestore, 'bookings'), {
        userId: user.uid,
        fullName,
        hostelName: hostelName || 'N/A',
        location: location || 'N/A',
        roomType: roomType || 'N/A',
        price: price || 0,
        createdAt: serverTimestamp(),
      });

      navigation.navigate('ReceiptScreen', { bookingId: bookingRef.id });
    } catch (error: any) {
      Alert.alert('Booking failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Details</Text>
      <Text>Hostel: {hostelName}</Text>
      <Text>Location: {location}</Text>
      <Text>Room Type: {roomType}</Text>
      <Text>Price: {price}</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <Button
        title="Confirm Booking"
        onPress={handleBooking}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 6 },
});

export default BookingScreen;
