import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Question, UserAnswer } from "../types";

interface ReviewItemProps {
  question: Question;
  userAnswer: UserAnswer;
  questionNumber: number;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  question,
  userAnswer,
  questionNumber,
}) => {
  const optionLabels = ["A", "B", "C", "D"];
  const isAnswered = userAnswer.selectedAnswer !== null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.questionNumber}>Question {questionNumber}</Text>
        <View
          style={[
            styles.statusBadge,
            userAnswer.isCorrect ? styles.correctBadge : styles.incorrectBadge,
          ]}
        >
          <Text style={styles.statusText}>
            {userAnswer.isCorrect
              ? "✓ Correct"
              : isAnswered
              ? "✗ Incorrect"
              : "- Unanswered"}
          </Text>
        </View>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>{question.question}</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => {
          const isCorrectAnswer = index === question.correctAnswer;
          const isUserAnswer = index === userAnswer.selectedAnswer;
          const isWrongAnswer = isUserAnswer && !isCorrectAnswer;

          return (
            <View
              key={index}
              style={[
                styles.optionItem,
                isCorrectAnswer && styles.correctOption,
                isWrongAnswer && styles.wrongOption,
              ]}
            >
              <View
                style={[
                  styles.optionLabel,
                  isCorrectAnswer && styles.correctLabel,
                  isWrongAnswer && styles.wrongLabel,
                ]}
              >
                <Text
                  style={[
                    styles.optionLabelText,
                    (isCorrectAnswer || isWrongAnswer) &&
                      styles.optionLabelTextWhite,
                  ]}
                >
                  {optionLabels[index]}
                </Text>
              </View>
              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionText,
                    isCorrectAnswer && styles.correctText,
                    isWrongAnswer && styles.wrongText,
                  ]}
                >
                  {option}
                </Text>
                {isCorrectAnswer && (
                  <Text style={styles.correctIndicator}>✓ Correct Answer</Text>
                )}
                {isWrongAnswer && (
                  <Text style={styles.wrongIndicator}>✗ Your Answer</Text>
                )}
              </View>
            </View>
          );
        })}
      </View>

      {/* Category */}
      <View style={styles.footer}>
        <Text style={styles.categoryLabel}>Category: {question.category}</Text>
        {isAnswered && (
          <Text style={styles.timeLabel}>Time: {userAnswer.timeTaken}s</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  correctBadge: {
    backgroundColor: "#4CAF50",
  },
  incorrectBadge: {
    backgroundColor: "#F44336",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 16,
    lineHeight: 22,
  },
  optionsContainer: {
    marginBottom: 12,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  correctOption: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
  },
  wrongOption: {
    backgroundColor: "#FFEBEE",
    borderColor: "#F44336",
  },
  optionLabel: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  correctLabel: {
    backgroundColor: "#4CAF50",
  },
  wrongLabel: {
    backgroundColor: "#F44336",
  },
  optionLabelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  optionLabelTextWhite: {
    color: "#fff",
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  correctText: {
    color: "#2E7D32",
    fontWeight: "500",
  },
  wrongText: {
    color: "#C62828",
    fontWeight: "500",
  },
  correctIndicator: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
    marginTop: 4,
  },
  wrongIndicator: {
    fontSize: 12,
    color: "#F44336",
    fontWeight: "600",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  categoryLabel: {
    fontSize: 12,
    color: "#666",
  },
  timeLabel: {
    fontSize: 12,
    color: "#666",
  },
});

export default ReviewItem;
