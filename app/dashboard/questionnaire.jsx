import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

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

const primaryColor = "#2C6E49";
const bgColor = "#EBE9E3";

const Questionnaire = () => {
  const router = useRouter();
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
      // Here you can process answers or send to backend before navigation
      alert("User answers: " + JSON.stringify(answers, null, 2));
      router.push("/home"); // Navigate to Home screen (adjust path if needed)
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
                  borderColor: isSelected ? primaryColor : "#ccc",
                  backgroundColor: isSelected ? primaryColor : "#F3F5F9",
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
          { backgroundColor: isNextDisabled ? "#aaa" : primaryColor },
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
    backgroundColor: bgColor,
    justifyContent: "center",
  },
  question: {
    fontWeight: "600",
    fontSize: 22,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    color: "#2C6E49",
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
    justifyContent: "center",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
    borderWidth: 2,
    marginRight: 12,
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
    marginTop: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});