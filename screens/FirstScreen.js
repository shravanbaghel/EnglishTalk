import { Image, ImageBackground, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import {React,useState,useEffect} from 'react';
import NavOptions from '../components/NavOptions';
import AsyncStorage from '@react-native-async-storage/async-storage'



const FirstScreen = () => {
  
  return (
    <View style={styles.container}>

<ImageBackground source={require('../images/main_screen.png')}
        style={styles.backgroundImage} >

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Learn English</Text>
        </View>

        <View style={styles.smallTextContainer}>
          <Text style={styles.smallText}>With Proffesional Guidance.</Text>
        </View>

        
        
        <View style={styles.boxWrapper}>
        
        <View style={styles.box}>
        <NavOptions/>
        </View>
        </View>


        


      </ImageBackground>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor:'black'
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    resizeMode:"cover",
    // justifyContent:"flex-end"
  },
  box: {
    flex: 1,
    height: 200,
    width: "100%",
    position: 'absolute',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "flex-end",
  },
  headerTextContainer: {
    flex: 1,
    position: 'absolute',
    marginTop: 350,
    marginLeft: 20
  },
  headerText: {
    fontSize: 35,
    color: "white",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily:'Poppins-Bold',

  },
  smallTextContainer: {
    flex: 1,
    position: 'absolute',
    marginTop: 400,
    marginLeft: 20,
    
  },
  smallText: {
    fontSize: 18,
    color: "white",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily:'Poppins-Medium',


  },
  boxWrapper:{
    flex:1,
    position:'relative',
    justifyContent:'flex-end',
  },
})


export default FirstScreen;

