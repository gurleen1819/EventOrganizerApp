// components/EventItem.js
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";
import { EventsContext } from "../contexts/EventsProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

export default function EventItem({ event, onPress, onEdit, onDelete }) {
  const { user, userDoc } = useContext(AuthContext);
  const { toggleFavorite } = useContext(EventsContext);

  const isOwner = user && event.ownerId === user.uid;
  const isFav = userDoc?.favorites?.includes(event.id);

  const handleFav = () => {
    toggleFavorite(user.uid, event.id, !isFav).catch((e) => Alert.alert("Error", e.message));
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.subtitle}>{event.location || "Location not specified"}</Text>
          <Text style={styles.desc} numberOfLines={2}>{event.description}</Text>
          <Text style={styles.meta}>By: {event.ownerEmail} • {event.date || "No date"}</Text>
        </View>

        <View style={{ alignItems: "flex-end", marginLeft: 8 }}>
          <TouchableOpacity onPress={handleFav} style={{ padding: 6 }}>
            <Ionicons name={isFav ? "heart" : "heart-outline"} size={20} color="#ff4d6d" />
          </TouchableOpacity>

          {isOwner && (
            <>
              <TouchableOpacity onPress={onEdit} style={{ padding: 6 }}>
                <Ionicons name="create-outline" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete} style={{ padding: 6 }}>
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  title: { fontSize: 16, fontWeight: "600" },
  subtitle: { color: "#666", marginTop: 4 },
  desc: { marginTop: 6, color: "#444" },
  meta: { marginTop: 8, color: "#888", fontSize: 12 },
});
