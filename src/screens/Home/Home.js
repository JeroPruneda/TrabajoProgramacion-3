import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Posteo from '../../components/Posteo/Posteo'

class Home extends Component {
    constructor(){
        super()
        this.state={
            posteosTodos:[]
        }
    }

    componentDidMount(){
        db.collection('posteos').where('owner', '==', auth.currentUser.email).limit(5).onSnapshot(docs => {
            let posteos = []
            docs.forEach(doc => {
                posteos.push({
                    id: doc.id,
                    data:doc.data()
                })
            })

            this.setState({
                posteosTodos: posteos
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
                data={this.state.posteosTodos}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Posteo navigation={this.props.navigation} id={item.id} data={item.data} />}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default Home