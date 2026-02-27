import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text } from "react-native";

import { ScreenContainer } from "@/components/ScreenContainer";
import { Input } from "@/components/input";
import { Theme, useTheme } from "@/themes/ThemeContext";

import publicFormService, {
  PublicFormWithFields,
} from "@/services/public-form-service";
import { FormFieldWrapper } from "@/components/responses/FormField";
import { LongTextField } from "@/components/responses/LongTextField";
import SingleOptionField from "@/components/responses/SingleOptionField";
import MultipleOptionsField from "@/components/responses/MultipleOptionField";
import { ShowFormStart } from "@/components/responses/ShowFormStart";



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
        <Text style={{ color: theme.colors.text }}>Carregando...</Text>
      </ScreenContainer>
    );
  }

  if (!form) {
    return (
      <ScreenContainer style={styles.center}>
        <Text style={{ color: theme.colors.text }}>
          Formulário não encontrado
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
        <Text style={{ color: theme.colors.text }}>Campo inválido</Text>
      </ScreenContainer>
    );
  }

  const setAnswer = (value: string) => {
    setAnswers((current) => ({
      ...current,
      [field.id]: value,
    }));
  };

  const handleNext = () => {
    if (field.isRequired && !answers[field.id]) {
      Alert.alert("Atenção", "Este campo é obrigatório.");
      return;
    }
    setCurrentStep((current) => current + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) {
      setCurrentStep(-1);
      return;
    }
    setCurrentStep((current) => current - 1);
  };

  const handleSubmit = () => {
    if (field.isRequired && !answers[field.id]) {
      Alert.alert("Atenção", "Este campo é obrigatório.");
      return;
    }

    Alert.alert("Sucesso", "Formulário enviado!");
    router.back();
  };

  return (
    <FormFieldWrapper
      field={field}
      isFirst={currentStep === 0}
      isLast={currentStep === form.fields.length - 1}
      onBack={handleBack}
      onNext={handleNext}
      onSubmit={handleSubmit}
    >
      {field.kind === "short_text" && (
        <Input
          placeholder="Digite sua resposta..."
          value={answers[field.id] ?? ""}
          onChangeText={setAnswer}
        />
      )}

      {field.kind === "long_text" && (
        <LongTextField
          value={answers[field.id] ?? ""}
          onChangeText={setAnswer}
        />
      )}

      {field.kind === "single_option" && (
        <SingleOptionField
          value={answers[field.id] ?? ""}
          options={field.options ?? []}
          onSelect={setAnswer}
        />
      )}

      {field.kind === "multiple_option" && (
        <MultipleOptionsField
          value={answers[field.id] ?? "[]"}
          options={field.options ?? []}
          onSelect={setAnswer}
        />
      )}
    </FormFieldWrapper>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
