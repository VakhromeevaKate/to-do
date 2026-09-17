import * as Device from "expo-device";
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Text,
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
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    setItems([...items, newItem]);
  };

  const delItem = (i) => {
    let copyItems = [...items];
    copyItems.splice(i, 1);
    setItems(copyItems);
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
        <ThemedView style={styles.heroSection}  type="backgroundElement">
          <TextInput
            value={newItem} 
           placeholder="Write ur item here"
            onChangeText={(newText) => setNewItem(newText)}
          />
        </ThemedView>
        <ThemedView style={styles.heroSection}>
          <Button title={"Add todo"} onPress={addItem} />
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          Your todos:
        </ThemedText>
        <ScrollView style={styles.scrollContainer}>
          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            {items.map((item, i) => (
              <View key={i} style={styles.row}>
                <View style={styles.rowText}>
                  <HintRow title={item} />
                </View>
                <Pressable onPress={()=>delItem(i)} style={styles.deleteBtn}>
                  <Text style={styles.deleteIcon}>✕</Text>
                </Pressable>
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
    flex: 1,
  },
  scrollContainer: {

    width: "100%",
    borderRadius: Spacing.four,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  rowText: {
    flex: 1,
  },
  deleteBtn: {
    backgroundColor: "red",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deleteIcon: {
    color: "white",
  },
});
