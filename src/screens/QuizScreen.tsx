import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useQuiz } from "@/context/QuizContext";
import ProgressBar from "@/components/ProgressBar";
import NavigationButtons from "@/components/NavigationButton";
import OptionButton from "@/components/OptionButton";
import QuestionCard from "@/components/QuestionCard";
import Timer from "@/components/Timer";
import BackNavigationButton from "@/components/BackNavigationButton";

const TIMER_DURATION = 30; // 30 seconds per question

const QuizScreen: React.FC = () => {
  const router = useRouter();
  const {
    quizState,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    markAsUnanswered,
    completeQuiz,
  } = useQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timerKey, setTimerKey] = useState(0); // Key to reset timer
  const [timeSpent, setTimeSpent] = useState(TIMER_DURATION);
  const hasAnswered = useRef(false);

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const isLastQuestion =
    quizState.currentQuestionIndex === quizState.questions.length - 1;

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setTimerKey((prev) => prev + 1); // Reset timer
    setTimeSpent(TIMER_DURATION);
    hasAnswered.current = false;
  }, [quizState.currentQuestionIndex]);

  // Handle answer selection
  const handleSelectAnswer = (answerIndex: number) => {
    if (hasAnswered.current) return; // Prevent multiple selections

    setSelectedAnswer(answerIndex);
    hasAnswered.current = true;

    // Record the answer
    const timeTaken = TIMER_DURATION - timeSpent;
    answerQuestion(currentQuestion.id, answerIndex, timeTaken);
  };

  // Handle timer timeout
  const handleTimeout = () => {
    if (hasAnswered.current) return; // Already answered, ignore timeout

    // Mark as unanswered
    markAsUnanswered(currentQuestion.id);

    // Auto-advance to next question or complete quiz
    if (isLastQuestion) {
      completeQuiz();
      router.push("/result");
    } else {
      nextQuestion();
    }
  };

  // Handle Next button press
  const handleNext = () => {
    if (isLastQuestion) {
      // Complete quiz and go to result screen
      completeQuiz();
      router.push("/result");
    } else {
      // Move to next question
      nextQuestion();
    }
  };

  // Update time spent
  const handleTimeUpdate = (timeLeft: number) => {
    setTimeSpent(timeLeft);
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProgressBar
          current={quizState.currentQuestionIndex}
          total={quizState.questions.length}
        />

        <Timer
          key={timerKey}
          duration={TIMER_DURATION}
          onTimeout={handleTimeout}
          isPaused={hasAnswered.current}
          onTimeUpdate={handleTimeUpdate}
        />

        <QuestionCard
          questionNumber={quizState.currentQuestionIndex + 1}
          totalQuestions={quizState.questions.length}
          question={currentQuestion.question}
          category={currentQuestion.category}
        />

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              option={option}
              index={index}
              isSelected={selectedAnswer === index}
              onPress={() => handleSelectAnswer(index)}
              disabled={hasAnswered.current}
            />
          ))}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BackNavigationButton onBack={previousQuestion} />
          <NavigationButtons
            onNext={handleNext}
            isNextDisabled={selectedAnswer === null}
            isLastQuestion={isLastQuestion}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  },
  optionsContainer: {
    marginTop: 8,
  },
});

export default QuizScreen;
