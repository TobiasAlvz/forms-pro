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
    { preview = false }: { preview?: boolean } = {}
  ): Promise<PublicFormWithFields | undefined> {
    let query = supabase
      .from("forms")
      .select(`
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
      `)
      .eq("id", formId);

    if (!preview) {
      query = query.eq("is_published", true);
    }

    const { data, error } = await query.single<PublicFormWithFields>();

    if (error) {
      console.log(error);
      Alert.alert("Erro", "Formulário não encontrado ou não publicado.");
      return;
    }


    data.fields = (data.fields ?? []).sort(
      (a, b) => a.fieldOrder - b.fieldOrder
    );

    return data;
  },
};

export default publicFormService;