import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import { Field } from "./forms-service";

export type PublicFormWithFields = {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
};

const publicFormService = {
  async getFormWithFields(
    formId: string,
    { preview = false }: { preview?: boolean } = {},
  ): Promise<PublicFormWithFields | undefined> {
    let query = supabase
      .from("forms")
      .select(
        `
        id,
        title,
        description,
        fields: form_fields (
          id,
          label,
          kind,
          options,
          isRequired: is_required,
          fieldOrder: field_order
        )
      `,
      )
      .eq("id", formId);

    if (!preview) {
      query = query.eq("is_published", true);
    }

    const { data, error } = await query.single<PublicFormWithFields>();

    if (error || !data) {
      console.log(error);
      Alert.alert("Erro", "Formulário não encontrado ou não publicado.");
      return;
    }

    data.fields = (data.fields ?? []).sort(
      (a, b) => a.fieldOrder - b.fieldOrder,
    );

    return data;
  },

  async submitAnswers(formId: string, answers: Record<string, string>) {
    const { error } = await supabase.from("form_responses").insert({
      form_id: formId,
      answers: answers,
    });

    if (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao enviar respostas.");
      return false;
    }

    return true;
  },
};

export default publicFormService;
