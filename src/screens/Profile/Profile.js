import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config';
import back from '../../../assets/back2.webp'
import { Ionicons } from '@expo/vector-icons'; 
import Editar from "../Editar/Editar";
import Posteo from '../../components/Posteo/Posteo'
import Posteos from '../Posteos/Posteos'

 class Profile extends Component {
    constructor(){
        super();
        this.state = {
            miPerfil:[],
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
         Cantidad de Publicaciones: {this.state.misPosteos.length}
        
         </Text>
           
         <TouchableOpacity onPress={() => this.props.navigation.navigate("Editar")}>
         <Ionicons name="settings" size={24} color="black" /><Text >EDITAR PERFIL</Text>
            </TouchableOpacity>
            <Text >Tus Publicaciones </Text> 

         </View>
         
        }
       />  
       <View 
        style={styles.container}
        >
            <FlatList
                data={this.state.misPosteos}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => 

                <View style={styles.container2}
                         >
                <Posteo navigation={this.props.navigation} id={item.id} data={item.data}/>
                </View>
              }
                
            />
 

        </View>
      
         {/* <FlatList
                data={this.state.miPerfil}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Editar navigation={this.props.navigation} id={item.id} data={item.data} />}    
            /> */}
        
          
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

   
},container1:{
  flex:2,
  backgroundColor:'red',
  height:4000,
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