import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import StudentHomeScreen from './StudentHomeScreen';
StudentHomeScreen
import { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'


const StudentLoginScreen1 = () => {

  const navigation = useNavigation();
  let userType = 'student';

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [data, setData] = useState('')





  const handleLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const collectionRef = firestore().collection('users');

        // Fetch user data based on the user's UID
        const fetchData = async () => {
          try {
            const querySnapshot = await collectionRef.where('id', '==', user.uid).get();
            if (!querySnapshot.empty) {
              // Get the first document (there should only be one with the same UID)
              const documentSnapshot = querySnapshot.docs[0];
              const userData = {
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
              };

              if (userData.userType === 'student') {

                setData(userData);

                if (user.emailVerified) {
                  Alert.alert("You are verified", "Kindly restart the app before use");
                  await AsyncStorage.setItem('userLoggedIn', 'true');
                  const store = AsyncStorage.setItem('userType', 'student', (error) => {
                    if (error) {
                      console.error('Error setting userType in AsyncStorage:', error);
                    } else {
                      navigation.navigate("LoginSplashScreen", { userType: "student"});
                    }

                  });
                  // const hello = navigation.navigate("StudentLoginSplashScreen",{userType:"student"});


                  console.log(store, "this is store");
                } else {
                  // Handle the case where the user is not verified
                  Alert.alert("Please verify your email first", "New verification mail has been sent");
                  await auth().currentUser.sendEmailVerification();
                  await auth().signOut();
                }
              } else {
                // User is not a student, so ask them to login from the teacher login screen
                Alert.alert("Access Denied", "This section is intended for students. Please log in using the teacher login option if you are a teacher.");
                await auth().signOut();
              }
            } else {
              console.error('No user data found for the logged-in user');
            }
          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        };

        fetchData();
        setMessage('');
      } else {
        Alert.alert("Please enter the details first");
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={{ paddingHorizontal: 30, justifyContent: 'center' }}>

          <Image source={require('../images/studentLogin1.png')} style={styles.image} />


          <Text style={{ fontSize: 20, color: '#333', fontFamily: 'Poppins-SemiBold', marginTop: 20, marginBottom: 25 }}>Login</Text>


          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 8, marginBottom: 25 }}>

            <Icon name="alternate-email" size={22} color="black" />
            <TextInput placeholder='Enter your email' style={{ marginLeft: 10, paddingVertical: 0 }} keyboardType='email-address'
              value={email}
              onChangeText={value => setEmail(value)} />


          </View>

          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 8, marginBottom: 20 }}>

            <Icon name="lock-outline" size={22} color="black" />
            <TextInput
              placeholder='Enter your password'
              style={{ marginLeft: 10, paddingVertical: 0 }}
              secureTextEntry={true}
              value={password}
              onChangeText={value => setPassword(value)}

            />


          </View>

          <TouchableOpacity onPress={() => handleLogin()} style={{ backgroundColor: "#667FF3", padding: 20, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{
              textAlign: 'center', fontWeight: 700,
              fontSize: 16, color: 'white'
            }} >Login</Text>
          </TouchableOpacity>

          <Text style={{ color: 'red' }} >{message}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("StudentLoginScreen")}
            >
              <Text style={{ fontSize: 14, fontWeight: 700, color: '#667FF3' }}> Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Homescreen")}
            >
              <Icon name="home" size={30} color="#667FF3" />
            </TouchableOpacity>
          </View>


        </View>


      </SafeAreaView>

    </ScrollView>



  )
}
export default StudentLoginScreen1

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 250,
    marginLeft: 50

  }
})