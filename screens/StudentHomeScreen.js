import { StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native'
import {React,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import StudentSettings from './StudentSettings'
import TeacherList from '../components/TeacherList';
StudentSettings



const StudentHomeScreen = ({route}) => {
  

 
  return (

 <SafeAreaView style={{backgroundColor:'white',height:'100%'}}>
  
  <View style={styles.search}>
  <TextInput placeholder='Search for teacher or course'/>
  <Icon name="search1" size={22} color="#667FF3"/>

  </View>

  <TeacherList/>
  
  
 </SafeAreaView>
 

  )
}

export default StudentHomeScreen

const styles = StyleSheet.create({
  search:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderWidth:1,
    marginTop:18,
    margin:10,
    paddingHorizontal:10,
    borderRadius:10,
    borderColor:"#C0C0C0",
    height:50,
  }
})






  