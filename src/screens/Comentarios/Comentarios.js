import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config';
import firebase from 'firebase'
import { TextInput, TouchableOpacity } from 'react-native-web';


export default class Comentarios extends Component {
    constructor(props){
        super(props);
        this.state = {
            comentario: "",
        }
    }

    comentar(text){
      db.collection("Posts").doc(this.props.id).update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          owner: auth.currentUser.email,
          cretedAt: Date.now(),
          comentario: text
        })
      })
      .then(resp => {
        this.setState({
            comentario: ""
        })
    })
    .catch(err=> console.log(err))
  }
    
  render() {
    return (
      <View>
         <TextInput 
            style = {styles.input}
            keyboardType = "default"
            placeholder = "Comentar"
            onChangeText={ (text) => this.setState({comentario: text})}
            value= {this.state.comentario}
            />
        <TouchableOpacity onPress={() => this.comentar(this.state.comentario)}>
          <Text>Comentar</Text>
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