// src/screens/ReceiptScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc, Timestamp } from '@react-native-firebase/firestore';
import { useRoute, RouteProp } from '@react-navigation/native';

type ReceiptRouteProp = RouteProp<{ params: { bookingId: string } }, 'params'>;

type Booking = {
  name?: string;
  hostelName?: string;
  location?: string;
  roomType?: string;
  price?: number;
  createdAt?: Timestamp;
};

const ReceiptScreen = () => {
  const route = useRoute<ReceiptRouteProp>();
  const { bookingId } = route.params;

  const [booking, setBooking] = useState<Booking | null>(null);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const docRef = doc(firestore, 'bookings', bookingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBooking(docSnap.data() as Booking);
        } else {
          console.log('No booking found');
        }
      } catch (err) {
        console.log('Error fetching booking:', err);
      }
    };

    fetchBooking();
  }, [bookingId, firestore]);

  if (!booking) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Receipt</Text>
      <Text>Name: {booking.name || 'N/A'}</Text>
      <Text>Hostel: {booking.hostelName || 'N/A'}</Text>
      <Text>Location: {booking.location || 'N/A'}</Text>
      <Text>Room Type: {booking.roomType || 'N/A'}</Text>
      <Text>
        Price: {typeof booking.price === 'number' ? `$${booking.price.toFixed(2)}` : 'N/A'}
      </Text>
      <Text>
        Date:{' '}
        {booking.createdAt && booking.createdAt.toDate
          ? booking.createdAt.toDate().toLocaleString()
          : 'N/A'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  loading: { textAlign: 'center', marginTop: 50 },
});

export default ReceiptScreen;
