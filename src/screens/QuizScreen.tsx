import React, { useState, useEffect } from "react";
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

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const isLastQuestion =
    quizState.currentQuestionIndex === quizState.questions.length - 1;

  // Reset state when question changes
  useEffect(() => {
    const currentUserAnswer = quizState.userAnswers.find(
      (answer) => answer.questionId === currentQuestion?.id
    );

    // If question was already answered (confirmed), restore the state
    if (currentUserAnswer && currentUserAnswer.selectedAnswer !== null) {
      setSelectedAnswer(currentUserAnswer.selectedAnswer);
      // For answered questions, continue with remaining time (or 0 if time expired)
      const remainingTime = Math.max(
        0,
        TIMER_DURATION - currentUserAnswer.timeTaken
      );
      setTimeSpent(remainingTime);
    } else if (
      currentUserAnswer &&
      currentUserAnswer.timeTaken >= TIMER_DURATION
    ) {
      // Question was unanswered and time has elapsed (user either selected but didn't confirm, or never selected)
      setSelectedAnswer(null);
      setTimeSpent(0);
    } else {
      // Fresh question - reset everything
      setSelectedAnswer(null);
      setTimeSpent(TIMER_DURATION);
    }

    // Always reset timer key to restart timer component
    setTimerKey((prev) => prev + 1);
  }, [
    quizState.currentQuestionIndex,
    quizState.userAnswers,
    currentQuestion?.id,
  ]);

  // Handle answer selection (visual only, not confirmed yet)
  const handleSelectAnswer = (answerIndex: number) => {
    // Don't allow selection if time has expired
    if (timeSpent <= 0) return;

    // Only update visual state - answer is not confirmed until navigation/timeout
    setSelectedAnswer(answerIndex);
  };

  // Handle timer timeout
  const handleTimeout = () => {
    // If an answer was selected, confirm it with the full time taken
    if (selectedAnswer !== null) {
      answerQuestion(currentQuestion.id, selectedAnswer, TIMER_DURATION);
    } else {
      // No answer was selected, mark as unanswered
      markAsUnanswered(currentQuestion.id);
    }

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
    // Confirm the selected answer before moving on
    if (selectedAnswer !== null) {
      const timeTaken = TIMER_DURATION - timeSpent;
      answerQuestion(currentQuestion.id, selectedAnswer, timeTaken);
    }

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
          initialTime={timeSpent}
          onTimeout={handleTimeout}
          isPaused={false}
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
              disabled={timeSpent <= 0}
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
          <BackNavigationButton onBack={() => {
            // Confirm current answer before going back
            if (selectedAnswer !== null) {
              const timeTaken = TIMER_DURATION - timeSpent;
              answerQuestion(currentQuestion.id, selectedAnswer, timeTaken);
            }
            previousQuestion();
          }} />
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
