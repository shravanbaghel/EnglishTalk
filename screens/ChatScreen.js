import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { React, useState, useEffect } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = ({ route }) => {
    const { userData } = route.params
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState('')
    const navigation = useNavigation();

    useEffect(() => {
        
        const user = auth().currentUser;
        setUser(user)
     

        const docId = userData.id > user.uid ? user.uid + "-" + userData.id : userData.id + "-" + user.uid

        const messageRef = firestore().collection('chatrooms').doc(docId).collection('messages').orderBy("createdAt", "desc")

        messageRef.onSnapshot((querySnap) => {
            const allmsg = querySnap.docs.map(docSnap => {
                const data = docSnap.data()

                if (data.createdAt && data.createdAt.toDate) {
                    return {
                        ...docSnap.data(),
                        createdAt: data.createdAt.toDate()
                    };
                } else {
                    return {
                        ...docSnap.data(),
                        createdAt: new Date()
                    };
                }

            })
            setMessages(allmsg)
        })


    }, [])

    const onSend = (messageArray) => {
        const msg = messageArray[0];
        const myMsg = {
            ...msg,
            sentBy: user.uid,
            sentTo: userData.id,
            createdAt: new Date()

        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, myMsg)
        )
        const docId = userData.id > user.uid ? user.uid + "-" + userData.id : userData.id + "-" + user.uid
        firestore().collection('chatrooms').doc(docId).collection('messages').add({ ...myMsg, createdAt: firestore.FieldValue.serverTimestamp() })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="chevron-back-outline" size={22} color="#fff" />
                </TouchableOpacity>
                {
                    userData && userData.profileImageUrl ? (<Image source={{ uri: userData.profileImageUrl }} style={styles.profilePic} />)  :  (<Image source={require('../images/defaultProfilePic.png')} style={{width:46, height:46,borderRadius:23,marginLeft: 20, marginRight: 12,}} />)
                }
                 

                {/* <Image source={{ uri: userData.profileImageUrl }} style={styles.profilePic} /> */}
                <Text style={styles.name}>{userData.name}</Text>
                <View style={{ marginLeft: "90%", position: 'absolute' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('VideoCall')} >
                        <Icon name="videocam" size={26} color="#fff" />
                    </TouchableOpacity>
                </View>

            </View>


            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: user.uid,
                }}
                renderBubble={(props) => {
                    return <Bubble
                        {...props}
                        wrapperStyle={{
                            left: {
                                backgroundColor: "#d9d9d9"
                            }
                        }}
                        
                    />
                }}
            />
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#0080ff', // Change to your preferred background color
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    profilePic: {
        marginLeft: 20,
        width: 50,
        height: 50,
        borderRadius: 25, // Make it half of the width and height for a circular image
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        color: '#fff', // Change to your preferred text color
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular'
    },
})