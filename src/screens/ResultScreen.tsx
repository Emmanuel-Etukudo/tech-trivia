import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { useQuiz } from "@/context/QuizContext";
import { calculatePercentage, getPerformanceMessage } from "@/utils/helper";

export default function ResultScreen() {
  const router = useRouter();
  const { quizState, resetQuiz } = useQuiz();

  const totalQuestions = quizState.questions.length;
  const score = quizState.score;
  const percentage = calculatePercentage(score, totalQuestions);
  const message = getPerformanceMessage(percentage);

  const handleReviewAnswers = () => {
    router.push("/review");
  };

  const handleRestartQuiz = () => {
    resetQuiz();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Score Circle */}
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>{score}</Text>
          <Text style={styles.totalText}>/ {totalQuestions}</Text>
        </View>

        {/* Percentage */}
        <Text style={styles.percentage}>{percentage}%</Text>

        {/* Performance Message */}
        <Text style={styles.message}>{message}</Text>

        {/* Stats Box */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{score}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, styles.incorrectValue]}>
              {totalQuestions - score}
            </Text>
            <Text style={styles.statLabel}>Incorrect</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={handleReviewAnswers}
            activeOpacity={0.8}
          >
            <Text style={styles.reviewButtonText}>Review Answers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestartQuiz}
            activeOpacity={0.8}
          >
            <Text style={styles.restartButtonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
  scoreCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 8,
    borderColor: "#007AFF",
  },
  scoreText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#007AFF",
  },
  totalText: {
    fontSize: 24,
    color: "#666",
    fontWeight: "600",
  },
  percentage: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  message: {
    fontSize: 24,
    color: "#007AFF",
    fontWeight: "600",
    marginBottom: 32,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 20,
  },
  statValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  incorrectValue: {
    color: "#F44336",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 400,
    gap: 12,
  },
  reviewButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  restartButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  restartButtonText: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "600",
  },
  footerText: {
    marginTop: 24,
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
