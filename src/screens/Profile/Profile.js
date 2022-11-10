import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config';
import back from '../../../assets/back2.webp'
import { Ionicons } from '@expo/vector-icons'; 

 class Profile extends Component {
    constructor(){
        super();
        this.state = {
            miPerfil:[],
            cargando: true,
        }
    }
    
 componentDidMount(){ 
    db.collection("Users")
    .where("owner", "==", auth.currentUser.email)
    .onSnapshot(
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

    cerrarSesion(){
        auth.signOut()
        .then(resp => this.props.navigation.navigate("Login"))
        .catch(err => console.log(err))
        
    }
       
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.usuario}>Tus Datos: </Text>
         <FlatList
         data={this.state.miPerfil}
         keyExtractor={(item)=> item.id.toString()}
         renderItem={
          ({item}) => 
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
         Cantidad de Publicaciones: //hay que ver como se hace estoajustess
         </Text>
         <TouchableOpacity onPress={() => this.props.navigation.navigate("Editar")}>
         <Ionicons name="settings" size={24} color="black" /><Text >EDITAR PERFIL</Text>
            </TouchableOpacity>
         </View>
         
         
        }
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
  
    backgroundImage:`url(${back})`,
    
    alignItems:'center',
    justifyContent:'center',

   
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
      
    }
    

   
  
  })
  export default Profile