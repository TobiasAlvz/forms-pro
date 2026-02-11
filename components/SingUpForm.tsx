import { useSession } from "@/providers/SessionContext";
import { useTheme } from "@/themes/ThemeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Input } from "./input";
import { Button } from "./Button";

export const SingUpForm = () => {
  const { theme } = useTheme();
  const { signUp } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    await signUp({ name, email, phone, password });

    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setLoading(false);

    router.push("/confirm-email");
  };

  return (
    <>
      <View style={{ gap: theme.spacing.md, marginBottom: theme.spacing.lg }}>
        <Input placeholder="Your name" value={name} onChangeText={setName} />

        <Input
          placeholder="Your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Your phone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Input
          placeholder="Your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Input
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <Button
        title="Sign Up"
        disabled={loading}
        loading={loading}
        onPress={handleSignUp}
      />
    </>
  );
};
