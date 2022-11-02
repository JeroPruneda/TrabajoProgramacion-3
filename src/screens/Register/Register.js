import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from "../../firebase/config"


export default class Register extends Component {
  constructor (){
    super ();
    this.state = {
      email: "",
      password: "",
      error: ""
    }
  }

  register(email, password){
    auth.createUserWithEmailAndPassword(email, password)
    .then(response => this.props.navigation.navigate("TabNavigation"))
    .catch(err => this.setState({error: err.message}))

  }

  render() {
    return (
      <View style = {styles.container}>
        <Text>Register</Text>
       
        <View>
          <TextInput 
            style = {styles.input}
            keyboardType = "email-address"
            placeholder='Email'
            onChangeText={(text) => this.setState({email: text})}
            value = {this.state.email}
          />
          <TextInput 
            style = {styles.input}
            keyboardType = "default"
            placeholder='Password'
            secureTextEntry = {true}
            onChangeText={(text) => this.setState({password: text})}
            value = {this.state.password}
          />
        </View>
        

        <View>
          <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password)} style = {styles.boton}>
            <Text style = {styles.botonColor}>Register</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text>Tenes cuenta?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
            <Text>Logueate</Text>
          </TouchableOpacity>
        </View>

        {
          this.state.error !== "" ? 
          <Text>{this.state.error}</Text> :
          ""
        }
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