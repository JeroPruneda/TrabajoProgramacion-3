import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config';
import back from '../../../assets/back.webp'

 class Profile extends Component {
    constructor(){
        super();
        this.state = {
            miPerfil:[],
            cargando: true,
        }
    }
    
 componentDidMount(){ 
<<<<<<< HEAD
    db.collection("Users").onSnapshot(
=======
    db.collection("Users")
    .where("owner", "==", auth.currentUser.email)
    .onSnapshot(
>>>>>>> 4af76b40c1aff7b6c540514b6ab1d9693d339006
        docs =>{
             let tusDatos = []
             docs.forEach(doc => {
                tusDatos.push({
                     id: doc.id,
                    data: doc.data()
               })
            })
            this.setState({
                miPerfil: tusDatos,
                 cargando : false
            
           }),()=>console.log(this.state.miPerfil)
            console.log(this.state.miPerfil)
         }
        
    )
}
<<<<<<< HEAD
    cerrarSesion(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate("Login"))
        .catch(err => console.log(err))
        
    }
=======


  cerrarSesion(){
    auth.signOut()
    .then(resp => this.props.navigation.navigate("Login"))
    .catch(err => console.log(err))
  }
>>>>>>> 4af76b40c1aff7b6c540514b6ab1d9693d339006
       
  render() {
    return (
      <View style={styles.container} >
        <Text >Tu Datos: </Text>
         <FlatList
         data={this.state.miPerfil}
         keyExtractor={(item)=> item.id.toString()}
         renderItem={
          ({item}) => 
<<<<<<< HEAD
        <View style={styles.hijo}>
          <Text style={styles.usuario}>
          Nombre de Usuario: {item.data.user}
         </Text >
         <Text style={styles.usuario}>
          Descripcion de tu Perfil: {item.data.perfil}
         </Text>
         <Text style={styles.usuario}>
         Tu Gmail: {item.data.owner}
         </Text>
         <Text style={styles.usuario}>
         Cantidad de Publicaciones: //hay que ver como se hace esto
         </Text>
         <Text style={styles.usuario}>
         Cantidad de Likes://hay que ver como se hace esto /////////
         LE PONGO ESTE backgroundColor PARA SABER A QUE LE ESTAMOS PONIENDO ESTILOS
=======
        <View style={styles.container}>
          <Text>
          Nombre de usuario: {item.data.user}
         </Text>
         <Text>
          Descripcion de tu perfil: {item.data.perfil}
         </Text>
         <Text>
         Tu mail: {item.data.owner}
         </Text>
         <Text>
         Cantidad de Publicaciones: 
>>>>>>> 4af76b40c1aff7b6c540514b6ab1d9693d339006
         </Text>
         </View>
        }
       />  
        <View>
          
            <TouchableOpacity onPress={() => this.cerrarSesion()}>
                <Text style = {styles.registro} >Cerrar Sesion</Text>
            </TouchableOpacity>
        </View>
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
   
},
    registro: {
      backgroundColor: '#D13945',
      marginLeft: 30,
      marginTop: 300,
      marginBottom: 20,
      width: 120,
      fontWeight: '600',
      paddingLeft: 15,
      borderWidth: 1,
      borderRadius: 7,
    },
    usuario:{
      backgroundColor:'#E7E7E7',
      margin:10,
      width:300,
      borderWidth: 1,
      borderRadius: 2,
    }
    ,
    hijo:{
      backgroundColor:'#E7E7E7',
      
    }
    

   
  
  })
  export default Profile