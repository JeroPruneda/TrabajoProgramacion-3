
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image,  FlatList} from 'react-native'
import React, { Component} from 'react'
import {db} from '../../firebase/config'
import {auth} from '../../firebase/config'
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

   

   <View > 
<View > 


  <TextInput 
           onChangeText={ text => this.setState( {busqueda:text} )}
           placeholder='Ingresa tu busqueda'
           value={this.state.busqueda}>
  </TextInput>
  


  <TouchableOpacity onPress={()=> this.buscar(this.state.busqueda)}>
  <Text style={styles.buscar}> Buscar</Text>
  </TouchableOpacity>

</View>   
      <FlatList 
        data={this.state.usuarios}
        keyExtractor={(item) => item.id}
        renderItem= {({item}) => <Text><TouchableOpacity 
        onPress={() => this.props.navigation.navigate("PerfilDeOtros",
         {gmail: item.data.owner,}) }>
            {item.data.owner}</TouchableOpacity></Text>}
      />         
</View>

  </>
  )
}
}




const styles = StyleSheet.create({
   
  
  })

  export default Search