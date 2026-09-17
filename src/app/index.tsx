import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useState } from "react";

export default function HomeScreen() {
  const [items, setItems] = useState<string[]>(["Test 1", "Test 2"]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    const trimmedItem = newItem.trim();

    if (!trimmedItem) {
      return;
    }

    setItems((currentItems) => [...currentItems, trimmedItem]);
    setNewItem("");
  };

  const deleteItem = (indexToDelete: number) => {
    setItems((currentItems) =>
      currentItems.filter((_, index) => index !== indexToDelete),
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            ToDo List
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.formSection}>
          <TextInput
            accessibilityLabel="New todo"
            placeholder="Enter a todo"
            value={newItem}
            onChangeText={setNewItem}
            onSubmitEditing={addItem}
            style={styles.input}
          />
          <Button title="Add todo" onPress={addItem} />
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          Your todos:
        </ThemedText>
        <ScrollView style={styles.scrollContainer}>
          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            {items.map((item, index) => (
              <View key={`${item}-${index}`} style={styles.todoRow}>
                <View style={styles.todoText}>
                  <HintRow title={item} />
                </View>
                <Button title="Delete" onPress={() => deleteItem(index)} />
              </View>
            ))}
          </ThemedView>
        </ScrollView>
        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  formSection: {
    alignSelf: "stretch",
    gap: Spacing.two,
  },
  input: {
    backgroundColor: "white",
    borderColor: "#8e8e93",
    borderRadius: Spacing.two,
    borderWidth: 1,
    color: "#11181c",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
  },
  todoRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: Spacing.two,
  },
  todoText: {
    flex: 1,
  },
  scrollContainer: {
    height: 200,
    width: "100%",
    borderRadius: Spacing.four,
  },
});
