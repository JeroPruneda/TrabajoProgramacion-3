import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/Home'
import OtrosPerfiles from '../screens/PerfilDeOtros/PerfilDeOtros'
const Stack = createNativeStackNavigator()

class HomeNavigation extends Component {
  render() {
    return (
      <Stack.Navigator>
      <Stack.Screen
      
      name= "HOME"
      component={Home}
      options={{
        headerShown:false
    }}/>
      <Stack.Screen
      
      name= "OtrosPerfiles"
      component={OtrosPerfiles}
      options={{
        headerShown:false
    }}/>
        
      </Stack.Navigator>
    )
  }
}
export default HomeNavigation