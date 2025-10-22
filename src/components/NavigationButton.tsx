import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface NavigationButtonsProps {
  onNext: () => void;
  isNextDisabled: boolean;
  isLastQuestion: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  isNextDisabled,
  isLastQuestion,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.nextButton, isNextDisabled && styles.nextButtonDisabled]}
        onPress={onNext}
        disabled={isNextDisabled}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.nextButtonText,
            isNextDisabled && styles.nextButtonTextDisabled,
          ]}
        >
          {isLastQuestion ? "Submit Quiz" : "Next Question"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 20,
  },
  nextButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonDisabled: {
    backgroundColor: "#cccccc",
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButtonTextDisabled: {
    color: "#999",
  },
});

export default NavigationButtons;
