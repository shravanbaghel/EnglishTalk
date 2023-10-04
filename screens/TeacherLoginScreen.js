import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import TeacherLoginScreen1 from './TeacherLoginScreen1';
TeacherLoginScreen1
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';




const TeacherLoginScreen = () => {

  const [imageData, setImageData] = useState(null)

  const navigation = useNavigation();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [bio, setBio] = useState('')
  const [fees, setFees] = useState('')
  const [overview, setOverview] = useState('')



  const pickImage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: "cachesDirectory",
      })
      console.log(response);
      setImageData(response)
    } catch (error) {
      console.log(error);
    }
  }

  const uploadImage = async (uid) => {
    try {
      if (!imageData) return;

      const imageRef = storage().ref(`/profilePictures/${uid}/${imageData.name}`);
      await imageRef.putFile(imageData.fileCopyUri);

      const imageUrl = await imageRef.getDownloadURL();

      // Store the image URL in Firestore
      await firestore().collection('users').doc(uid).update({
        profileImageUrl: imageUrl,
      });

      Alert.alert('Your Profile Image is uploaded successfully');
    } catch (error) {
      console.log(error);
    }
  }
  const handleSignUp = async () => {
    try {
      if (email.length > 0 && password.length > 0 && name.length > 0 && bio.length > 0 & fees.length > 0) {
        const response = await auth().createUserWithEmailAndPassword(email, password);



        const teacherData = {
          id: response.user.uid,
          name: name,
          email: email,
          userType: "teacher",
          bio: bio,
          fees: fees,
          overview: overview,
        }

        await firestore().collection('users').doc(response.user.uid).set(teacherData)

        await auth().currentUser.sendEmailVerification();

        await auth().signOut();

        // Upload the profile image after user creation
        uploadImage(response.user.uid);

        Alert.alert("Verify your email", "We have sent you a verification mail")

        setMessage('')
        navigation.navigate("TeacherLoginScreen1")
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
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginTop: 15 }}>

        <View style={{ paddingHorizontal: 30, justifyContent: 'center', }}>

          {/* <Image source={require('../images/teacherLogin.png') } style={styles.image1}/> */}


          {/* PROFILE IMAGE CONTAINER */}

          <View style={styles.profileContainer}>

            <View style={styles.imgContainer}>

              {
                imageData ? (<Image style={styles.image} source={{ uri: imageData.uri }} />) : (<Image style={styles.image} source={require('../images/defaultProfilePic.png')} />)
              }

              <TouchableOpacity onPress={() => pickImage()} style={{ alignItems: 'flex-end', top: -20, left: 10 }}>

                <Icon name="edit" size={30} color="#667FF3" />

              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}></View>

          </View>


          <Text style={{ fontSize: 20, color: '#333', fontFamily: 'Poppins-SemiBold', marginTop: 20, marginBottom: 25 }}>Register</Text>

          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 8, marginBottom: 25 }}>


            <Icon1 name="user" size={22} color="black" />
            <TextInput placeholder='Enter Your Fullname' style={{ marginLeft: 10, paddingVertical: 0 }} keyboardType='name-phone-pad'
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
              placeholder='Enter password'
              style={{ marginLeft: 10, paddingVertical: 0 }}
              secureTextEntry={true}
              value={password}
              onChangeText={value => setPassword(value)}
            />


          </View>

          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 8, marginBottom: 20 }}>

            <Icon name="bookmark-outline" size={22} color="black" />
            <TextInput
              placeholder='Enter your Bio'
              style={{ marginLeft: 10, paddingVertical: 0 }}
              value={bio}
              onChangeText={value => setBio(value)}
            />


          </View>

          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 8, marginBottom: 20 }}>

            <Icon name="currency-rupee" size={22} color="black" />
            <TextInput
              placeholder='Enter your Fees per Month. Example: 500'
              keyboardType='number-pad'
              style={{ marginLeft: 10, paddingVertical: 0 }}
              value={fees}
              onChangeText={value => setFees(value)}
            />


          </View>

          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: 'row', alignItems: 'flex-start', paddingBottom: 100, marginBottom: 20 }}>

            <Icon name="edit-note" size={22} color="black" />
            <TextInput
              placeholder='Write a detailed Overview'
              style={{ marginLeft: 10, paddingVertical: 0 }}
              value={overview}
              onChangeText={value => setOverview(value)}
              multiline={true}
            />


          </View>

          <TouchableOpacity onPress={() => handleSignUp()} style={{ backgroundColor: "#667FF3", padding: 20, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{
              textAlign: 'center', fontWeight: 700,
              fontSize: 16, color: 'white'
            }} >Sign up</Text>
          </TouchableOpacity>

          <Text style={{ color: 'red' }} >{message}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('TeacherLoginScreen1')}
            >
              <Text style={{ fontSize: 14, fontWeight: 700, color: '#667FF3' }}> Login</Text>
            </TouchableOpacity>
          </View>


        </View>

      </SafeAreaView>
    </ScrollView>
  )
}

export default TeacherLoginScreen

const styles = StyleSheet.create({
  image1: {
    height: 250,
    width: 250,
    marginLeft: 50

  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'

  },
  profileContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: '#D3D3D3',
    borderWidth: 2,

  },
  imgContainer: {
  },
  textContainer: {},
})