import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async () => {
    // Clear any previous error messages
    setErrorMessage('');

    // Basic validation for email and password
    if (!email || !password) {
      setErrorMessage('Email and password cannot be empty.');
      return;
    }

    try {
      let response = await fetch('http://drf-auth-demo.vishvaraj.me/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      let json = await response.json();

      if (response.ok) {
        // Registration was successful
        Alert.alert('Registration Successful', 'You can now login with your credentials.', [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        // If the server response was not ok, handle errors
        throw new Error(json.message || 'Failed to register.');
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
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <Button title="Register" onPress={handleRegistration} />
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')} // Make sure 'Register' matches the name in the navigator
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    borderBottomColor: 'gray',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default RegisterScreen;
