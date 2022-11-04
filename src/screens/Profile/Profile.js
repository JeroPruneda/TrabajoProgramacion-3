import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config';

 class Profile extends Component {
    constructor(){
        super();
        this.state = {
            miPerfil:[],
            cargando: true,
        }
    }
    
 componentDidMount(){ 
    db.collection("Users").onSnapshot(
        docs =>{
             let tusDatos = []
             docs.forEach(doc => {
                tusDatos.push({
                     id: doc.id,
                    data: doc.data()//forma para sacar la info de la base
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
      <View>
        <Text>Tu Perfil</Text>
         <FlatList
         data={this.state.miPerfil}
         keyExtractor={(item)=> item.id.toString()}
         renderItem={({item}) => <Text>{item.data.user}</Text>}
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
    
    registro: {
      backgroundColor: '#D13945',
      marginLeft: 30,
      marginTop: 500,
      marginBottom: 20,
      width: 120,
      fontWeight: '600',
      paddingLeft: 15,
      borderWidth: 1,
      borderRadius: 7,
    },
   

   
  
  })
  export default Profile