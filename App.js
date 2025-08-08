// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./contexts/AuthProvider";
import { EventsProvider } from "./contexts/EventsProvider";
import AppStack from "./navigation/AppStack";

export default function App() {
  return (
    <AuthProvider>
      <EventsProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </EventsProvider>
    </AuthProvider>
  );
}
