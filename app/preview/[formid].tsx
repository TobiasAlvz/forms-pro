import { Input } from "@/components/input";
import FormField from "@/components/responses/FormField";
import { ShowFormStart } from "@/components/responses/ShowFormStart";
import { ScreenContainer } from "@/components/ScreenContainer";
import publicFormService, {
  PublicFormWithFields,
} from "@/services/public-form-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text } from "react-native";

export default function PreviewFormScreen() {
  const params = useLocalSearchParams();
  const formId = Array.isArray(params.formId)
    ? params.formId[0]
    : params.formId;

  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [form, setForm] = useState<PublicFormWithFields | null>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;

    const load = async () => {
      setLoading(true);

      const data = await publicFormService.getFormWithFields(formId, {
        preview: true,
      });

      if (!data) {
        Alert.alert("Erro", "Formulário não encontrado.");
        router.back();
        return;
      }

      setForm(data);
      setLoading(false);
    };

    load();
  }, [formId]);

  if (loading) {
    return (
      <ScreenContainer style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.text }}>
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

  if (currentStep === -1) {
    return (
      <ShowFormStart
        title={form.title}
        description={form.description ?? ""}
        onStart={() => setCurrentStep(0)}
      />
    );
  }

  const field = form.fields[currentStep];

  if (!field) {
    return (
      <ScreenContainer style={styles.center}>
        <Text style={{ color: theme.colors.text }}>Campo inválido.</Text>
      </ScreenContainer>
    );
  }

  const handleNext = () => {
    if (currentStep < form.fields.length - 1) {
      setCurrentStep((current) => current + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      setCurrentStep(-1);
      return;
    }
    setCurrentStep((current) => current - 1);
  };

  const handleSubmit = () => {
    Alert.alert(
      "Enviado!",
      "Suas respostas foram registradas (ainda não salvamos no banco).",
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  const handleChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [field.id]: value,
    }));
  };

  return (
    <FormField.Wrapper
      field={field}
      isFirst={currentStep === 0}
      isLast={currentStep === form.fields.length - 1}
      onBack={handleBack}
      onNext={handleNext}
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Digite sua resposta..."
        value={answers[field.id] ?? ""}
        onChangeText={handleChange}
      />
    </FormField.Wrapper>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
  });
