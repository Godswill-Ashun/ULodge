import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdminScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Admin Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
});
