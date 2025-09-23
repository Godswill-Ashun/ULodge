// src/screens/HomeScreen.tsx
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { hostels } from '../data/hostels'; // ✅ import your data

export default function HomeScreen() {
  const { userRole, setUserRole } = useContext(UserContext);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const filteredHostels = hostels.filter(
    h =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text>Role: {userRole}</Text>

      <TextInput
        style={styles.input}
        placeholder="Search hostels..."
        value={search}
        onChangeText={setSearch}
      />

      <ScrollView style={styles.scroll}>
        {filteredHostels.map(hostel => (
          <TouchableOpacity
            key={hostel.id}
            style={styles.hostelCard}
            onPress={() => navigation.navigate('DetailsScreen', { hostel } as never)}
          >
            {/* ✅ show image */}
            <Image source={hostel.image} style={styles.hostelImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.hostelName}>{hostel.name}</Text>
              <Text>{hostel.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Button title="Go to Admin" onPress={() => navigation.navigate('AdminScreen')} />
      <Button title="Reset Role" onPress={() => setUserRole('student')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
  scroll: { marginBottom: 20 },
  hostelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  hostelImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  hostelName: { fontSize: 18, fontWeight: 'bold' },
});
