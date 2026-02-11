import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { SignInForm } from "@/components/SingInForm";
import { useSession } from "@/providers/SessionContext";

export default function Index() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useSession();

  return (
    <ScreenContainer>
      <View style={styles.formContainer}>
        <Title align="center">Faça login com seu email</Title>
        <SignInForm />
        {user && <Text>Usuario Criado{user.user_metadata.name}</Text>}
        <Text style={styles.footerText}>
          Não tem conta?
          {""}
          <Link href={"/singup"} style={styles.linkText}>
            Cadastrar
          </Link>
        </Text>
      </View>
    </ScreenContainer>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    formContainer: {
      flex: 1,
      justifyContent: "center",
    },
    footerText: {
      marginTop: theme.spacing.lg,
      color: theme.colors.secondary,
      textAlign: "center",
    },
    linkText: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
  });
