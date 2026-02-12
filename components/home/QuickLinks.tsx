import { useSession } from "@/providers/SessionContext";
import { useTheme } from "@/themes/ThemeContext";
import { View } from "react-native";
import { Button } from "../Button";

export const QuickLinks = () => {
  const { theme, switchTheme } = useTheme();
  const { signOut } = useSession();

  return (
    <View style={{ gap: theme.spacing.sm }}>
      <Button title="Criar novo formulário" onPress={() => {}} />
      <Button title="Todos os formulários" variant="outline" onPress={() => {}} />
      <Button title="Ver perfil" variant="outline" onPress={() => {}} />
      <Button
        title="Alternar tema"
        variant="outline"
        onPress={() => switchTheme()}
      />
      <Button title="Sair da conta" variant="danger" onPress={() => signOut()} />
    </View>
  );
};