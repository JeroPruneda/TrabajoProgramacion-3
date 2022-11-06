import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Camara from '../Camara/Camara'


class Posteos extends Component {
  
    constructor(){
        super()
        this.state={
            descripcion:'',
            mostrarCamara: true,
            fotoUrl:''
        }
    }

    subirPost(){
        db.collection('Posteos').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            descripcion: this.state.descripcion,
            likes:[],
            comentarios:[],
            foto: this.state.fotoUrl
        })
        .then(() => this.setState({descripcion: ""}))
        .catch((error) => console.log(error)) 

    }

    subirFoto(url){
        this.setState({
            fotoUrl: url,
            mostrarCamara:false
        })
    }
  
    render() {
        return (
        <View style = {styles.container}>
            {
                  this.state.mostrarCamara ?
                <Camara
                subirFoto={(url)=> this.subirFoto(url)}
                /> :  
                <>
                <TextInput
                    placeholder='Descripcion'
                    onChangeText={text => this.setState({descripcion: text})}
                    value={this.state.descripcion}
                    keyboardType='default'
                    style={styles.input}
                    />
                    <TouchableOpacity onPress={()=> this.subirPost(this.state.descripcion)}>
                        <Text>Mandar Posteo</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        borderColor:'blue',
        borderWidth:1,
        marginHorizontal:16,
        height:42
        },
        container: {
            height: 500
        }
    
})
export default Posteos
