import { useSession } from "@/providers/SessionContext";
import { useTheme } from "@/themes/ThemeContext";
import { Alert, View } from "react-native";
import { Button } from "../Button";
import { useRouter } from "expo-router";
import { useState } from "react";
import formsService from "@/services/forms-service";

export const QuickLinks = () => {
  const { theme, switchTheme } = useTheme();
  const { signOut, user } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCreateForm = async () => {
    setLoading(true);
    if (!user) {
      router.replace("/");
      return;
    }

    const form = await formsService.createEmptyForm(user.id);
    if (!form) {
      Alert.alert("Error", "Erro");
      return;
    }
    router.navigate({
      pathname: "/forms/forms",
      params: { formId: form.id },
    });
    setLoading(false);
  };
  return (
    <View style={{ gap: theme.spacing.sm }}>
      <Button
        title="Criar novo formulário"
        disabled={loading}
        loading={loading}
        onPress={() => handleCreateForm()}
      />
      <Button
        title="Todos os formulários"
        variant="outline"
        onPress={() => router.navigate("/forms/list")}
      />
      <Button title="Ver perfil" variant="outline" onPress={() => {}} />
      <Button
        title="Alternar tema"
        variant="outline"
        onPress={() => switchTheme()}
      />
      <Button
        title="Sair da conta"
        variant="danger"
        onPress={() => signOut()}
      />
    </View>
  );
};
