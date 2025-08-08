// screens/FavoritesScreen.js
import React, { useContext, useMemo } from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";
import { EventsContext } from "../contexts/EventsProvider";
import EventItem from "../components/EventItem";

export default function FavoritesScreen({ navigation }) {
  const { user, userDoc } = useContext(AuthContext);
  const { events, toggleFavorite } = useContext(EventsContext);

  const favIds = userDoc?.favorites || [];
  const favoriteEvents = useMemo(() => events.filter((e) => favIds.includes(e.id)), [events, favIds]);

  const onRemove = (event) => {
    Alert.alert("Remove favorite", "Remove this event from favorites?", [
      { text: "Cancel" },
      { text: "Remove", style: "destructive", onPress: () => toggleFavorite(user.uid, event.id, false) },
    ]);
  };

  if (!favoriteEvents.length) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>No favorites yet</Text></View>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={favoriteEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventItem event={item} onPress={() => navigation.navigate("EventDetail", { event: item })} onEdit={null} onDelete={() => onRemove(item)} />
        )}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}
