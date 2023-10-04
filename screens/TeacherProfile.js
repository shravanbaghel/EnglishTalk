import { Alert, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { React, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, StackActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from "react-native-linear-gradient";


const TeacherProfile = () => {

  const [user, setUser] = useState('')
  const [imageData, setImageData] = useState(null)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [fees, setFees] = useState('')
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [overview, setOverview] = useState('')



  const navigation = useNavigation()



  useEffect(() => {
    const fetchProfileData = async () => {
      const teacher = auth().currentUser;
      setUser(teacher);

      // Fetch the user's profile data from Firestore
      const userDoc = await firestore().collection('users').doc(teacher.uid).get();
      const userData = userDoc.data();

      if (userData) {
        // Set the initial state with previous values
        setName(userData.name || ''); // Use an empty string as a fallback
        setBio(userData.bio || '');
        setFees(userData.fees || '');
        setOverview(userData.overview || '')
      }

      if (userData.profileImageUrl) {
        setProfileImageUrl(userData.profileImageUrl);
      }
    };

    fetchProfileData();
  }, [])


  const pickImage = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: "cachesDirectory",
      })
      console.log(response);
      setImageData(response)
      setProfileImageUrl(null);
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

      Alert.alert('Update Successful!');
    } catch (error) {
      console.log(error);
    }
  }

  const updateProfile = async () => {
    try {
      // Get the current user's UID
      const uid = auth().currentUser.uid;

      // Update the user's details in Firestore
      await firestore().collection('users').doc(uid).update({
        name: name,
        bio: bio,
        fees: fees,
        overview: overview,
      });

      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);

    }
  };

  const handleUpdate = async () => {
    await uploadImage(user.uid);
    updateProfile()

  }



  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>

        <View>
        <LinearGradient
            colors={['#667FF3', 'white', '#fff']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >

        <View style={{ paddingHorizontal: 30, justifyContent: 'center',}}>




          {/* PROFILE IMAGE CONTAINER */}

          <View style={styles.profileContainer}>

            <View style={styles.imgContainer}>


              {
                imageData ? (
                  <Image style={styles.image} source={{ uri: imageData.uri }} />
                ) : profileImageUrl ? (
                  <Image style={styles.image} source={{ uri: profileImageUrl }} />
                ) : (
                  <Image style={styles.image} source={require('../images/defaultProfilePic.png')} />
                )
              }

              <TouchableOpacity onPress={() => pickImage()} style={{ alignItems: 'flex-end', top: -20, left: 10 }}>

                <Icon name="edit" size={30} color="white" />

              </TouchableOpacity>
            </View>
            

          </View>
          <Text style={{ fontSize: 26, color: 'white', fontFamily: 'Poppins-SemiBold', marginTop: 20,textAlign:'center',}}>Welcome back, {name}!</Text>



          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Poppins-SemiBold', marginTop: 20, marginBottom: 2,borderBottomWidth:0.5,borderBottomColor:'white',marginBottom:10,width:'50%' }}>Update Your Profile</Text>
          

          </View>
          


          <View style={{height:'100%',backgroundColor:'white',width:'100%',borderTopLeftRadius:30,borderTopRightRadius:30,paddingHorizontal:30,padding:20}}>

          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 8, marginBottom: 25, }}>


            <Icon1 name="user" size={22} color="black" />
            <TextInput placeholder="Update your name" style={{ marginLeft: 10, paddingVertical: 0 }} keyboardType='name-phone-pad'
              value={name}
              onChangeText={value => setName(value)} />
               


          </View>
          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 8, marginBottom: 20 }}>

            <Icon name="bookmark-outline" size={22} color="black" />
            <TextInput
              placeholder='Update your Bio'
              style={{ marginLeft: 10, paddingVertical: 0 }}
              value={bio}
              onChangeText={value => setBio(value)}
            />


          </View>
          <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', paddingBottom: 8, marginBottom: 20 }}>

            <Icon name="currency-rupee" size={22} color="black" />
            <TextInput
              placeholder='Update your Fees per Month. Example: 500'
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
          <TouchableOpacity onPress={() => handleUpdate()} style={{ backgroundColor: "#667FF3", padding: 20, borderRadius: 20, marginBottom: 10 }}>
            <Text style={{
              textAlign: 'center', fontWeight: 700,
              fontSize: 16, color: 'white'
            }} >Update</Text>
          </TouchableOpacity>
          <View style={{marginBottom:100}}>
         
            <TouchableOpacity
            style={{ backgroundColor: "white", padding: 10, borderRadius: 20,justifyContent:'center',alignItems:'center',flexDirection:'row' }}

              onPress={async () => {
                await auth().signOut();
                navigation.dispatch(StackActions.replace("Homescreen"))
              }}
            >
              <Icon name="logout" size={25} color="red" />
               <Text style={{
              textAlign: 'center', fontWeight: 700,
              fontSize: 16, color: 'red'
            }} > Logout</Text>
            
              
             



            </TouchableOpacity>
            </View>

          </View>
          </LinearGradient>
         



          
          

          

      
      





        </View>

      </SafeAreaView>
    </ScrollView>
  )
}

export default TeacherProfile

const styles = StyleSheet.create({
  gradient: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'

  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: '#D3D3D3',
    borderWidth: 2,

  },
  imgContainer: {
    marginVertical:10,
  },
  textContainer: {},

})



