import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            mail: "",
            pass: "",
            logueado: false
        }
    }

    componentDidMount(){
      auth.onAuthStateChanged(user => {
        if(user !== null){
          this.props.navigation.navigate("TabNavigation")
        }
      })
    }


    login(mail, pass){
        auth.signInWithEmailAndPassword(mail, pass)
        .then(resp => this.props.navigation.navigate("TabNavigation"))
        .catch(err => console.log(err))
    }
  render() {
    return (
      <View>
        <Text>Login</Text>
        
        <View>
            <TextInput 
            style = {styles.input}
            onChangeText={ (text) => this.setState({ mail: text})}
            placeholder = "Ingresar email"
            value= {this.state.mail}
            />
            <TextInput 
            style = {styles.input}
            onChangeText={ (text) => this.setState({ pass: text})}
            placeholder = "Ingresar contraseña"
            value= {this.state.pass}
            />
        </View>

        <View>
            <TouchableOpacity onPress={() => this.login(this.state.mail, this.state.pass)}>
                <Text style = {styles.botonColor}> Login</Text>
            </TouchableOpacity>
        </View>
        <View>
          <Text> No tenes cuenta?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
            <Text>Registraté!</Text>
          </TouchableOpacity>
        </View>
       
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      marginTop: 20,
    },
    input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: 'solid',
      marginVertical: 10
    },
    boton:{
      backgroundColor: "#28a745",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: "#28a745"
    },
    botonColor:{
      textDecorationColor: "#fff"
    }
  
  
  })