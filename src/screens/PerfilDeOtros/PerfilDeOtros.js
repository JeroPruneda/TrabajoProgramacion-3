import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Image} from 'react-native'
import {db, auth} from '../../firebase/config'
class PerfilDeOtros extends Component {
  constructor(props){
    super(props)
    this.state={
      info: {},
      fotos: [],
      
    }
  }
  componentDidMount(){
    db.collection('Users')
    .where('owner', '==', this.props.route.params.gmail)
    .onSnapshot(doc => {
      doc.forEach(doc => this.setState({
        id: doc.id,
        info: doc.data()
      })) 
    })
    db.collection('Posts')
    .where('owner', '==', this.props.route.params.gmail)
        .onSnapshot(
            docs => {
                let posteos = []
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        fotos: doc.data()
                    })
                })

                this.setState({
                    fotos: posteos
                })  
            })
}
 
    render() {
     console.log(this.state.fotos);
        return (
          
          <View style={styles.hijo}>
            <Text style={styles.usuario}>Mail: {this.state.info.owner}</Text>
            <Text style={styles.usuario}>Descripción: {this.state.info.perfil}</Text>
            <Text style={styles.usuario}>Username: {this.state.info.user}</Text>
            <Text>Fotos:</Text>
            <Image 
            style = {styles.camara}
            source = {{uri: this.props.route.params.foto}}
          />
          
          <FlatList 
          data = {this.state.fotos}
          keyExtractor = {(item) => item.id.toString()}
          renderItem = {(item) =><Image style = {styles.camara} source = {{uri: item.fotos}}/>} 
          />
         </View>
         
        )
    }
}
 
const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'#838F8F',
      margin:10,
      padding:10,
      borderRadius:20,
      borderWidth:1

     
  },
  camara: {
      height: 300
  },
  subtitle:{
      backgroundColor:'#E7E7E7',
      margin:10,
      width:250,
      padding:10,
      borderWidth: 1,
      borderRadius:20
    },
   
    botton:{
      margin:10,
      backgroundColor:'#34909C',
      width:40,
      padding:10,
      borderWidth: 1,
      borderRadius:20,
     
    },
    botton2:{
      margin:10,
      backgroundColor:'#DE2118',
      width:40,
      padding:10,
      borderWidth: 1,
      borderRadius:20,
     
    },
    nombre:{
      backgroundColor:'#E7E7E7',
      margin:10,
      width:150,
      padding:10,
      borderRadius:20,
     
    },
    hijo:{
    
      backgroundColor:'#E7E7E7',
      margin:10,
      width:400,
      padding:10,
      borderWidth: 1,
      borderRadius:20
      
    },
    usuario:{
      backgroundColor:'#E7E7E7',
      margin:10,
      width:300,
      borderWidth: 1,
      borderRadius: 6,
      padding:5
    }
  
  
})
      

 
export default    PerfilDeOtros
