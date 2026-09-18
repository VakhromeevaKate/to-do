import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "./themed-text";

type HintRowProps = {
  title?: string;
  onChangeTitle?: (title: string) => void;
  onRemove?: () => void;
};

export function HintRow({ title = "Try editing", onChangeTitle, onRemove }: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <TextInput style={styles.input} value={title} onChangeText={onChangeTitle} />
      <Pressable onPress={onRemove}>
        <ThemedText type="small">✕</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
});
