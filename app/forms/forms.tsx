import { ScreenContainer } from "@/components/ScreenContainer";
import { Title } from "@/components/Title";
import { ScrollView, Text } from "react-native";

export default function editFormsScreen() {
  return (
    <ScreenContainer>
      <ScrollView>
        <Title>Editar Formulário</Title>
        {/* <Text>{formId}</Text> */}
      </ScrollView>
    </ScreenContainer>
  );
}
