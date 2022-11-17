
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Posteos from '../screens/Posteos/Posteos'
import Nav from "./HomeNavigation"
import Profile from '../screens/Profile/Profile'
import Search from "../screens/Search/Search"
import {FontAwesome} from "@expo/vector-icons"

const Tab = createBottomTabNavigator()
import React from 'react'


export default function TabNavigation() {
  return (
    
      
      <Tab.Navigator>
        
        <Tab.Screen name='Home'component={Nav} options= {{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }}/>
        <Tab.Screen name='Subir Foto' component={Posteos} options = {{tabBarIcon: () => <FontAwesome name="camera" size={24} color="black" />}}/>
        <Tab.Screen name= "Buscador" component={Search} options = {{tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />}}/>
        <Tab.Screen name='Tu Perfil' component={Profile} options= {{tabBarIcon: () =>  <FontAwesome name="user" size={24} color="black" />}}/>
       

    </Tab.Navigator>

    
    
  )
}
