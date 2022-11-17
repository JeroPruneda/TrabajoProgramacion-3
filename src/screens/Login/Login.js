import { Text, View, TextInput, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config';
import { CurrentRenderContext } from '@react-navigation/native';
import back from '../../../assets/back2.webp'

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
      <View style = {styles.container} >
        
        <Image
               style={styles.imagen}
                source={require('../../../assets/esta.png')}
                resizeMode='contain'
            />
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
            secureTextEntry = {true}
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
            <Text style = {styles.registro}>Registrate</Text>
          </TouchableOpacity>
        </View>
       
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundImage:`url(${back})`
    },
    palabra:{
      flexDirection: 'row',
   
     textAlign: "center",
     margin: 10,
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
    },
    imagen:{
      marginTop: 20,
      height:80,
      width:100
  } 
  
  })