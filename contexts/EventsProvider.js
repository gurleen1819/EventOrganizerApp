// contexts/EventsProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { AuthContext } from "./AuthProvider";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const arr = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setEvents(arr);
      setLoadingEvents(false);
    });

    return () => unsub();
  }, []);

  const createEvent = async (event) => {
    return await addDoc(collection(db, "events"), {
      ...event,
      ownerId: user.uid,
      ownerEmail: user.email,
      createdAt: serverTimestamp(),
    });
  };

  const updateEvent = async (eventId, data) => {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, { ...data });
  };

  const deleteEvent = async (eventId) => {
    const eventRef = doc(db, "events", eventId);
    await deleteDoc(eventRef);
  };

  // favourites stored on user's doc
  const toggleFavorite = async (userId, eventId, add) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { favorites: add ? arrayUnion(eventId) : arrayRemove(eventId) });
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        loadingEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        toggleFavorite,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
