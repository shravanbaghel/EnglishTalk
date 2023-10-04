import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: 1,
    title: "Order History",
    image: require('../images/orderHistory.png'),
    screen: 'TeacherDashboard'
  },
  {
    id: 2,
    title: "Payment Method",
    image: require('../images/debitCard.png'),
    screen: "TeacherDashboard"
  },
  {
    id: 3,
    title: "Statistics",
    image: require('../images/statistics.png'),
    screen: "TeacherDashboard"
  },
  {
    id: 4,
    title: "Support",
    image: require('../images/support.png'),
    screen: "TeacherDashboard"
  },
]


const TeacherDashboard = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.dashboardText}>
        <Text style={{ fontFamily: 'Poppins-Bold', color: 'black', fontSize: 25 }}>Dashboard</Text>
      </View>

      <View style={styles.incomeIndicator}>
        <Text style={{ color: '#fff', fontWeight: 600, }}>January</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: '#fff', padding: 10, fontFamily: 'Poppins-Bold', fontSize: 40 }}>Rs. 4760</Text>
          <Icon name="linechart" size={40} color="#fff" />
        </View>
        <Text style={{ color: '#fff', fontWeight: 600 }}>Total Income: Rs 12,840</Text>
      </View>

      <View style={styles.menu}>
        <FlatList
        numColumns={2}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate(item.screen)}   >
              <View style={{alignItems:'center',}}>
                <Image
                  style={{ height: 130, width: 100, resizeMode: 'contain', }}
                  source={item.image} />
                <Text style={{ fontFamily: 'Poppins-Regular', color: 'black', textAlign: 'center' }} >{item.title}</Text>
              </View>

            </TouchableOpacity>
          )}

        />

      </View>



    </View>
  )

}



const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  dashboardText: {
    margin: 20,
  },
  incomeIndicator: {
    borderColor: 'black',
    height: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#667FF3",
    padding: 15
  },
  menu: {
    borderColor: 'black',
    margin: 20,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    shadowOffset: { width: -5, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  buttons: {
    flex: 1,
    backgroundColor: 'white',
    width:150,
    margin:10,
    shadowColor: 'black',
    borderRadius:20,
    shadowOffset: { width: -5, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,

  }
})

export default TeacherDashboard