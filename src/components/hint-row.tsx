import { Button, StyleSheet, View } from "react-native";

import { ThemedText } from "./themed-text";


type HintRowProps = {
  title?: string;
  onDelete?: () => void;
};

export function HintRow({ title = "Try editing", onDelete }: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <ThemedText type="small" style={styles.hintText} numberOfLines={3} ellipsizeMode="tail">{title}</ThemedText>
      {onDelete && <Button title="Удалить" onPress={onDelete} />}
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: 'center',
    width: '100%',
  },
  hintText: {
  flex: 1,
  marginRight: 10,
},
});
