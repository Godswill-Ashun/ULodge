// src/navigation/AppStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth & Core Screens
import AuthScreen from '../screens/Auth/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import BookingScreen from '../screens/BookingScreen';
import ReceiptScreen from '../screens/ReceiptScreen';

// Admin & Manager Screens
import AdminSettingsScreen from '../screens/Admin/AdminSettingsScreen';
import ManagerSettingsScreen from '../screens/Manager/ManagerSettingsScreen';
import ManageUsersScreen from '../screens/Admin/ManageUsersScreen';
import RegisterHostelScreen from '../screens/Manager/RegisterHostelScreen'; // <- updated path

// User Screens
import SettingsScreen from '../screens/SettingsScreen';

// Define navigation params for type safety
export type RootStackParamList = {
  AuthScreen: undefined;
  HomeScreen: undefined;
  DetailsScreen: { hostel: any };
  BookingScreen: { hostelName?: string; location?: string; roomType?: string; price?: number };
  ReceiptScreen: { bookingId: string };
  AdminSettingsScreen: undefined;
  ManagerSettingsScreen: undefined;
  ManageUsersScreen: undefined;
  SettingsScreen: undefined;
  RegisterHostelScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="AuthScreen">
      {/* Core Auth & Home */}
      <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />

      {/* Admin + Manager */}
      <Stack.Screen name="AdminSettingsScreen" component={AdminSettingsScreen} />
      <Stack.Screen name="ManagerSettingsScreen" component={ManagerSettingsScreen} />
      <Stack.Screen name="ManageUsersScreen" component={ManageUsersScreen} />
      <Stack.Screen name="RegisterHostelScreen" component={RegisterHostelScreen} />

      {/* User Settings */}
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
