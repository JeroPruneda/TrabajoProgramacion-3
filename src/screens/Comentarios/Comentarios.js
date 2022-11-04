import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class Comentarios extends Component {
    constructor(){
        super();
        this.state = {
            comentario: "",
        }
    }

    


  render() {
    return (
      <View>
        <Text>Comentarios</Text>
      </View>
    )
  }
}