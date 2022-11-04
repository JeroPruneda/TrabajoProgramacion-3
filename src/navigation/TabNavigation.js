
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Home from '../screens/Home/Home'
import Profile from '../screens/Profile/Profile'
import {FontAwesome} from "@expo/vector-icons"
const Tab = createBottomTabNavigator()
import React from 'react'


export default function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options= {{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}}/>
        <Tab.Screen name='Profile' component={Profile} options= {{tabBarIcon: () => <FontAwesome name="perfil" size={24} color="black" />}}/>
       

    </Tab.Navigator>
      
    
  )
}
