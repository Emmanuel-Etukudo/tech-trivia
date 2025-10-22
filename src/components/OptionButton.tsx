import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface OptionButtonProps {
  option: string;
  index: number;
  isSelected: boolean;
  onPress: () => void;
  disabled: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  index,
  isSelected,
  onPress,
  disabled,
}) => {
  const optionLabels = ["A", "B", "C", "D"];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selected,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={[styles.label, isSelected && styles.labelSelected]}>
        <Text
          style={[styles.labelText, isSelected && styles.labelTextSelected]}
        >
          {optionLabels[index]}
        </Text>
      </View>
      <Text
        style={[styles.optionText, isSelected && styles.optionTextSelected]}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selected: {
    backgroundColor: "#E3F2FD",
    borderColor: "#007AFF",
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  labelSelected: {
    backgroundColor: "#007AFF",
  },
  labelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  labelTextSelected: {
    color: "#fff",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  optionTextSelected: {
    color: "#007AFF",
    fontWeight: "500",
  },
});

export default OptionButton;
