import { supabase } from "@/lib/supabase";

export type Form = {
  id: string;
  userId: string;
  title: string;
  description: string;
  isPublised: boolean;
};

const formService = {
  createEmptyForm: async (userId: string) => {
    const { data, error } = await supabase
      .from("forms")
      .insert({
        user_id: userId,
        title: "",
        description: "",
        isPublised: false,
      });
  },
};
