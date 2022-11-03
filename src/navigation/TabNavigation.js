
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home/Home'
import {FontAwesome} from "@expo/vector-icons"
const Tab = createBottomTabNavigator()
import React from 'react'


export default function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options= {{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}}/>
       

    </Tab.Navigator>
      
    
  )
}
