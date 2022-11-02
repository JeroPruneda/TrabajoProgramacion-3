import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config';
import { CurrentRenderContext } from '@react-navigation/native';

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
        <Text style = {styles.palabra}>JJJ LINK</Text>
        
        <View style = {styles.container}>
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
          <Text > No tenes cuenta?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
            <Text style = {styles.registro}>Registraté!</Text>
          </TouchableOpacity>
        </View>
       
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      marginTop: 0,
    },
    palabra:{
      flexDirection: 'row',
     backgroundColor: '#D6E6D9',
     textAlign: "center",
     margin: 20,
     fontFamily:"times new roman",
     fontSize:40,
     
  
     
    },
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
    registro: {
      backgroundColor: '#D13945',
      marginLeft: 30,
      marginTop: 20,
      marginBottom: 20,
       width: 90,
      fontWeight: '600',
      paddingLeft: 15,
      borderWidth: 1,
      borderRadius: 7,
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
      backgroundColor: '#20AB37',
      marginLeft: 30,
      marginTop: 20,
      marginBottom: 20,
       width: 80,
      fontWeight: '600',
      paddingLeft: 15,
      borderWidth: 1,
      borderRadius: 7,
    }
  
  
  })