import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (usr) => {
      setUser(usr);
      setLoading(false);

      if (usr) {
        const uDocRef = doc(db, "users", usr.uid);
        const unsubDoc = onSnapshot(uDocRef, (snap) => {
          if (snap.exists()) setUserDoc(snap.data());
          else setUserDoc(null);
        });
        return () => unsubDoc();
      } else {
        setUserDoc(null);
      }
    });
    return unsub;
  }, []);

  const signUp = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", result.user.uid), {
      displayName,
      email,
      favorites: [],
      createdAt: new Date().toISOString()
    });
    return result;
  };

  const signIn = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Make sure user doc exists
    const userRef = doc(db, "users", result.user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        displayName: email.split("@")[0],
        email,
        favorites: [],
        createdAt: new Date().toISOString()
      });
    }
    return result;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, userDoc, loading, signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
