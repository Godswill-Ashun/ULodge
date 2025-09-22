import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { UserContext } from "../../context/UserContext";

export default function AuthScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); // toggle login/signup
  const { setUserRole } = useContext(UserContext);

  const handleAuth = async () => {
    try {
      if (isSignup) {
        // SIGN UP
        await auth().createUserWithEmailAndPassword(email, password);
        // Default role for now
        setUserRole("student");
        navigation.replace("Home");
      } else {
        // LOGIN
        await auth().signInWithEmailAndPassword(email, password);
        // Default role for now
        setUserRole("student");
        navigation.replace("Home");
      }
    } catch (error: any) {
      Alert.alert("Auth Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? "Sign Up" : "Login"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title={isSignup ? "Sign Up" : "Login"} onPress={handleAuth} />

      <View style={{ marginTop: 20 }}>
        <Button
          title={isSignup ? "Have an account? Login" : "New user? Sign Up"}
          onPress={() => setIsSignup(!isSignup)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
