import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

interface SingInAttributes {
  email: string;
  password: string;
}

interface SingUpAttributes {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const authService = {
  singIn: async (input: SingInAttributes) => {
    const { data, error } = await supabase.auth.signInWithPassword(input);
    if (error) {
      console.log(error);
      Alert.alert("Erro", "Algo deu errado");
    }
    return data;
  },

  singUp: async (input: SingUpAttributes) => {
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          name: input.name,
          phone: input.phone,
        },
      },
    });
    if (error) {
      console.log(error);
      Alert.alert("Erro", "Algo deu errado");
    }
    return data;
  },
};

export default authService;
