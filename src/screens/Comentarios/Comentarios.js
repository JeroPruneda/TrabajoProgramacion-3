import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { db } from '../../firebase/config';
import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-web';


export default class Comentarios extends Component {
    constructor(props){
        super(props);
        this.state = {
            comentario: "",
        }
    }

    comentar(){
      db.collection("Posts").doc(this.props.id).update({
        comentarios: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(resp => {
        this.setState({
            comentario: this.state.comentario
        })
    })
    .catch(err=> console.log(err))
  }

  borrarComentario(){
    db.collection("Posts").doc(this.props.id).update({
      comentarios: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
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
        <TouchableOpacity onPress={() => this.comentar(this.state.comentario)}>
          <Text>Comentar</Text>

        </TouchableOpacity>
      </View>
    )
  }
}