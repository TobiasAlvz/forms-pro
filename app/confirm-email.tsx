
import { Button } from "@/components/Button";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";

export default function ConfirmEmailScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  return (
    <ScreenContainer style={{ justifyContent: "center" }}>
      <Title align="center">Verique seu email</Title>
      <Text style={styles.text}>
       Verifique seu Email e confirme seu login
      </Text>

      <Button title="Voltar para a tela de inicio" onPress={() => router.replace("/")} />
    </ScreenContainer>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.secondary,
      textAlign: "center",
      marginVertical: theme.spacing.lg,
    },
  });
