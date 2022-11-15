
import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Image} from 'react-native'
import {db, auth} from '../../firebase/config'
import back from '../../../assets/back2.webp'
import Posteo from '../../components/Posteo/Posteo'

 
class PerfilDeOtros extends Component {
    constructor(props){
        super(props)
        console.log(props);
        this.state={
            usuarios:{},
            susPosteos: [],
            userId: props.route.params.id,
        }
    }
 
    componentDidMount(){
        db.collection('Users').where('owner', '==', this.props.route.params.email)
        .onSnapshot(docs =>{ 
           docs.forEach(doc => {

            
            this.setState({usuarios: doc.data()})
           })
        })
       
        db.collection('Posts').where('owner', '==', this.props.route.params.email).onSnapshot(docs => {
            let posteos = []
            docs.forEach(doc => {
                posteos.push({
                    id: doc.id,
                    data:doc.data(),
                })
            })
            this.setState({
                susPosteos: posteos,
            })
        })
    }
 
    render() {
        
        return (
          
          <View style={styles.container} >
        <Text style={styles.usuario}>Datos del Perfil: </Text>
         <FlatList
         data={this.state.usuarios}
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
         Tu Email: {item.data.owner}
         </Text>
         <Text style={styles.usuario}>
         Cantidad de Publicaciones: {this.state.susPosteos.length}
         </Text>
           

        

         </View>
         
        }
       />  
       <View style={styles.container}>
       <Text >Sus Publicaciones </Text> 
          <FlatList
            data={this.state.susPosteos}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({item}) => <Posteo navigation={this.props.navigation} id={item.id} data={item.data}/>}
            />

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
 
export default    PerfilDeOtros
