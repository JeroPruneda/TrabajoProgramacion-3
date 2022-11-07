
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home/Home'
import Posteos from '../screens/Posteos/Posteos'
import Profile from '../screens/Profile/Profile'
import {FontAwesome} from "@expo/vector-icons"
const Tab = createBottomTabNavigator()
import React from 'react'


export default function TabNavigation() {
  return (
    
      
      <Tab.Navigator>
        
        <Tab.Screen name='BIENVENIDO!'component={Home} options= {{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }}/>
        <Tab.Screen name='TUS PUBLICACIONES' component={Posteos} options = {{tabBarIcon: () => <FontAwesome name="photo" size={24} color="black" />}}/>
        <Tab.Screen name='TU PERFIL' component={Profile} options= {{tabBarIcon: () =>  <FontAwesome name="user" size={24} color="black" />}}/>
       

    </Tab.Navigator>

    
    
  )
}
