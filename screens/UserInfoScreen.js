import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const UserInfoScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      try {
        const access_token = await AsyncStorage.getItem('access_token');
        const response = await fetch('http://drf-auth-demo.vishvaraj.me/users/me/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        if (response.ok) {
          setUserInfo(json);
        } else {
          throw new Error(json.message || 'Error fetching user info');
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Information</Text>
      {userInfo && (
        <View>
          <Text style={styles.info}>Name: {userInfo.name}</Text>
          <Text style={styles.info}>Email: {userInfo.email}</Text>
          {/* Display other user info as needed */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
});

export default UserInfoScreen;