
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image,  FlatList} from 'react-native'
import React, { Component} from 'react'
import {db, auth} from '../../firebase/config'
import back from '../../../assets/back2.webp'
import { Feather, Entypo } from "@expo/vector-icons";

class Search extends Component {

  constructor(props){
      super(props)
      this.state={
          usuarios:[],
          busqueda: '',
      }
  }


  componentDidMount(){
      db.collection('Users').onSnapshot(docs => {
          let buscarUsuarios = []
          docs.forEach(doc => {
              buscarUsuarios.push({
                  id: doc.id,
                  data:doc.data(),
              })
          })
          this.setState({
              usuarios: buscarUsuarios
          })
      })
     
  }

  buscar(text){
      let filtrar = this.state.usuarios.filter(elm => 
          elm.data.owner.toUpperCase().includes(text.toUpperCase()))

      this.setState({
          usuarios: text,
          usuarios: filtrar, 
      })
  }

  render() {
      console.log(this.state.usuarios);
      return (
      <>
      <View  style = {styles.container}>
    <View  > 
        <TextInput style={styles.usuario}
            onChangeText={ text => this.setState( {busqueda:text} )}
            placeholder='Ingresa tu busqueda'
            value={this.state.busqueda}>
        </TextInput>
    
        <TouchableOpacity onPress={()=> this.buscar(this.state.busqueda)}>
            <Text style={styles.registro}> Buscar</Text>
        </TouchableOpacity>
    </View>   

    <View >   
    <Text style={styles.palabra} >Resultados: </Text>  
        <FlatList 
             style= {styles.container3}
            data={this.state.usuarios}
            keyExtractor={(item) => item.id}
            renderItem= {({item}) => <TouchableOpacity 
            onPress={() => this.props.navigation.navigate("PerfilDeOtros", {gmail: item.data.owner, foto: item.data.foto}) }>
            <Text>{item.data.owner}</Text></TouchableOpacity>}
        />   
    </View>
    </View>
  </>
  )
}
}




const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundImage:`url(${back})`,
     },
     usuario:{
        backgroundColor:'#E7E7E7',
        margin:10,
        width:300,
        borderWidth: 1,
        borderRadius: 6,
        padding:5
      } ,
      registro: {
        backgroundColor: '#F7F0E1',
        marginLeft:230,
        marginBottom: 20,
        width: 70,
        borderWidth: 1,
        borderRadius: 7,
      },
      palabra:{
        backgroundColor: "gray",
        textAlign:"center",
        width: 100,
        margin:10,
        marginLeft:40,
        borderRadius:5,
        borderWidth:2,
    }, 
    container3:{
        backgroundColor:'#E7E7E7',
        margin:10,
        width:300,
        borderWidth: 1,
        borderRadius: 6,
        padding:5
      } 
      
  
  })

  export default Search