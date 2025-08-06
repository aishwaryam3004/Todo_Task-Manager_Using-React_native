import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../context/AuthContext';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID_HERE',
});

export default function AuthScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      navigation.replace('Tasks');
    } catch (error) {
      alert('Login Failed. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title='Sign in with Google' onPress={signInWithGoogle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});