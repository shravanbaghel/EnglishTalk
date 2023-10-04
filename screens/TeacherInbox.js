import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image} from 'react-native'
import React, { useEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const TeacherInbox = () => {


  const [students,setStudents] = useState([])

  const navigation = useNavigation();

  useEffect(() => {
    // Fetch teacher data from Firestore
    const fetchStudents = async () => {
      try {
        const studentData = [];
        const querySnapshot = await firestore().collection('users').where('userType', '==', 'student').get();
     
        
        querySnapshot.forEach((doc) => {
          const student = doc.data();
          studentData.push(student);
         
        });
        
        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchStudents();
  }, [])

  


  const StudentItem = ({student})=>(
   
   <View style={{backgroundColor:'white',marginTop:5}}>
      <TouchableOpacity onPress={()=>navigation.navigate("ChatScreen",{userData: student})} >
         <View style={{flexDirection:'row',alignItems:'center',marginLeft:15,marginBottom:15,backgroundColor:'white'}}>
      <Image source={require('../images/defaultProfilePic.png')} style={{width:50, height:50,borderRadius:25}} />
      <Text style={{marginLeft:10}}>{student.name}</Text>
      </View>
   </TouchableOpacity>
   </View>


    
  )


return (


  <View style={{backgroundColor:'white',height:"100%"}}>


<FlatList
  data={students}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <StudentItem student={item} />}
/>
 
  </View>

   
);

}

export default TeacherInbox

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
})

