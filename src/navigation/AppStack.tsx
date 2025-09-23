import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/Auth/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import BookingScreen from '../screens/BookingScreen';
import ReceiptScreen from '../screens/ReceiptScreen';
import AdminScreen from '../screens/AdminScreen';

export type RootStackParamList = {
  AuthScreen: undefined;
  HomeScreen: undefined;
  DetailsScreen: { hostel: any };
  BookingScreen: { hostelName?: string; location?: string; roomType?: string; price?: number };
  ReceiptScreen: { bookingId: string };
  AdminScreen: undefined;
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
  </Stack.Navigator>
);

export default AppStack;
