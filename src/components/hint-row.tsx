import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "./themed-text";


type HintRowProps = {
  title?: string;
  onDelete?: () => void;
};

export function HintRow({ title = "Try editing", onDelete }: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <ThemedText type="small">{title}</ThemedText>
      {onDelete && (
        <Pressable onPress={onDelete} hitSlop={8} style={styles.deleteButton}>
          <ThemedText type="small" style={styles.deleteText}>
            ✕
          </ThemedText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  deleteText: {
    color: "#E5484D",
    fontWeight: "700",
  },
});
