import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface NavigationButtonsProps {
  onBack: () => void;
}

const BackNavigationButton: React.FC<NavigationButtonsProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    marginRight: 16,
  },
});

export default BackNavigationButton;
