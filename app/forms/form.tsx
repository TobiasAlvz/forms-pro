import formsService, { Field, Form } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, ActivityIndicator } from "react-native";

import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";

export default function ShowFormScreen() {
  const { formId } = useLocalSearchParams();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  const [form, setForm] = useState<Form | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [responseCount, setResponseCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    if (!formId || typeof formId !== "string") return;

    const loadForm = async () => {
      try {
        setLoading(true);

        const data = await formsService.getFormById(formId);

        if (!data) {
          Alert.alert("Erro", "Formulário não encontrado.");
          router.back();
          return;
        }

        setForm(data.form);
        setFields(data.fields ?? []);
        setResponseCount(data?.responseCount ?? 0);
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Falha ao carregar o formulário.");
      } finally {
        setLoading(false);
      }
    };

    loadForm();
  }, [formId]);

  if (loading) {
    return (
      <ScreenContainer style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.text, marginTop: 10 }}>
          Carregando formulário...
        </Text>
      </ScreenContainer>
    );
  }

  if (!form) {
    return (
      <ScreenContainer style={styles.center}>
        <Text style={{ color: theme.colors.text }}>
          Formulário não encontrado.
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Title>{form.title}</Title>
      <Text style={styles.description}>{form.description}</Text>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Estatísticas</Text>
        <Text style={styles.stat}>Total de respostas: {responseCount}</Text>
        <Text style={styles.stat}>Campos: {fields.length}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Editar formulário"
          onPress={() => router.push(`/forms/edit`)}
          style={styles.button}
          variant="outline"
        />

        <Button
          title="Ver respostas"
          onPress={() => {}}
          style={styles.button}
        />
      </View>
    </ScreenContainer>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    center: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    description: {
      color: theme.colors.text,
      fontSize: 16,
      marginBottom: theme.spacing.md,
    },
    statsSection: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.lg,
      fontWeight: "600",
      marginBottom: theme.spacing.sm,
    },
    stat: {
      color: theme.colors.text,
      fontSize: theme.fontSizes.md,
      marginBottom: theme.spacing.xs,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: theme.spacing.sm,
    },
    button: {
      flex: 1,
    },
  });
