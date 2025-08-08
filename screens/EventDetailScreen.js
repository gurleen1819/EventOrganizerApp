
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EventDetailScreen({ route }) {
  const { event } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>By: {event.ownerEmail}</Text>
      <Text style={styles.meta}>Date: {event.date || "N/A"}</Text>
      <Text style={styles.location}>{event.location || "No location"}</Text>
      <Text style={styles.desc}>{event.description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "700" },
  meta: { color: "#666", marginTop: 6 },
  location: { marginTop: 10, fontWeight: "600" },
  desc: { marginTop: 12, lineHeight: 20 },
});
