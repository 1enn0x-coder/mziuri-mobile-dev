import { useState } from "react";
import { Button, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSignIn() {
    if (!signIn(username, password)) {
      setError("მომხმარებლის სახელი ან პაროლი არასწორია.");
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onSubmitEditing={handleSignIn}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Sign In" onPress={handleSignIn} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", padding: 24, gap: 12 },
  title: { fontSize: 28, fontWeight: "700" },
  input: { borderWidth: 1, borderColor: "#999", borderRadius: 8, padding: 12 },
  error: { color: "#b42318" },
});
