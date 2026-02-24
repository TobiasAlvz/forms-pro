import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

export type Form = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isPublished: boolean;
  createdAt: string;
};

export type FieldKind =
  | "short_text"
  | "long_text"
  | "single_option"
  | "multiple_option";

export type Field = {
  id: string;
  kind: FieldKind;
  label: string;
  options: string[];
  isRequired: boolean;
  fieldOrder: number;
  formId: string;
};

const formsService = {
  createEmptyForm: async (userId: string) => {
    const { data, error } = await supabase
      .from("forms")
      .insert({
        user_id: userId,
        title: "",
        description: "",
        is_published: false,
      })
      .select(
        `
        id,
        userId: user_id,
        title,
        description,
        isPublished: is_published,
        createdAt: created_at
      `,
      )
      .single<Form>();

    if (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível criar um novo formulário.");
      return null;
    }

    return data;
  },

  getUserForms: async (userId: string) => {
    const { data, error } = await supabase
      .from("forms")
      .select(
        `
        id,
        userId: user_id,
        title,
        description,
        isPublished: is_published,
        createdAt: created_at
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao carregar os formulários.");
      return [];
    }

    return data as Form[];
  },

  getFormById: async (formId: string) => {
    const { data: form, error: formError } = await supabase
      .from("forms")
      .select(
        `
        id,
        userId: user_id,
        title,
        description,
        isPublished: is_published,
        createdAt: created_at
      `,
      )
      .eq("id", formId)
      .single<Form>();

    if (formError || !form) {
      console.log(formError);
      Alert.alert("Erro", "Erro ao carregar o formulário.");
      return null;
    }

    const { data: fields, error: fieldsError } = await supabase
      .from("form_fields")
      .select(
        `
        id,
        kind,
        label,
        options,
        isRequired: is_required,
        fieldOrder: field_order,
        formId: form_id
      `,
      )
      .eq("form_id", form.id)
      .order("field_order", { ascending: true });

    if (fieldsError) {
      console.log(fieldsError);
      Alert.alert("Erro", "Erro ao carregar os campos.");
    }

    const { count } = await supabase
      .from("form_responses")
      .select("*", { count: "exact", head: true })
      .eq("form_id", form.id);

    return {
      form,
      fields: (fields || []) as Field[],
      responseCount: count ?? 0,
    };
  },

  updateForm: async (formId: string, updates: Partial<Form>) => {
    const payload = {
      ...(updates.title !== undefined && { title: updates.title }),
      ...(updates.description !== undefined && {
        description: updates.description,
      }),
      ...(updates.isPublished !== undefined && {
        is_published: updates.isPublished,
      }),
    };

    const { data, error } = await supabase
      .from("forms")
      .update(payload)
      .eq("id", formId)
      .select(
        `
        id,
        userId: user_id,
        title,
        description,
        isPublished: is_published,
        createdAt: created_at
      `,
      )
      .single<Form>();

    if (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao atualizar o formulário.");
      return null;
    }

    return data;
  },

  deleteForm: async (formId: string) => {
    const { error } = await supabase.from("forms").delete().eq("id", formId);

    if (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao excluir o formulário.");
      return false;
    }

    return true;
  },

  createField: async (field: Omit<Field, "id">) => {
    const { data, error } = await supabase
      .from("form_fields")
      .insert({
        kind: field.kind,
        label: field.label,
        options: field.options,
        is_required: field.isRequired,
        field_order: field.fieldOrder,
        form_id: field.formId,
      })
      .select(
        `
        id,
        kind,
        label,
        options,
        isRequired: is_required,
        fieldOrder: field_order,
        formId: form_id
      `,
      )
      .single<Field>();

    if (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao criar campo.");
      return null;
    }

    return data;
  },

  deleteField: async (fieldId: string) => {
    const { error } = await supabase
      .from("form_fields")
      .delete()
      .eq("id", fieldId);

    if (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao excluir campo.");
      return false;
    }

    return true;
  },

 addField: async (formId: string, fieldOrder: number) => {
  const { data, error } = await supabase
    .from("form_fields")
    .insert({
      form_id: formId,
      label: "Novo campo",
      kind: "short_text",
      options: [], // IMPORTANTE
      is_required: false,
      field_order: fieldOrder
    })
    .select(`
      id,
      formId: form_id,
      label,
      kind,
      options,
      isRequired: is_required,
      fieldOrder: field_order
    `)
    .single<Field>();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
},



  updateField: async (fieldId: string, updates: Partial<Field>) => {
    const { data, error } = await supabase
      .from("form_fields")
      .update({
        kind: updates.kind,
        label: updates.label,
        options: updates.options,
        is_required: updates.isRequired,
        field_order: updates.fieldOrder,
      })
      .eq("id", fieldId)
      .select(
        `
      id,
      formId: form_id,
      label,
      kind,
      options,
      isRequired: is_required,
      fieldOrder: field_order
    `,
      )
      .single<Field>();

    if (error) {
      console.log(error);
      return null;
    }

    return data;
  },

  removeField: async (fieldId: string) => {
    await supabase.from("form_fields").delete().eq("id", fieldId);
  },
};

export default formsService;
