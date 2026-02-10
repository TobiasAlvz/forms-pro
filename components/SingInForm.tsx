import { useTheme } from "@/themes/ThemeContext";
import { useState } from "react";
import { View } from "react-native";
import { Input } from "./input";
import { Button } from "./Button";

export const SingInForm = () => {
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSingIn = () => {
    // aqui faremos o login com o supabase
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
        ></Input>

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        ></Input>
      </View>

      <Button title="Login" onPress={handleSingIn}/>
    </>
  );
};
