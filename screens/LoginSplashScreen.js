import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Auth from '@react-native-firebase/auth'
import { StackActions, useNavigation ,useRoute} from '@react-navigation/native'

import firestore from '@react-native-firebase/firestore';

const LoginSplashScreen = ({}) => {

  const route = useRoute();
 
  const navigation = useNavigation()

  const userType = route.params?.userType;



  useEffect(() => {
    const unsubscribe = Auth().onAuthStateChanged(async (user) => {
      if (user) {
        const collectionRef = firestore().collection('users');
        try {
          const querySnapshot = await collectionRef.where('id', '==', user.uid).get();
          if (!querySnapshot.empty) {
            const documentSnapshot = querySnapshot.docs[0];
            const userData = {
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            };

            // Determine the initial route based on user type
            const initialRoute = userData.userType === 'teacher' ? 'TeacherDashboard' : 'StudentHomeScreen';
            navigation.dispatch(StackActions.replace(initialRoute));
          } else {
            // Handle the case where user data is not found
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      } else {
        // User is not logged in; navigate to the default route (e.g., Homescreen)
        navigation.dispatch(StackActions.replace('Homescreen'));
      }

      unsubscribe(); // Clean up the event listener
    });
  }, []);



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={40} color="#667FF3" />
    </View>
  )
}

export default LoginSplashScreen

const styles = StyleSheet.create({})