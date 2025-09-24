// src/navigation/AppStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/Auth/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import BookingScreen from '../screens/BookingScreen';
import ReceiptScreen from '../screens/ReceiptScreen';
import AdminScreen from '../screens/AdminScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ManagerSettingsScreen from '../screens/ManagerSettingsScreen';
import AdminSettingsScreen from '../screens/AdminSettingsScreen';
import RegisterHostelScreen from '../screens/RegisterHostelScreen';

export type RootStackParamList = {
  AuthScreen: undefined;
  HomeScreen: undefined;
  DetailsScreen: { hostel: any };
  BookingScreen: { hostelName?: string; location?: string; roomType?: string; price?: number };
  ReceiptScreen: { bookingId: string };
  AdminScreen: undefined;
  SettingsScreen: undefined;
  ManagerSettingsScreen: undefined;
  AdminSettingsScreen: undefined;
  RegisterHostelScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => (
  <Stack.Navigator initialRouteName="AuthScreen">
    <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    <Stack.Screen name="BookingScreen" component={BookingScreen} />
    <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />
    <Stack.Screen name="AdminScreen" component={AdminScreen} />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    <Stack.Screen name="ManagerSettingsScreen" component={ManagerSettingsScreen} />
    <Stack.Screen name="AdminSettingsScreen" component={AdminSettingsScreen} />
    <Stack.Screen name="RegisterHostelScreen" component={RegisterHostelScreen} />
  </Stack.Navigator>
);

export default AppStack;
