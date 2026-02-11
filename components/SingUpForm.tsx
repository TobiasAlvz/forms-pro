import { useTheme } from "@/themes/ThemeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Input } from "./input";
import { Button } from "./Button";

export const SingUpForm = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSingUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "As senhas não são iguais");
      return;
    }
    //   aqui vai ser o registro do supabase;
    router.push("/confirm-email");
  };

  return (
    <>
      <View>
        <Input placeholder="Nome" value={name} onChangeText={setName}></Input>

        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        ></Input>

        <Input
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        ></Input>

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        ></Input>

        <Input
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        ></Input>
      </View>
      <Button title="Cadastrar" onPress={handleSingUp} />
    </>
  );
};
