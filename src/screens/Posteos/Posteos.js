import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'


class Posteos extends Component {
  
    constructor(){
        super()
        this.state={
            descripcion:'',
            mostrarCamara: true,
            fotoUrl:''
        }
    }

    enviarPost(text){
        db.collection('Posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            descripcion: text,
            likes:[],
            comentarios:[],
            foto: this.state.fotoUrl
        })

    }

    cuandoSubaLaFoto(url){
        this.setState({
            fotoUrl: url,
            mostrarCamara:false
        })
    }
  
    render() {
        return (
        <View >
            {
                this.state.mostrarCamara ?
                <Camara
                cuandoSubaLaFoto={(url)=> this.cuandoSubaLaFoto(url)}
                /> :
                <>
                    <TextInput
                    placeholder='Descripcion'
                    onChangeText={text => this.setState({descripcion: text})}
                    value={this.state.descripcion}
                    keyboardType='default'
                    style={styles.input}
                    />
                    <TouchableOpacity onPress={()=> this.enviarPost(this.state.descripcion)}>
                        <Text>Mandar Posteo</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    
})
export default Posteos
