import * as Device from "expo-device";
import { Button, Platform, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useState } from "react";

export default function HomeScreen() {
  const [items, setItems] = useState<{ id: string; text: string }[]>([
    { id: "1", text: "Посадить сына" },
    { id: "2", text: "Построить дерево" },
    { id: "3", text: "Вырастить дом" },
  ]);
  const [inputText, setInputText] = useState("");

  const addItem = () => {
    if (inputText.trim() === "") return;
    const newItem = { id: Date.now().toString(), text: inputText };
    setItems([...items, newItem]);
    setInputText("");
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
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
            value={inputText}
            onChangeText={setInputText}
            placeholder="Введите задачу..."
            placeholderTextColor="#999"
          />
          <Button title="Добавить" onPress={addItem} />
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          Твои задачи:
        </ThemedText>

        <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            {items.map((item) => (
              <View key={item.id} style={styles.taskRow}>
                <ThemedText style={styles.taskText}>{item.text}</ThemedText>
                <Button title="Удалить" color="red" onPress={() => deleteItem(item.id)} />
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
    width: "100%",
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
  scrollContainer: {
    flex: 1,
    width: "100%",
    borderRadius: Spacing.four,
    minHeight: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
  },
  taskText: {
    flex: 1,
    marginRight: 10,
    color: "#000",
  },
});
