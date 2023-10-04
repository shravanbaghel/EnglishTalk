import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react';
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import { create } from 'react-test-renderer';
import auth from '@react-native-firebase/auth';
import { useNavigation} from '@react-navigation/native';





export default function VideoCall(props) {

  const userId = auth().currentUser.uid;
  console.log(userId);

  const navigation = useNavigation()


    return (
  
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                appID={366486405}
                appSign={"1a73502d5728061c248176fc7928fd4f1dfde4c951f5f8a9b1a2c8b9517b4fdc"}
                userID={userId} // userID can be something like a phone number or the user id on your own user system. 
                userName={"shravan"}
                callID={"test123"} // callID can be any unique string. 

                config={{
                    // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { props.navigation.navigate('TeacherDashboard') },
                    onHangUp: () => { props.navigation.navigate('TeacherDashboard') },
                }}
            />
        </View>
    );
}



 




const styles = StyleSheet.create({
    container:{
      flex:1,
    }
  })
  