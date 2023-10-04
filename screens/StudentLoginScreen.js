import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';





const StudentLoginScreen = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  

  



  const handleSignUp = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const response = await auth().createUserWithEmailAndPassword(email, password)

      

        const studentData = {
          id: response.user.uid,
          email: email,
          name: name,
          userType: "student",
        }

        await firestore().collection('users').doc(response.user.uid).set(studentData)


          await auth().currentUser.sendEmailVerification();

          await auth().signOut();




          Alert.alert("Verify your email","We have sent you a verification mail")

         setMessage('')
         navigation.navigate("StudentLoginScreen1")
      } else {
        Alert("Please enter the deatils first")
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message)

    }
  }


  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={{ paddingHorizontal: 30, justifyContent: 'center' }}>

          <Image source={require('../images/studentlogin.jpg')} style={styles.image} />


          <Text style={{ fontSize: 20, color: '#333', fontFamily: 'Poppins-SemiBold', marginTop: 20, marginBottom: 25 }}>Register</Text>

          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 8, marginBottom: 25 }}>

            <Icon name="person" size={22} color="black" />
            <TextInput placeholder='Enter your name' style={{ marginLeft: 10, paddingVertical: 0 }} keyboardType='email-address'
              value={name}
              onChangeText={value => setName(value)} />


          </View>


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

          <TouchableOpacity onPress={() => handleSignUp()} style={{ backgroundColor: "#667FF3", padding: 20, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{
              textAlign: 'center', fontWeight: 700,
              fontSize: 16, color: 'white'
            }} >Sign up</Text>
          </TouchableOpacity>

          <Text style={{ color: 'red' }} >{message}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('StudentLoginScreen1')}
            >
              <Text style={{ fontSize: 14, fontWeight: 700, color: '#667FF3' }}> Login</Text>
            </TouchableOpacity>
          </View>


        </View>

      </SafeAreaView>
    </ScrollView>
  )
}

export default StudentLoginScreen

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 250,
    marginLeft: 50

  }
})