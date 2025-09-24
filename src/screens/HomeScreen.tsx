// src/screens/HomeScreen.tsx
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { hostels } from '../data/hostels';

export default function HomeScreen() {
  const { userRole } = useContext(UserContext);
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
      <Text style={styles.role}>Role: {userRole}</Text>

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
            onPress={() =>
              navigation.navigate('DetailsScreen', { hostel } as never)
            }
          >
            <Image source={hostel.image} style={styles.hostelImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.hostelName}>{hostel.name}</Text>
              <Text>{hostel.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Settings button */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('SettingsScreen' as never)}
      >
        <Text style={styles.settingsButtonText}>Settings ⚙️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 10 },
  role: { textAlign: 'center', marginBottom: 10, color: 'green', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  scroll: { marginBottom: 20 },
  hostelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  hostelImage: { width: 80, height: 80, marginRight: 10, borderRadius: 15 },
  hostelName: { fontSize: 18, fontWeight: 'bold', color: 'green' },

  settingsButton: {
    backgroundColor: 'green',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  settingsButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
