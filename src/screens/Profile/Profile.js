import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config';
import back from '../../../assets/back2.webp'
import { Ionicons } from '@expo/vector-icons'; 
import Posteo from '../../components/Posteo/Posteo'



 class Profile extends Component {
    constructor(){
        super();
        this.state = {
            miPerfil:{},
            misPosteos: [],
            cargando: true,
        }
    }
    
 componentDidMount(){ 
  db.collection('Posts').where('owner', '==', auth.currentUser.email ).onSnapshot(docs => {
    let miPosteos = []
    docs.forEach(doc => {
        miPosteos.push({
            id: doc.id,
            data:doc.data(),
        })
    })
    this.setState({
        misPosteos: miPosteos,
    })
})
    db.collection("Users")
    .where("owner", "==", auth.currentUser.email)
    .onSnapshot(
        docs =>{
             let tusDatos = []
             docs.forEach(doc => {
                tusDatos = {
                     id: doc.id,
                    data: doc.data()
             }
            })
            this.setState({
                miPerfil: tusDatos,
                 cargando : false
            
           }),()=>console.log(this.state.miPerfil)
            console.log(this.state.miPerfil)
         }
        
    )
}

    cerrarSesion(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate("Login"))
        .catch(err => console.log(err))
        
    }
       
  render() {
    console.log(this.state.miPerfil);
    return (
      <View style={styles.container} >
     
        <Text style={styles.palabra} >Tus Datos: </Text>
       
        {
         this.state.cargando ? <Text>Cargando</Text>
         :
         <>
         <Text style={styles.usuario}>Tu mail: {this.state.miPerfil.data.owner}</Text>
         <Text style={styles.usuario}>Nombre de Usuario: {this.state.miPerfil.data.user}</Text>
         <Text style={styles.usuario}>Descripción: {this.state.miPerfil.data.perfil}</Text>

         </>
        }
       
         <TouchableOpacity onPress={() => this.props.navigation.navigate("Editar", {id: this.state.miPerfil.id })}>
         <Ionicons name="settings" size={24} color="black" /><Text >EDITAR PERFIL</Text>
         </TouchableOpacity>
       
       <Text style={styles.palabra} >Publicaciones </Text> 
        <FlatList
          style= {styles.container3}
          data={this.state.misPosteos}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item}) => <Posteo navigation={this.props.navigation} id={item.id} data={item.data}/>}
        /> 
        <TouchableOpacity onPress={() => this.cerrarSesion()}>
          <Text style = {styles.registro} >Cerrar Sesion</Text>
        </TouchableOpacity>
      
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundImage:`url(${back})`,
    alignItems:'center',
    justifyContent:'center',

   
},container3:{
  flex:2, 
  height: 1000, 
  },
    registro: {
      backgroundColor: '#D13945',
      marginLeft: 30,
     
      marginBottom: 20,
      width: 120,
      paddingLeft: 15,
      borderWidth: 1,
      borderRadius: 7,
    },
    usuario:{
      backgroundColor:'#E7E7E7',
      margin:10,
      width:300,
      borderWidth: 1,
      borderRadius: 6,
      padding:5
    }
    ,
    hijo:{
    
      backgroundColor:'#E7E7E7',
      margin:10,
      width:400,
      padding:10,
      borderWidth: 1,
      borderRadius:20
      
    },palabra:{
      backgroundColor: "gray",
      textAlign:"center",
      width: 100,
      margin:10,
      marginLeft:40,
      borderRadius:5,
      borderWidth:2,
  },
    

   
  
  })
  export default Profile