import { Text, View, FlatList, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Posteo from '../../components/Posteo/Posteo'
import back from '../../../assets/back.webp'
import Opinion from '../../screens/Comentarios/Comentarios'


class Home extends Component {
    constructor(){
        super()
        this.state={
            todosPosteos:[]
        }
    }

    componentDidMount(){
        db
        .collection('Posts')
        .orderBy("createdAt", "desc")
        .limit(5)
        .onSnapshot(
            docs => {
                let posteos = []
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data:doc.data()
                    })
                })

                this.setState({
                    todosPosteos: posteos
                })
            })
        }
  
    render() {
        return (
        <View 
        style={styles.container}
        >   
            
            <Image
               style={styles.imagen}
                source={require('../../../assets/esta.png')}
                resizeMode='contain'
            />
            
            <View  style={styles.container2}>
                <Text>ACA VEMOS A LOS POSTS</Text>
            <FlatList
                data={this.state.todosPosteos}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => 
                
                <Posteo navigation={this.props.navigation} id={item.id} data={item.data} />
                
                 }    
                   
                  />
             
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
     container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundImage:`url(${back})`
    },
    container2:{
        flex:2,
        width: 350, 
        height: 100, 
        margin:20,
        backgroundColor: 'skyblue',
        
        
    
    },
    imagen:{
        marginTop: 20,
        height:80,
        width:100
    } 
})

export default Home