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
        <Text style={styles.usuario}>Tus Datos: </Text>
       
        {
         this.state.cargando ? <Text>Cargando</Text>
         :
         <>
         <Text>{this.state.miPerfil.data.owner}</Text>
         <Text>{this.state.miPerfil.data.user}</Text>
         <Text>{this.state.miPerfil.data.user}</Text>

         </>
        }
       
         <TouchableOpacity onPress={() => this.props.navigation.navigate("Editar", {id: this.state.miPerfil.id })}>
         <Ionicons name="settings" size={24} color="black" /><Text >EDITAR PERFIL</Text>
         </TouchableOpacity>

       <Text >Tus Publicaciones </Text> 
        <FlatList
          style= {styles.container}
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
  flex:1
  

   
},container2:{
  flex:2,
  width: 350, 
  height: 1000, 
  margin:20,
  
  
  

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