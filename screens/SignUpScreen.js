import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";

export default function SignUpScreen({ navigation }) {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !displayName) return Alert.alert("Error", "Fill all fields");
    try {
      await signUp(email.trim(), password, displayName);
    } catch (e) {
      Alert.alert("Sign up failed", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Display Name" value={displayName} onChangeText={setDisplayName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={{ marginTop: 10 }} onPress={() => navigation.navigate("SignIn")}>
        Already have an account?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 12, borderRadius: 6 }
});
