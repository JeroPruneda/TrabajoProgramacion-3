import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config';
import firebase from 'firebase'

export default class Search extends Component {
    constructor(){
        super();
        this.state = {
            valor: ""
        }
    }
  eSubmit(event){
    event.preventDefault()
  }

  buscar(){
    db.collection("Users").onSnapshot(
      docs => {
        let buscador = []
        docs.forEach(doc => {
            buscador.push({
                id: doc.id,
                data:doc.data()
            })
        })

        this.setState({
            valor: buscador
        })  
      }
    )
  }

  controlarCambios(event){
      this.setState({
          valor: event.target.value
      }, () => this.buscar(this.state.valor)
    )
  }
  render() {
    return (
      <View>

        <Text>Search</Text>
        <TextInput 
        placeholder='Buscar usuarios'
        style={styles.input}
        keyboardType = "default"
        onChangeText={(text) => this.controlarCambios(text)}
        value = {this.state.valor}
        />
        <TouchableOpacity onPress={(event) => this.eSubmit(event)}>
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