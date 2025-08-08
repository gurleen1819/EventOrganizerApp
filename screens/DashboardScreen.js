import React, { useContext, useLayoutEffect, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert, TextInput } from "react-native";
import { EventsContext } from "../contexts/EventsProvider";
import { AuthContext } from "../contexts/AuthProvider";
import EventItem from "../components/EventItem";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen({ navigation }) {
  const { events, loadingEvents, deleteEvent } = useContext(EventsContext);
  const { logout } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <TextInput
          placeholder="Search events..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          clearButtonMode="while-editing"
        />
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ marginRight: 12 }}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons name="notifications-outline" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 12 }}
            onPress={() => navigation.navigate("Favorites")}
          >
            <Ionicons name="heart" size={22} color="#ff4d6d" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 6 }}
            onPress={() => navigation.navigate("CreateEdit")}
          >
            <Ionicons name="add-circle" size={22} color="#4e91fc" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Logout", "Do you want to logout?", [
                { text: "Cancel" },
                { text: "Logout", onPress: () => logout() },
              ]);
            }}
          >
            <Ionicons name="log-out" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, logout, searchText]);

  const onDelete = (event) => {
    Alert.alert("Delete event", "Are you sure you want to delete this event?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteEvent(event.id) },
    ]);
  };

  // Filter events based on search input
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {loadingEvents ? (
        <Text>Loading events...</Text>
      ) : (
        <FlatList
          data={filteredEvents}
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
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 200,
  },
});
