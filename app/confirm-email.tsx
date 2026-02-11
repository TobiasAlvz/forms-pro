
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
      <Title align="center">Check Your Email</Title>
      <Text style={styles.text}>
        A confirmation link has been sent to your email. Please verify your
        email to activate your account.
      </Text>

      <Button title="Back to Sign In" onPress={() => router.replace("/")} />
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
