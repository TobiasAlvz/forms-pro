import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { Input } from "@/components/input";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { SingInForm } from "@/components/SingInForm";

export default function Index() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ScreenContainer>
      <View style={styles.formContainer}>
        <Title align="center">Faça login com seu email</Title>
        <SingInForm/>
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
