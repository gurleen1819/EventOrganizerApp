// navigation/AppStack.js
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DashboardScreen from "../screens/DashboardScreen";
import CreateEditEventScreen from "../screens/CreateEditEventScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import { AuthContext } from "../contexts/AuthProvider";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // or splash

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: "Events" }} />
          <Stack.Screen name="CreateEdit" component={CreateEditEventScreen} options={{ title: "Create / Edit Event" }} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: "My Favorites" }} />
          <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: "Event" }} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "Sign In" }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "Sign Up" }} />
        </>
      )}
    </Stack.Navigator>
  );
}
