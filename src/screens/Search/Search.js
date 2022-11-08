import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class Search extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            user: ""
        }
    }
    buscar(){

    }
  render() {
    return (
      <View>

        <Text>Search</Text>
        <TextInput 
        placeholder='Buscar usuarios'
        style={styles.input}
        keyboardType = "default"

        
        />
        <TouchableOpacity onPress={() => this.buscar()}>
            <Text>Buscar</Text>
        </TouchableOpacity>

      </View>
    )
  }
}
const styles = StyleSheet.create({
    input: {
      fontSize: 18,
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20, 
      fontWeight: '600',
      paddingLeft: 20,
      borderWidth: 1,
      borderRadius: 7,
      paddingRight: 12,
    },
  
  })