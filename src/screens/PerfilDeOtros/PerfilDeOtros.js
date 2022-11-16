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
          
          <View>
            <Text>Perfiles {this.state.info.owner}</Text>
            <Text>Descripción: {this.state.info.perfil}</Text>
            <Text>Username: {this.state.info.user}</Text>
            <Text>Fotosss:</Text>
            <Image 
            style = {styles.camara}
            source = {{uri: this.props.route.params.foto}}
            />
            {/* CON LA FLATLIST ESTOY INTENTANDO QUE SE MUESTREN TODAS PERO NO PUEDO, ya probe con un par*/}
            <FlatList 
          data = {this.state.fotos}
          keyExtractor = {(item) => item.id.toString()}
          renderItem = {(item) =><Image 
            style = {styles.camara}
            source = {{uri: item.fotos}}
            />} 
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
  
  
})
      

 
export default    PerfilDeOtros
