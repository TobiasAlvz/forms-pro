import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import publicFormService, {
  PublicFormWithFields,
} from "@/services/public-form-service";
import { useTheme } from "@/themes/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

export default function PreviewFormsScreen() {
  const params = useLocalSearchParams();
  const formId = Array.isArray(params.formId)
    ? params.formId[0]
    : params.formId;

  const { theme } = useTheme();
  //   const styles = createStyles(theme);

  const [form, setForm] = useState<PublicFormWithFields | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!formId) return;
    const load = async () => {
      const data = await publicFormService.getFormWithFields(formId, {
        preview: true,
      });
      if (!data) {
        Alert.alert("Erro", "Formulario não encontrado");
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
        <Title>Carrengando...</Title>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Title>{form?.title}</Title>
      {!!form?.description && <Text>{form.description}</Text>}

      <View>
        <Text>Visualização de Formulario</Text>
        <Text>Campos de respostas</Text>
      </View>
    </ScreenContainer>
  );
}
