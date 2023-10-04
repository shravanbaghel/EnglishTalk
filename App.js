import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import FirstScreen from './screens/FirstScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentLoginScreen from './screens/StudentLoginScreen';
import TeacherLoginScreen from './screens/TeacherLoginScreen';
import StudentLoginScreen1 from './screens/StudentLoginScreen1';
import StudentHomeScreen from './screens/StudentHomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentSettings from './screens/StudentSettings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TeacherLoginScreen1 from './screens/TeacherLoginScreen1';
import LoginSplashScreen from './screens/LoginSplashScreen';
import TeacherProfile from './screens/TeacherProfile';
import TeacherInbox from './screens/TeacherInbox';
LoginSplashScreen
import TeacherDashboard from './screens/TeacherDashboard';
import TeacherDescription from './screens/TeacherDescription';
import ChatScreen from './screens/ChatScreen';
ChatScreen
import VideoCall from './screens/VideoCall'



function StackNavigator() {

  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator  >
        <Stack.Screen
          name="LoginSplashScreen"
          component={LoginSplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Homescreen"
          component={FirstScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StudentLoginScreen"
          component={StudentLoginScreen}
          options={{
            title: " Welcome! Students",
            headerShadowVisible: false,
          }}
        />



        <Stack.Screen
          name="StudentLoginScreen1"
          component={StudentLoginScreen1}
          options={{
            title: "Student Login",
            headerShadowVisible: false,

          }}
        />
        <Stack.Screen
          name="StudentHomeScreen"
          component={TabNavigator}
          options={{
            title: "HomeScreen",
            headerShadowVisible: false,
            headerShown: false

          }}


        />


        <Stack.Screen
          name="TeacherLoginScreen"
          component={TeacherLoginScreen}
          options={{
            title: " Teacher Register",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="TeacherLoginScreen1"
          component={TeacherLoginScreen1}
          options={{
            title: " Teacher Login",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="TeacherDashboard"
          component={TeacherTabNavigator}
          options={{
            title: " Teacher Homescreen",
            headerShadowVisible: false,
            headerShown: false
          }}
        />
        <Stack.Screen
          name="TeacherDescription"
          component={TeacherDescription}
          options={{
            title: " Teacher Description",
            headerShadowVisible: false,
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            title:"Chat",
            headerShadowVisible: true,
            headerShown: false,


          }}
      
        


        />
         <Stack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{
            title:"VideoCall1",
            headerShadowVisible: true,
            headerShown: false,


          }}
      
        


        />





      </Stack.Navigator>




    </SafeAreaView>
  )
}

function TabNavigator() {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 3,
          borderRadius: 15,
          height: 80
        }
      }}
    >
      <Tab.Screen name="Home" component={StudentHomeScreen} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View>
            <Icon name="home" size={30} color={focused ? "#667FF3" : "#748c94"} />
          </View>
        )
      }} />
        
      <Tab.Screen name="StudentSettings" component={StudentSettings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name="person-outline" size={30} color={focused ? "#667FF3" : "#748c94"} />
            </View>
          )
        }} />


    </Tab.Navigator>
  )
}


function TeacherTabNavigator() {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 3,
          borderRadius: 15,
          height: 80
        }
      }}
    >
      <Tab.Screen name="TeacherHome" component={TeacherDashboard} options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View>
            <Icon name="space-dashboard" size={30} color={focused ? "#667FF3" : "#748c94"} />
          </View>
        )
      }} />
      <Tab.Screen name="TeacherInbox" component={TeacherInbox}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name="message" size={30} color={focused ? "#667FF3" : "#748c94"} />
            </View>
          )
        }} />
      <Tab.Screen name="TeacherProfile" component={TeacherProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name="person-outline" size={30} color={focused ? "#667FF3" : "#748c94"} />
            </View>
          )
        }} />


    </Tab.Navigator>
  )
}




const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);


  // useEffect(() => {

  // }, []);


  return (

    <NavigationContainer>
 

      <StackNavigator />

      

    </NavigationContainer>



  )
}

const styles = StyleSheet.create({})

export default App;
