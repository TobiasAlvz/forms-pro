import { useSession } from "@/providers/SessionContext";
import { useTheme } from "@/themes/ThemeContext";
import { useState } from "react";
import { View } from "react-native";
import { Input } from "./input";
import { Button } from "./Button";

export const SignInForm = () => {
  const { theme } = useTheme();
  const { signIn } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn(email, password);
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  return (
    <>
      <View style={{ gap: theme.spacing.md, marginBottom: theme.spacing.lg }}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button
        title="Sign In"
        disabled={loading}
        loading={loading}
        onPress={handleSignIn}
      />
    </>
  );
};
