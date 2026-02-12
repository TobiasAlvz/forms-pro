import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import { Link, router, useRouter } from "expo-router";
import { SignInForm } from "@/components/SingInForm";
import { useSession } from "@/providers/SessionContext";
import { useEffect } from "react";

//https://www.notion.so/304cc8c2db96809aad0be0827978f4d6

export default function Index() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user, session } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (session) {
      router.replace("/home");
    }
  }, [session, router]);

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
