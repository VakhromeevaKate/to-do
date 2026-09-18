import * as Device from "expo-device";
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import {
  BottomTabInset,
  MaxContentWidth,
  Spacing,
} from "@/constants/theme";
import { useState } from "react";

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }

  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }

  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";

  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [items, setItems] = useState<string[]>(["Test 1", "Test 2"]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() === "") {
      return;
    }

    setItems([...items, newItem]);
    setNewItem("");
  };

  const deleteItem = (index: number) => {
    setItems(items.filter((_, itemIndex) => itemIndex !== index));
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

        <ThemedView style={styles.heroSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter a todo"
            value={newItem}
            onChangeText={setNewItem}
          />

          <Button title="Add todo" onPress={addItem} />
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          Your todos:
        </ThemedText>

        <ScrollView style={styles.scrollContainer}>
          <ThemedView
            type="backgroundElement"
            style={styles.stepContainer}
          >
            {items.map((item, index) => (
              <ThemedView key={`${item}-${index}`} style={styles.todoRow}>
                <ThemedText>{item}</ThemedText>

                <Button
                  title="Delete"
                  onPress={() => deleteItem(index)}
                />
              </ThemedView>
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
    width: "100%",
  },

  title: {
    textAlign: "center",
  },

  code: {
    textTransform: "uppercase",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
  },

  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
  },

  scrollContainer: {
    height: 200,
    width: "100%",
    borderRadius: Spacing.four,
  },

  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.three,
  },
});
