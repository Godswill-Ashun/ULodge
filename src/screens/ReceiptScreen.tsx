import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ReceiptScreen({ navigation, route }: any) {
  // For now, mock booking details.
  // Later you can pass real data via route.params
  const bookingDetails = route.params || {
    bookingId: "ABC123",
    date: "2025-09-22",
    room: "Deluxe Room",
    amount: "$100",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Receipt</Text>

      <View style={styles.details}>
        <Text>Booking ID: {bookingDetails.bookingId}</Text>
        <Text>Date: {bookingDetails.date}</Text>
        <Text>Room: {bookingDetails.room}</Text>
        <Text>Amount Paid: {bookingDetails.amount}</Text>
      </View>

      <Button title="Back to Home" onPress={() => navigation.replace("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  details: {
    marginBottom: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
});
