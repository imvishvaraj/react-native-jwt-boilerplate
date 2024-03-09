import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    try {
      let response = await fetch("http://drf-auth-demo.vishvaraj.me/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      let json = await response.json();

      if (response.ok) {
        // Assuming the token is in the json response and navigation is set up
        const access_token = json.tokens.access;

        if (access_token) {
          // Convert the token to a string if it's not already
          const tokenString = String(access_token);
          await AsyncStorage.setItem("access_token", tokenString);
          navigation.navigate("UserInfo");
        } else {
          // Handle the absence of a token in the response
          throw new Error("No token received");
        }
      } else {
        // If the response status code is not OK, handle it as an error
        throw new Error(json.message || "An error occurred during login.");
      }
    } catch (error) {
      // If an exception is caught, set it as the error message to be displayed
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <Button title="Login" onPress={login} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')} // Make sure 'Register' matches the name in the navigator
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    borderBottomColor: "gray",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
});

export default LoginScreen;
