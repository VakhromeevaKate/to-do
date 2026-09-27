import { Button, StyleSheet, View } from "react-native";

import { ThemedText } from "./themed-text";


type HintRowProps = {
  title?: string;
  onDelete?: () => void;
};

export function HintRow({ title = "Try editing", onDelete }: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <ThemedText type="small">{title}</ThemedText>
      {onDelete && <Button title={"Delete"} onPress={onDelete} />}
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
