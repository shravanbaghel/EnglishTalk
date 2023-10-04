import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'

const StudentSettings = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity 
    style={{backgroundColor:'red', width:'50%', padding:20,alignItems:'center',borderRadius:20,marginTop:20,marginLeft:"25%"}}
    onPress={async()=>{ await Auth().signOut();
      navigation.dispatch(StackActions.replace("Homescreen"))
    }}
    >

      <Text style={{fontWeight:700, color:'white'}}>LOGOUT</Text>
    </TouchableOpacity> 
    </View>
  )
}

export default StudentSettings

const styles = StyleSheet.create({})