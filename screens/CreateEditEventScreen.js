// screens/CreateEditEventScreen.js
import React, { useState, useContext, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, ScrollView } from "react-native";
import { EventsContext } from "../contexts/EventsProvider";

export default function CreateEditEventScreen({ route, navigation }) {
  const editingEvent = route.params?.event;
  const { createEvent, updateEvent } = useContext(EventsContext);

  const [title, setTitle] = useState(editingEvent?.title || "");
  const [description, setDescription] = useState(editingEvent?.description || "");
  const [location, setLocation] = useState(editingEvent?.location || "");
  const [date, setDate] = useState(editingEvent?.date || "");

  useEffect(() => {
    navigation.setOptions({ title: editingEvent ? "Edit Event" : "Create Event" });
  }, []);

  const validate = () => {
    if (!title.trim()) return "Title is required";
    if (title.trim().length < 3) return "Title must be at least 3 characters";
    if (!description.trim()) return "Description required";
    return null;
  };

  const onSave = async () => {
    const err = validate();
    if (err) return Alert.alert("Validation error", err);
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, { title, description, location, date });
      } else {
        await createEvent({ title, description, location, date });
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert("Error saving event", e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Event title" />
      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, { height: 120 }]} value={description} onChangeText={setDescription} placeholder="Describe the event" multiline />
      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Location" />
      <Text style={styles.label}>Date / Time</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="e.g., 2025-08-10 18:00 or 'Tomorrow 6pm'" />
      <View style={{ marginTop: 12 }}>
        <Button title={editingEvent ? "Save changes" : "Create event"} onPress={onSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: { marginTop: 8, marginBottom: 4, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 6 },
});
