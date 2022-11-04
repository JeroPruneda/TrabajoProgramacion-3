import { Text, View, FlatList, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Posteo from '../../components/Posteo/Posteo'


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
        .where('owner', '==', auth.currentUser.email)
        .orderBy("createdAt", "desc")
        .limit(5)
        .onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data:doc.data()
                    })
                })

                this.setState({
                    todosPosteos: posts
                })
            })
        }
  
    render() {
        return (
        <View 
        style={styles.container}
        >
            <Text>Home</Text>
            <FlatList
                data={this.state.todosPosteos}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Posteo navigation={this.props.navigation} id={item.id} data={item.data} />}
            />
            <Image
               style={styles.imagen}
                source={
                    {uri:'https://t1.uc.ltmcdn.com/es/posts/7/1/6/cuantos_paises_hay_en_el_mundo_29617_600.jpg'}
                }
                resizeMode='contain'
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    container2:{
        flex:3
    },
    imagen:{
        height:200,
        width:100
    }
})

export default Home