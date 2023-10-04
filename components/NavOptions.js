import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import TeacherLoginScreen from '../screens/TeacherLoginScreen';

const data = [
    {
        id: 1,
        title: "I am a student",
        image: require('../images/student.png'),
        screen: "StudentLoginScreen"
    },
    {
        id: 2,
        title: "I am a teacher",
        image: require('../images/teacher.png'),
        screen:"TeacherLoginScreen"
    }
]

const NavOptions = () => {
    const navigation = useNavigation();
    return (
        <FlatList

            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.buttons} onPress={()=> navigation.navigate(item.screen)}   >
                    <View>
                        <Image
                            style={{ height: 120, width: 120, resizeMode: 'contain', }}
                            source={item.image} />
                        <Text style={{ fontFamily: 'Poppins-Bold', color: 'black', textAlign: 'center' }} >{item.title}</Text>
                    </View>

                </TouchableOpacity>
            )}

        />
    )
}

export default NavOptions

const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        backgroundColor: 'white',
        height: 150,
        justifyContent: 'space-around',
        borderRadius: 16,
        marginTop: 20,
        padding: 20,
        marginLeft: 30,
        shadowColor: 'black',
        shadowOffset: { width: -5, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation:4,

    }
})