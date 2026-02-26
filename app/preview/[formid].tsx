import { useLocalSearchParams } from "expo-router";

export default function PreviewFormsScreen() {
  const params = useLocalSearchParams();
  const formId = Array.isArray(params.formId);
  
}
