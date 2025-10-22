import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

interface TimerProps {
  duration: number; // Duration in seconds
  onTimeout: () => void; // Callback when timer reaches 0
  isPaused?: boolean;
  onTimeUpdate?: (timeLeft: number) => void; // Callback for time updates
}

const Timer: React.FC<TimerProps> = ({
  duration,
  onTimeout,
  isPaused = false,
  onTimeUpdate,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasCalledTimeout = useRef(false);

  useEffect(() => {
    // Reset timer when duration changes (new question)
    setTimeLeft(duration);
    hasCalledTimeout.current = false;
  }, [duration]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;

        // Notify parent of time update
        if (onTimeUpdate) {
          onTimeUpdate(newTime);
        }

        // When time runs out
        if (newTime <= 0) {
          if (!hasCalledTimeout.current) {
            hasCalledTimeout.current = true;
            onTimeout();
          }
          return 0;
        }

        return newTime;
      });
    }, 1000);

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, onTimeout, onTimeUpdate]);

  // Determine color based on time left
  const getTimerColor = () => {
    if (timeLeft > 20) return "#4CAF50"; // Green
    if (timeLeft > 10) return "#FFC107"; // Yellow
    return "#F44336"; // Red
  };

  const percentage = (timeLeft / duration) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.timerBar}>
        <View
          style={[
            styles.timerFill,
            {
              width: `${percentage}%`,
              backgroundColor: getTimerColor(),
            },
          ]}
        />
      </View>
      <Text style={[styles.timerText, { color: getTimerColor() }]}>
        {timeLeft}s
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  timerBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 12,
  },
  timerFill: {
    height: "100%",
    borderRadius: 4,
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 40,
    textAlign: "right",
  },
});

export default Timer;
