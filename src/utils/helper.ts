import { Question, UserAnswer } from "../types";

/**
 * Calculate the total score based on user answers
 * @param userAnswers - Array of user answers
 * @returns Total score (number of correct answers)
 */
export const calculateScore = (userAnswers: UserAnswer[]): number => {
  return userAnswers.filter((answer) => answer.isCorrect).length;
};

/**
 * Check if a selected answer is correct
 * @param question - The question object
 * @param selectedAnswer - Index of the selected answer
 * @returns Boolean indicating if answer is correct
 */
export const isAnswerCorrect = (
  question: Question,
  selectedAnswer: number
): boolean => {
  return question.correctAnswer === selectedAnswer;
};

/**
 * Calculate percentage score
 * @param score - Number of correct answers
 * @param total - Total number of questions
 * @returns Percentage as a number
 */
export const calculatePercentage = (score: number, total: number): number => {
  return Math.round((score / total) * 100);
};

/**
 * Get performance message based on score percentage
 * @param percentage - Score percentage
 * @returns Motivational message
 */
export const getPerformanceMessage = (percentage: number): string => {
  if (percentage >= 90) return "Outstanding! 🎉";
  if (percentage >= 70) return "Great job! 👏";
  if (percentage >= 50) return "Good effort! 👍";
  if (percentage >= 30) return "Keep practicing! 💪";
  return "Don't give up! 📚";
};

/**
 * Format time in MM:SS format
 * @param seconds - Time in seconds
 * @returns Formatted time string
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Shuffle array (for randomizing questions if needed in future)
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
