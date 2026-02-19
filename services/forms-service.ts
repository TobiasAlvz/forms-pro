import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

export type Formulario = {
  id: string;
  userId: string;
  title: string;
  description: string;
  isPublished: boolean;
};

const formsService = {
  createEmptyForm: async (userId: string) => {
    const { data, error } = await supabase
      .from("forms")
      .insert({
        user_id: userId,
        title: "Novo formulário em branco",
        description: "Este é um formulário vazio. Edite a descrição dele.",
        is_published: false,
      })
      .select(
        `
        id,
        userId: user_id,
        title,
        description,
        isPublished: is_published
      `,
      )
      .single<Formulario>();

    if (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível criar um novo formulário vazio.");
    }

    return data;
  },
};

export default formsService;
