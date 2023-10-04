import { StyleSheet, Text, View, Image, ScrollView,TouchableOpacity } from 'react-native'
import { React, useEffect, useState, } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from "react-native-linear-gradient";


const TeacherDescription = ({ route }) => {

  const { teacherData } = route.params;
  const navigation = useNavigation()
 
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={{ alignItems: 'center', flex: 1 }}>

        <LinearGradient
          colors={["rgba(0, 237, 227, 0.863)", "rgba(102, 127, 243, 1)"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 30, fontFamily: 'Poppins-SemiBold', color: 'white' }}>{teacherData.name}</Text>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                }}
                source={{
                  uri: teacherData.profileImageUrl,
                }}
              />
            </View>

            <View style={{ paddingHorizontal: 15, marginTop: 5 }}>
              <Text style={{ fontSize: 15, textAlign: 'center',fontWeight:'bold' }}>{teacherData.bio}</Text>
            </View>


          </View>

        </LinearGradient>

        <View style={{ marginTop: 350, paddingHorizontal:15 }}>

          <Text style={{ fontWeight: 500, color: 'black', fontSize: 16, fontFamily: 'Poppins-Medium' }}>Overview</Text>


          <Text style={{ fontSize: 14, letterSpacing:0.2,lineHeight:18 }}>{teacherData.overview}</Text>
        </View>
     
        <View style={{marginTop:25,marginBottom:50}}>
        <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate("ChatScreen",{ userData: teacherData }) } >
      <Text style={styles.buttonText}>Continue (Rs.{teacherData.fees})</Text>
    </TouchableOpacity>

 
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default TeacherDescription

const styles = StyleSheet.create({
  gradient: {
    height: 200,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 110,
    position: 'absolute',
    width: '100%'
  },
  imageContainer: {
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'white',
    height: 160,
    width: 160,
    borderRadius: 80,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 50,

  },
  button: {
    backgroundColor: '#667FF3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

})