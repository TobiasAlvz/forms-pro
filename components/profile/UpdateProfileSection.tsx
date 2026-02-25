import { useSession } from "@/providers/SessionContext";
import profileService from "@/services/profile-service";
import { useTheme } from "@/themes/ThemeContext";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Title } from "../Title";
import { Input } from "../input";
import { Button } from "../Button";

export const UpdateProfileSection = () => {
  const { user } = useSession();
  const { theme } = useTheme();
  //   const styles = createStyles(theme);

  const [name, setName] = useState(user?.user_metadata.name ?? "");
  const [phone, setPhone] = useState(user?.user_metadata.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await profileService.updateProfile({ name, phone, email });
    Alert.alert(
      "Dados Atualizados",
      "Suas informações foram atualizadas com sucesso!",
    );
    setLoading(false);
  };

  return (
    <View>
      <Title>Dados Pessoais</Title>
      <View>
        <Input placeholder="Nome" value={name} onChangeText={setName} />
        <Input placeholder="Celular" value={phone} onChangeText={setPhone} />
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
      </View>
      <Button
        title="Salvar Alterações"
        onPress={handleSave}
        disabled={loading}
        loading={loading}
      />
    </View>
  );
};
