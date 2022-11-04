
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home/Home'
import {FontAwesome} from '@expo/vector-icons'
import Posteos from '../screens/Posteos/Posteos'

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator
    >
        
        <Tab.Screen name='Home' component={Home} options= {{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}}/>
        <Tab.Screen name='Posteos' component={Posteos} />
    </Tab.Navigator>
  )
}
