import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";

export default function SignInScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) return Alert.alert("Error", "Fill both fields");
    try {
      await signIn(email.trim(), password);
    } catch (e) {
      Alert.alert("Sign in failed", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Sign In" onPress={handleSignIn} />
      <Text style={{ marginTop: 10 }} onPress={() => navigation.navigate("SignUp")}>
        Create an account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 12, borderRadius: 6 }
});
