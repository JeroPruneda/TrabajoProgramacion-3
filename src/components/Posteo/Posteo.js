import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';


class Posteo extends Component {

    constructor(props){
        console.log(props.id);
        super(props)
        this.state = {
            elLike: false,
            contador: props.data.likes.length,
            miPosteo: false
        }
    }

    componentDidMount(){
        console.log(this.props);
         let myLike = this.props.data.likes.includes(auth.currentUser.email)

        if(myLike){
            this.setState({
                elLike:true
            }) 
         } 
         if(this.props.data.owner === auth.currentUser.email){
            this.setState({
                miPosteo: true,
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
    eliminarPosteo(){
        db.collection('Posts')
        .doc(this.props.id)
        .delete()
        .then(()=> {this.props.navigation.navigate('Profile')})
        .catch(err=> console.log(err))
    }

  render() {
    return (
      <View style={styles.container}>
        <View>
            
            <Image 
            style = {styles.camara}
            source = {{uri: this.props.data.foto}}
            />

            <Text style={styles.subtitle}>Descripción: {this.props.data.descripcion}</Text>
             
             <TouchableOpacity onPress={() => this.props.navigation.navigate("Comentarios", {id: this.props.id}) }>
            <Text>Agregar comentario</Text>
        </TouchableOpacity>
        
        </View>
        
        <View>
        <Text  style={styles.subtitle1}> {this.state.contador} <AntDesign name="heart" size={20} color="red" />  </Text>
        {
            this.state.elLike ?
                <TouchableOpacity style={styles.botton2} onPress={()=> this.unlike()}>
                   <AntDesign name="dislike1" size={24} color="black" />
                </TouchableOpacity>
            :
                <TouchableOpacity style={styles.botton}  onPress={()=> this.like()}>
                    <AntDesign name="like1" size={24} color="black" />
                </TouchableOpacity>
        }
        <View>
            {
                this.state.miPosteo ?
                <TouchableOpacity onPress={()=> this.eliminarPosteo()}>
                <Text >BORRAR <AntDesign name="delete" size={20} color="black" /></Text>
                </TouchableOpacity> : ''
            }
            </View>
       
        </View>
    
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#838F8F',
        margin:10,
        padding:10,
        borderRadius:20,
        borderWidth:1

       
    },
    camara: {
        height: 300
    },
    subtitle:{
        backgroundColor:'#E7E7E7',
        margin:10,
        width:250,
        padding:10,
        borderWidth: 1,
        borderRadius:20
      },
     
      botton:{
        margin:10,
        backgroundColor:'#34909C',
        width:40,
        padding:10,
        borderWidth: 1,
        borderRadius:20,
       
      },
      botton2:{
        margin:10,
        backgroundColor:'#DE2118',
        width:40,
        padding:10,
        borderWidth: 1,
        borderRadius:20,
       
      }
    
    
})

export default Posteo