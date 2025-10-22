import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useQuiz } from "../context/QuizContext";
import LaptopIcon from "@/components/icons/LaptopIcon";

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { resetQuiz } = useQuiz();

  const handleStartQuiz = () => {
    resetQuiz(); // Reset quiz state before starting
    router.push("/quiz");
  };

  const screenW = Dimensions.get("window").width;
  const screenH = Dimensions.get("window").height;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <LaptopIcon width={screenW} height={screenH / 2.9} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Test Your Tech Knowledge</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>10 Multiple Choice Questions</Text>
          <Text style={styles.infoText}>30 seconds per question</Text>
          <Text style={styles.infoText}>Auto-advance on timeout</Text>
          <Text style={styles.infoText}>
            No going back to previous questions
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartQuiz}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 12,
    lineHeight: 22,
  },
  startButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 200,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default HomeScreen;
