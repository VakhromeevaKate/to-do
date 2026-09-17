import * as Device from "expo-device";

import {
  Button,
  KeyboardAvoidingView,
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

  const [text, setText] = useState("");

  const addItem = () => {
    if (text.trim() === "") return; // Проверка на пустую строку. Только пробелы тоже считаются как пустое сообщение

    // const newItem = `Test ${items.length + 1}`;

    setItems([text, ...items]);

    setText("");
  };

  const deleteItem = (indexToDelete: number) => {
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  const deleteFirstItem = () => {
    if (items.length === 0) return;

    setItems(items.slice(1));
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={styles.safeArea}>
          <ThemedView style={styles.heroSection}>
            <AnimatedIcon />

            <ThemedText type="title" style={styles.title}>
              ToDo List
            </ThemedText>
          </ThemedView>

          {/* <ThemedView style={styles.heroSection}>

          <Button title={"Add todo"} onPress={addItem} />

        </ThemedView> */}

          <TextInput
            style={styles.input}
            placeholder="ToDo text..."
            placeholderTextColor="#888"
            value={text}
            onChangeText={setText}
          ></TextInput>

          <View style={styles.inputContainer}>
            <Button title={"Add todo"} onPress={addItem} />

            <Button
              title={"Delete first"}
              color="#FF3B30"
              onPress={deleteFirstItem}
            />
          </View>

          <ThemedText type="code" style={styles.code}>
            Your todos:
          </ThemedText>

          <ScrollView
            style={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <ThemedView type="backgroundElement" style={styles.stepContainer}>
              {items.map((item, index) => (
                <View key={`${item}-${index}`} style={styles.itemRow}>
                  <HintRow title={item}></HintRow>

                  <Button
                    title="Delete"
                    color="#FF3B30"
                    onPress={() => deleteItem(index)}
                  ></Button>
                </View>

                // <HintRow key={item} title={item} />
              ))}
            </ThemedView>
          </ScrollView>

          {Platform.OS === "web" && <WebBadge />}
        </SafeAreaView>
      </KeyboardAvoidingView>
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

  title: {
    textAlign: "center",
  },

  code: {
    textTransform: "uppercase",
  },

  keyboardView: {
    flex: 1,
  },

  inputContainer: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: Spacing.two,

    width: "100%",

    height: 50,

    marginBottom: Spacing.three,
  },

  input: {
    height: 40,

    width: "100%",

    borderWidth: 1,

    borderColor: "#ccc",

    borderRadius: Spacing.two,

    paddingHorizontal: Spacing.three,

    color: "#000000",

    backgroundColor: "#ffffff",
  },

  itemRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
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
  },
});
