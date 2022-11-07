import { Text, View } from 'react-native'
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

 /*   borrarComentario(text){
    db.collection("Posts").doc(this.props.id).update({
      comentarios: firebase.firestore.FieldValue.arrayRemove({
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
  } */
    
  render() {
    return (
      <View>
        <TextInput 
        
        
        />
        <TouchableOpacity onPress={() => this.comentar(this.state.comentario)}>
          <Text>Comentar</Text>

        </TouchableOpacity>
      </View>
    )
  }
}