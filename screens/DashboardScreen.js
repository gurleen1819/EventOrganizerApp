
import React, { useContext, useLayoutEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { EventsContext } from "../contexts/EventsProvider";
import { AuthContext } from "../contexts/AuthProvider";
import EventItem from "../components/EventItem";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen({ navigation }) {
  const { events, loadingEvents, deleteEvent } = useContext(EventsContext);
  const { user, logout } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigation.navigate("Favorites")}>
            <Ionicons name="heart" size={22} color="#ff4d6d" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 6 }} onPress={() => navigation.navigate("CreateEdit")}>
            <Ionicons name="add-circle" size={22} color="#4e91fc" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Alert.alert("Logout", "Do you want to logout?", [{text:"Cancel"},{text:"Logout", onPress: () => logout()}]) }}>
            <Ionicons name="log-out" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, logout]);

  const onDelete = (event) => {
    Alert.alert("Delete event", "Are you sure you want to delete this event?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteEvent(event.id) },
    ]);
  };

  return (
    <View style={styles.container}>
      {loadingEvents ? (
        <Text>Loading events...</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventItem
              event={item}
              onPress={() => navigation.navigate("EventDetail", { event: item })}
              onEdit={() => navigation.navigate("CreateEdit", { event: item })}
              onDelete={() => onDelete(item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={{ padding: 12 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
