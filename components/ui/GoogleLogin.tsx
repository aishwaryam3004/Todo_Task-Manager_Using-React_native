import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Alert, Button, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD9qgw8q3qIV7VdbPg2Ql5Yx7jInhq3a_o",
  authDomain: "todohackathonapp-5d7a0.firebaseapp.com",
  projectId: "todohackathonapp-5d7a0",
  storageBucket: "todohackathonapp-5d7a0.appspot.com",
  messagingSenderId: "1008081066989",
  appId: "1:1008081066989:web:a4413e58abf2057f40a5e4"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function GoogleLogin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: '1008081066989-uh7n9h3s32rabdljnn8ia98r2ofl40u2.apps.googleusercontent.com',
  redirectUri: 'https://auth.expo.io/@aishwarya_m_30/todo-hackathon', // ✅ Important!
});

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.idToken) {
      const credential = GoogleAuthProvider.credential(response.authentication.idToken);
      signInWithCredential(auth, credential)
        .then(userCredential => {
          Alert.alert("Login Success", userCredential.user.email || "No email");
        })
        .catch(error => {
          Alert.alert("Login Failed", error.message);
        });
    }
  }, [response]);

  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Sign in with Google" disabled={!request} onPress={() => promptAsync()} />
    </View>
  );
}
