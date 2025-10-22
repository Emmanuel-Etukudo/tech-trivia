import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useQuiz } from "@/context/QuizContext";
import ReviewItem from "@/components/ReviewItem";

export default function ReviewScreen() {
  const router = useRouter();
  const { quizState, resetQuiz } = useQuiz();

  const handleBackToHome = () => {
    resetQuiz();
    router.replace("/");
  };

  const handleRetakeQuiz = () => {
    resetQuiz();
    router.replace("/quiz");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Header */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Quiz Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{quizState.score}</Text>
              <Text style={styles.summaryLabel}>Correct</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, styles.incorrectValue]}>
                {quizState.questions.length - quizState.score}
              </Text>
              <Text style={styles.summaryLabel}>Incorrect</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {Math.round(
                  (quizState.score / quizState.questions.length) * 100
                )}
                %
              </Text>
              <Text style={styles.summaryLabel}>Score</Text>
            </View>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.correctBox]} />
            <Text style={styles.legendText}>Correct Answer</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.incorrectBox]} />
            <Text style={styles.legendText}>Your Wrong Answer</Text>
          </View>
        </View>

        {/* Review Items */}
        <View style={styles.reviewList}>
          {quizState.questions.map((question, index) => {
            const userAnswer = quizState.userAnswers.find(
              (answer) => answer.questionId === question.id
            );
            if (!userAnswer) return null;

            return (
              <ReviewItem
                key={question.id}
                question={question}
                userAnswer={userAnswer}
                questionNumber={index + 1}
              />
            );
          })}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={handleRetakeQuiz}
            activeOpacity={0.8}
          >
            <Text style={styles.retakeButtonText}>Retake Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleBackToHome}
            activeOpacity={0.8}
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  summaryContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  incorrectValue: {
    color: "#F44336",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  correctBox: {
    backgroundColor: "#4CAF50",
  },
  incorrectBox: {
    backgroundColor: "#F44336",
  },
  legendText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  reviewList: {
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 8,
  },
  retakeButton: {
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
  retakeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  homeButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  homeButtonText: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
