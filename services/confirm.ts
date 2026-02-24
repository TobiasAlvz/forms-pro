import { Alert } from "react-native";

export default function confirm(
  title: string,
  menssage: string,
  onConfirm?: () => void,
  onCancel?: () => void,
) {
  Alert.alert(
    title,
    menssage,
    [
      {
        text: "Confirmar",
        onPress: onConfirm,
        style: "destructive",
      },
      {
        text: "Cancelar",
        onPress: onCancel,
        style: "cancel",
      },
    ],
    { cancelable: true },
  );
}
