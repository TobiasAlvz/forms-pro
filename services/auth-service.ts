
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

interface SignInAttributes {
  email: string;
  password: string;
}

interface SignUpAttributes {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const authService = {
  async signIn(input: SignInAttributes) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) {
      console.log("SIGN IN ERROR:", error.message);
      Alert.alert("Erro ao entrar", error.message);
      throw error;
    }

    return data;
  },

  async signUp(input: SignUpAttributes) {
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
      console.log("SIGN UP ERROR:", error.message);
      Alert.alert("Erro ao cadastrar", error.message);
      throw error;
    }

    return data;
  },
};

export default authService;
