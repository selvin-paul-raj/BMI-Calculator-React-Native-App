import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Linking,
} from "react-native";
import bg from "./assets/bg.png";

export default function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");
  const [bmiResult, setBMIResult] = useState("");
  const [validationError, setValidationError] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) {
      // Display validation error message if height or weight is empty
      setValidationError("Please enter both height and weight.");
      return;
    }
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const result = weightInKg / (heightInMeters * heightInMeters);
    const roundedResult = result.toFixed(2);

    setBMI(roundedResult);
    setValidationError("");

    if (roundedResult < 18.5) {
      setBMIResult("Underweight");
    } else if (roundedResult >= 18.5 && roundedResult < 25) {
      setBMIResult("Normal weight");
    } else if (roundedResult >= 25 && roundedResult < 30) {
      setBMIResult("Overweight");
    } else {
      setBMIResult("Obesity");
    }
  };

  const clearData = () => {
    // Clear input fields and reset state values
    setHeight("");
    setWeight("");
    setBMI("");
    setBMIResult("");
    setValidationError("");
  };
  const github = () => {
    Linking.openURL("https://github.com/SPRHackz");
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>

        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Height"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Weight"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateBMI}
          >
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearData}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {validationError ? (
          <Text style={styles.validationError}>{validationError}</Text>
        ) : null}

        {bmi && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Your BMI : {bmi}</Text>
            <Text style={styles.bmiCategory}>{bmiResult}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={github}>
        <Text style={styles.github}>&copy; 2023 SPR Hackz</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textShadowColor: "blue",
    textShadowRadius: 13,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  input: {
    width: 230,
    height: 45,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
    marginBottom: 15,
    fontSize: 17,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 5,
    gap: 10,
  },
  calculateButton: {
    backgroundColor: "#ff6661",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    width: 100,
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    width: 70,
    textAlignVertical: "center",
  },
  clearButtonText: {
    color: "#ff6661",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  bmiCategory: {
    fontSize: 31,
    color: "white",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  validationError: {
    color: "#fff",
    margin: 10,
    fontSize: 19,
  },
  github: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 5,
    textShadowRadius: 5,
    textShadowColor: "black",
  },
});
