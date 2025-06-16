import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";

const questions = [
  {
    question: "What ethical practices matter most to you?",
    options: [
      "Fair Labor",
      "Carbon Footprint",
      "Supply Chain Transparency",
      "Animal Welfare",
      "Recycled Materials",
    ],
  },
  {
    question: "Which fabric materials do you prefer?",
    options: [
      "Organic Cotton",
      "Recycled Polyester",
      "Hemp",
      "Linen",
      "Conventional Cotton",
      "Polyester",
      "Wool",
      "Leather",
    ],
  },
  {
    question: "Are there any deal breakers for you?",
    options: [
      "Animal Products",
      "Synthetic Virgin Polyester",
      "Non-transparent Sourcing",
    ],
  },
];

const green = "#2a9d8f";

const Questionnaire = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const { question, options } = questions[currentStep];

  const toggleOption = (option) => {
    setAnswers((prev) => {
      const selected = prev[currentStep] || [];
      const isSelected = selected.includes(option);
      const updated = isSelected
        ? selected.filter((o) => o !== option)
        : [...selected, option];
      return { ...prev, [currentStep]: updated };
    });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("User answers:", answers);
      // TODO: submit answers or navigate somewhere
      // Example: navigate to home or summary screen
      navigation.navigate("Home");
    }
  };

  const isNextDisabled = !answers[currentStep] || answers[currentStep].length === 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.question}>{question}</Text>

      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = (answers[currentStep] || []).includes(option);
          return (
            <Pressable
              key={option}
              onPress={() => toggleOption(option)}
              style={[
                styles.option,
                {
                  borderColor: isSelected ? green : "#ccc",
                  backgroundColor: isSelected ? green : "#f5f5f5",
                },
              ]}
            >
              <Text style={[styles.optionText, { color: isSelected ? "#fff" : "#333" }]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={handleNext}
        disabled={isNextDisabled}
        style={[
          styles.nextButton,
          { backgroundColor: isNextDisabled ? "#aaa" : green },
        ]}
      >
        <Text style={styles.nextButtonText}>
          {currentStep === questions.length - 1 ? "Finish" : "Next"}
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Questionnaire;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  question: {
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#eee",
    paddingBottom: 10,
    color: "#222",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14, // gap is not supported in RN, use margin
    marginBottom: 30,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
    borderWidth: 2,
    marginRight: 14,
    marginBottom: 14,
    minWidth: 130,
    alignItems: "center",
  },
  optionText: {
    fontWeight: "500",
  },
  nextButton: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});