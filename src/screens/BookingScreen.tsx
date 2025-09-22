import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc, Timestamp } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const BookingScreen = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();
  const firestore = getFirestore();

  const handleBooking = async () => {
    setError('');
    try {
      const docRef = await addDoc(collection(firestore, 'bookings'), {
        name,
        amount: parseFloat(amount),
        date: Timestamp.now(),
      });
      navigation.navigate('ReceiptScreen', { bookingId: docRef.id } as never);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Confirm Booking" onPress={handleBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});

export default BookingScreen;
