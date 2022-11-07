import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'
import { TextInput } from 'react-native-web'

class Posteo extends Component {

    constructor(props){
        super(props)
        this.state = {
            elLike: false,
            contador: props.data.likes.length,
            comentario: ""
            
        }
    }

    componentDidMount(){
        let myLike = this.props.data.likes.includes(auth.currentUser.email)
        if(myLike){
            this.setState({
                elLike:true
            })
        }
    }

    like(){
        db
        .collection('Posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(resp => {
            this.setState({
                elLike:true,
                contador: this.state.contador + 1
            })
        })
        .catch(err=> console.log(err))
    }

    unlike(){
        db.collection('Posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(resp => {
            this.setState({
                elLike:false,
                contador: this.state.contador - 1
            })
        })
        .catch(err => console.log(err))
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
      <View style={styles.container}>
        <View>
            <Text style={styles.subtitle}>Descripcion:  {this.props.data.descripcion}  </Text>
            <Image 
            style = {styles.camara}
            source = {{uri: this.props.data.foto}}
            />

        </View>
        
        <View>
            <Text>{this.state.contador}</Text>
        {
            this.state.elLike ?
                <TouchableOpacity onPress={()=> this.unlike()}>
                    <Text> Unlike </Text>
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={()=> this.like()}>
                    <Text>Like</Text>
                </TouchableOpacity>
        }

        
         <TouchableOpacity onPress={()=> this.comentar(this.state.comentario)}>
            <Text>Agregar comentario</Text>
        </TouchableOpacity>
        <TextInput 
            style = {styles.input}
            keyboardType = "default"
            placeholder = "Comentario"
            onChangeText={ (text) => this.setState({comentario: text})}
            value= {this.state.comentario}
            />
        <Text> Comentarios: {}</Text>
        </View>
        

      </View>
    )
  }
}

const styles = StyleSheet.create({
    camara: {
        height: 300
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
    
})

export default Posteo