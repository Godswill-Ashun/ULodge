import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc, Timestamp } from '@react-native-firebase/firestore';
import { RouteProp, useRoute } from '@react-navigation/native';

type ReceiptRouteProp = RouteProp<{ params: { bookingId: string } }, 'params'>;

const ReceiptScreen = () => {
  const route = useRoute<ReceiptRouteProp>();
  const { bookingId } = route.params;
  const [booking, setBooking] = useState<{ name: string; amount: number; date: Timestamp } | null>(null);

  const firestore = getFirestore();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const docRef = doc(firestore, 'bookings', bookingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBooking(docSnap.data() as any);
        }
      } catch (err) {
        console.log('Error fetching booking:', err);
      }
    };
    fetchBooking();
  }, [bookingId, firestore]);

  if (!booking) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Receipt</Text>
      <Text>Name: {booking.name}</Text>
      <Text>Amount: ${booking.amount.toFixed(2)}</Text>
      <Text>Date: {booking.date.toDate().toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  loading: { textAlign: 'center', marginTop: 50 },
});

export default ReceiptScreen;
