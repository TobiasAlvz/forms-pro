import { Field } from "@/services/forms-service";
import { Theme, useTheme } from "@/themes/ThemeContext";
import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../Button";
import { ScreenContainer } from "../ScreenContainer";
import { Title } from "../Title";


interface WrapperProps {
  field: Field;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({
  field,
  isFirst,
  isLast,
  onBack,
  onNext,
  onSubmit,
  children,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ScreenContainer>
      <Title>{field.label}</Title>
      {children}

      <View style={styles.buttonsContainer}>
        {!isFirst && (
          <Button
            title="Voltar"
            onPress={onBack}
            variant="outline"
            style={styles.button}
          />
        )}

        <Button
          title={isLast ? "Enviar" : "Próximo"}
          onPress={() => (isLast ? onSubmit() : onNext())}
          style={styles.button}
        />
      </View>
    </ScreenContainer>
  );
};

// export default {
//   Wrapper,
//   LongText: LongTextField,
//   SingleOption: SingleOptionField,
//   MultipleOption: MultipleOptionField,
// };

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    buttonsContainer: {
      flexDirection: "row",
      gap: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    button: {
      flex: 1,
    },
  });
