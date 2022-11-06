import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'

class Posteo extends Component {

    constructor(props){
        super(props)
        this.state = {
            elLike: false,
            contador: props.data.likes.length 
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
        .collection('Posteos')
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
        db.collection('Posteos')
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

  render() {
    return (
      <View style={styles.container}>
        <View>
            <Text style={styles.subtitle}>Descripcion:{/*  {this.props.data.descripcion} */} </Text>
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
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Comentarios')}>
            <Text>Agregar comentario</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    camara: {
        height: 300
    }
    
})

export default Posteo