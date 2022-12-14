import { Text, View, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config';
import firebase from 'firebase'
import { TextInput, TouchableOpacity } from 'react-native-web';
import back from '../../../assets/back2.webp'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default class Comentarios extends Component {
    constructor(props){
        super(props);
        this.state = {
            comentarios: [],
            opinion:""
            
        }
    }
  
    componentDidMount(){
      console.log(this.props)
      db.collection("Posts")
      .doc(this.props.route.params.id)
      .onSnapshot(
        docs => {

          this.setState({
            id:docs.id,
            comentarios: docs.data().comentarios,
           
          },()=> console.log(this.state.comentario))
        }
      )
    }
    comentar(text){
      db.collection("Posts")
      .doc(this.props.route.params.id)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          owner: auth.currentUser.email,
          cretedAt: Date.now(),
          comentario: text
        })
      })
      .then(resp => {
        this.setState({
            comentario: ""
        },()=> console.log(this.state.opinion))
    })
    .catch(err=> console.log(err))
  }
    
  render() {
    return (
     
      <View style={styles.container}>
         <TextInput 
            style = {styles.input}
            keyboardType = "default"
            placeholder = "Comentar"
            onChangeText={ (text) => this.setState({opinion: text})}
           
            />
        <TouchableOpacity style={styles.registro} onPress={() => this.comentar(this.state.opinion)}>
        <MaterialCommunityIcons name="send-circle" size={24} color="blue" />
        </TouchableOpacity>
         <FlatList 
          data={this.state.comentarios}
          keyExtractor={(item) => item.createdAt}
          renderItem={({item}) => <Text  style={styles.subtitle}>{item.owner}: {item.comentario}</Text>}
        />
      
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
  usuario:{
    backgroundColor:'#E7E7E7',
    margin:10,
    width:300,
    borderWidth: 1,
    borderRadius: 2,
  },
  subtitle:{
    backgroundColor:'#E7E7E7',
    margin:10,
    width:250,
    padding:10,
    borderWidth: 1,
    borderRadius:20
  }, container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundImage:`url(${back})`
},  palabra:{
  backgroundColor: "gray",
  textAlign:"center",
  margin:0,
  width: 200,

},registro: {
  backgroundColor: '#2C719C',
  margin:10,
  marginLeft:164,
  width: 35,
  paddingLeft: 5,
  borderWidth: 1,
  borderRadius: 7,
},

})