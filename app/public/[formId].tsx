import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text } from "react-native";

import { ScreenContainer } from "@/components/ScreenContainer";
import { Theme, useTheme } from "@/themes/ThemeContext";
import publicFormService, {
  PublicFormWithFields,
} from "@/services/public-form-service";

import { FormFieldWrapper } from "@/components/responses/FormField";
import { LongTextField } from "@/components/responses/LongTextField";
import MultipleOptionsField from "@/components/responses/MultipleOptionField";
import SingleOptionField from "@/components/responses/SingleOptionField";
import { ShowFormStart } from "@/components/responses/ShowFormStart";
import { Input } from "@/components/input";

export default function PublicFormScreen() {
  const { formId } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [form, setForm] = useState<PublicFormWithFields | null>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [loading, setLoading] = useState(true);

  const answersRef = useRef<Record<string, string>>({});

  useEffect(() => {
    if (typeof formId !== "string") return;

    const load = async () => {
      const data = await publicFormService.getFormWithFields(formId, {
        preview: false,
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

  const setAnswer = (fieldId: string, value: string) => {
    answersRef.current[fieldId] = value;
  };

  if (loading) {
    return (
      <ScreenContainer style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
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

  const handleNext = () => {
    if (field.isRequired && !answersRef.current[field.id]) {
      Alert.alert("Atenção", "Este campo é obrigatório.");
      return;
    }
    setCurrentStep((c) => c + 1);
  };

  const handleBack = () => {
    setCurrentStep((c) => c - 1);
  };

  const handleSubmit = async () => {
    if (field.isRequired && !answersRef.current[field.id]) {
      Alert.alert("Atenção", "Este campo é obrigatório.");
      return;
    }

    await publicFormService.submitAnswers(form.id, answersRef.current);
    router.replace("/forms/thankyou");
  };

  return (
    <FormFieldWrapper
      key={field.id}
      field={field}
      isFirst={currentStep === 0}
      isLast={currentStep === form.fields.length - 1}
      onBack={handleBack}
      onNext={handleNext}
      onSubmit={handleSubmit}
    >
      {field.kind === "short_text" && (
        <Input
          key={field.id}
          placeholder="Digite sua resposta..."
          defaultValue={answersRef.current[field.id] ?? ""}
          onChangeText={(v) => setAnswer(field.id, v)}
        />
      )}

      {field.kind === "long_text" && (
        <LongTextField
          key={field.id}
          defaultValue={answersRef.current[field.id] ?? ""}
          onCommit={(v) => setAnswer(field.id, v)}
        />
      )}

      {field.kind === "single_option" && (
        <SingleOptionField
          key={field.id}
          defaultValue={answersRef.current[field.id] ?? ""}
          options={field.options ?? []}
          onCommit={(v) => setAnswer(field.id, v)}
        />
      )}

      {field.kind === "multiple_option" && (
        <MultipleOptionsField
          key={field.id}
          defaultValue={answersRef.current[field.id] ?? "[]"}
          options={field.options ?? []}
          onCommit={(v) => setAnswer(field.id, v)}
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
