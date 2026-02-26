import { ScreenContainer } from "@/components/ScreenContainer";
import publicFormService, {
  PublicFormWithFields,
} from "@/services/public-form-service";
import { useTheme } from "@/themes/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View, StyleSheet } from "react-native";

export default function PreviewFormsScreen() {
  const params = useLocalSearchParams();
  const formId = Array.isArray(params.formId)
    ? params.formId[0]
    : params.formId;

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [form, setForm] = useState<PublicFormWithFields | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;

    const load = async () => {
      setLoading(true);

      const data = await publicFormService.getFormWithFields(formId, {
        preview: true,
      });

      if (!data) {
        Alert.alert("Erro", "Formulário não encontrado");
        setLoading(false);
        return;
      }

      setForm(data);
      setLoading(false);
    };

    load();
  }, [formId]);

  if (loading) {
    return (
      <ScreenContainer>
        <Text style={styles.loading}>Carregando formulário...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.headerCard}>
          <Text style={styles.title}>{form?.title}</Text>

          {!!form?.description && (
            <Text style={styles.description}>{form.description}</Text>
          )}
        </View>

        <View style={styles.divider} />

        {/* Área de respostas */}
        <Text style={styles.sectionTitle}>Responda o formulário</Text>

        <View style={styles.fieldsContainer}>
          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>
              Campo de exemplo <Text style={styles.required}>*</Text>
            </Text>

            <Text style={styles.helperText}>
              Aqui aparecerão os campos dinamicamente (text, select, checkbox…)
            </Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      gap: 16,
    },

    headerCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 14,
      padding: 18,
      borderWidth: 1,
      borderColor: theme.colors.border,
      gap: 8,
    },

    title: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.text,
    },

    description: {
      fontSize: 15,
      color: theme.colors.muted,
      lineHeight: 22,
    },

    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: 8,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.text,
      marginTop: 10,
    },

    fieldsContainer: {
      gap: 14,
      marginTop: 6,
    },

    fieldCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      gap: 8,
    },

    fieldLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
    },

    required: {
      color: theme.colors.primary,
    },

    helperText: {
      fontSize: 13,
      color: theme.colors.muted,
    },

    loading: {
      textAlign: "center",
      fontSize: 18,
      color: theme.colors.muted,
      marginTop: 40,
    },
  });
}
