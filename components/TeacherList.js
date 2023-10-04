import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { React, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const TeacherList = () => {
  


  const [teachers, setTeachers] = useState([]);
  const navigation = useNavigation()

  useEffect(() => {
    // Fetch teacher data from Firestore
    const fetchTeachers = async () => {
      try {
        const teacherData = [];
        const querySnapshot = await firestore().collection('users').where('userType', '==', 'teacher').get();
        querySnapshot.forEach((doc) => {
          const teacher = doc.data();
          teacherData.push(teacher);
        });
        setTeachers(teacherData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const TeacherItem = ({ teacher }) => (
    <View style={{ margin: 10, padding: 5,}}>
      <TouchableOpacity onPress={()=> navigation.navigate("TeacherDescription",{teacherData: teacher} )} style={{ flexDirection: 'row', marginBottom: 15 }}>
        <View style={{}}>
          {
            teacher.profileImageUrl? (<Image
              style={{ aspectRatio: 4 / 5, height: 150, borderRadius: 10 }}
              source={{ uri: teacher.profileImageUrl }} />) : (<View>
                <Image style={styles.defaultImage} source={require('../images/defaultProfilePic.png')}/>
              </View>)
          }

        </View>

        <View style={{ marginLeft: 10, marginTop: 5, flexDirection: 'column', }}>
          <Text style={{ fontFamily: 'Poppins-Regular', color: 'black' }}>{teacher.name}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="stars" size={22} color="#fcca03" />
            <Text style={{ marginLeft: 5, fontWeight: 700, color: '#fcca03', }}>4.5 Rating</Text>
            <Text style={{ marginLeft: 5, color: 'gray', fontSize: 12 }}>(154)</Text>
          </View>

          <Text style={{ maxWidth: 200, marginTop: 10 }} >{teacher.bio}</Text>
          <View>
          <Text style={{ color: 'black', fontWeight: 500, fontSize: 16, marginTop: 10}} >₹{teacher.fees}</Text>
        </View>
        </View>

       
          
      </TouchableOpacity>

      <View style={{borderBottomColor:'#D3D3D3',borderWidth:0.2}}>
        
      </View>

    </View>

  );



  return (
    <SafeAreaView style={{flex:1}}>
    <View>
      <FlatList
        data={teachers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TeacherItem teacher={item} />}
      />
       <View style={{flex:1,marginBottom:50}}><Text>Hello</Text></View>
    </View>

<View style={{marginTop:100}}>

</View>
</SafeAreaView>
    
   
  )
}

export default TeacherList

const styles = StyleSheet.create({
  defaultImage:{
    aspectRatio: 4 / 5,
    height: 150,
    borderRadius: 10,
  }
})


