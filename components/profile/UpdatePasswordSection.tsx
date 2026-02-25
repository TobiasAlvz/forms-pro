import { useSession } from "@/providers/SessionContext";
import profileService from "@/services/profile-service";
import { useTheme } from "@/themes/ThemeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Title } from "../Title";
import { Input } from "../input";
import { Button } from "../Button";

export const UpdatePasswordSection = () => {
  const { signOut } = useSession();
  const { theme } = useTheme();
  //   const styles = createStyles(theme);
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loanding, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (password !== confirm) {
      Alert.alert("Erro", "As senhas são diferentes");
      return;
    }

    setLoading(true);
    await profileService.updatePassword(password);
    Alert.alert(
      "Senha atulizada",
      "Sua senha foi atualizada com sucesso. Realize o login novamente",
    );
    await signOut();
    router.dismissAll();
    router.replace("/");
  };

  return (
    <View>
      <Title>Alterar Senha</Title>
      <View>
        <Input
          placeholder="Nova Senha"
          value={password}
          onChangeText={setPassword}
        />

        <Input
          placeholder="confirme sua senha"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />
        <Button title="Alterar Senha" onPress={handleUpdate} />
      </View>
    </View>
  );
};
