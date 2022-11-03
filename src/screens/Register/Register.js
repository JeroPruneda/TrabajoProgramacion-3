import { Text, View, TextInput, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React, { Component } from 'react'
import { auth } from "../../firebase/config"


export default class Register extends Component {
  constructor (){
    super ();
    this.state = {
      email: "",
      password: "",
      user: "",
      fotoUrl: "",
      error: ""
    }
  }

  comentar(){
    db.collection("Users").add({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        user: this.state.user,
        foto: this.state.fotoUrl
    })
    .then(() => this.setState({user: ""}))
    .catch((error) => console.log(error))
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
            onChangeText={ (text) => this.setState({ nombre: text})}
            placeholder = "Ingresar nombre de usuario"
            value= {this.state.mail}
            />
            
              <TextInput 
            style = {styles.input}
            onChangeText={ (text) => this.setState({ perfil: text})}
            placeholder = "Descripcion de tu perfil"
            value= {this.state.mail}
            />
          <TextInput 
            style = {styles.input}
            keyboardType = "default"
            placeholder='Password'
            secureTextEntry = {true}
            onChangeText={(text) => this.setState({password: text})}
            value = {this.state.password}
          />
          <TextInput 
            style = {styles.input}
            keyboardType = "default"
            placeholder='Username'
            onChangeText={(text) => this.setState({user: text})}
            value = {this.state.user}
          />
        </View>
        

        <View>
          <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password)} style = {styles.boton}>
            <Text >Register</Text>
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