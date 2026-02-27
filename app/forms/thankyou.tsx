import { Button } from "@/components/Button";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ThankYouScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.icon}>
        <Feather name="check-circle" size={80} color={theme.colors.primary} />
      </View>

      <Title align="center">Resposta enviada!</Title>

      <Text style={styles.subtitle}>
        Obrigado por responder. Suas informações foram registradas com sucesso.
      </Text>

      <Button
        title="Voltar para o início"
        onPress={() => router.replace("/")}
        style={styles.button}
      />
    </ScreenContainer>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      gap: theme.spacing.lg,
    },
    icon: {
      marginBottom: theme.spacing.lg,
    },
    subtitle: {
      color: theme.colors.secondary,
      textAlign: "center",
      maxWidth: 280,
      fontSize: theme.fontSizes.md,
    },
    button: {
      marginTop: theme.spacing.lg,
      width: 220,
    },
  });
