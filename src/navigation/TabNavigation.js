
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


import Comment from '../screens/Comment/Comment'
import Profile from '../screens/Profile/Profile'
import {FontAwesome} from "@expo/vector-icons"
const Tab = createBottomTabNavigator()
import React from 'react'


export default function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='ProductsAll' component={ProductsAll} options= {{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}}/>
        <Tab.Screen name='Profile' component={Profile} options= {{tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }} />
        <Tab.Screen name="Comment" component={Comment}/>

    </Tab.Navigator>
      
    
  )
}
