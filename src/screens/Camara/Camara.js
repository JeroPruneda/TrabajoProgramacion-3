import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../../firebase/config';

export default class Camara extends Component {
    constructor(props){
        super(props);
        this.metodosDeCamara = null
        this.state = {
            mostrarCamara: false,
            fotoUri: ""
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then( () => this.setState({
            mostrarCamara: true
        }))
        .catch(err => console.log(err))
    }

    sacarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then( imgMemoria => this.setState({
            fotoUri: imgMemoria.uri,
            mostrarCamara: false
        }))
        .catch(error => console.log(error))
    }

    aceptarFoto(url){
        fetch(url)
        .then( (imagen) => imagen.blob())
        .then( ok => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(ok)
            .then(() => {       
                ref.getDownloadURL()
                .then((url) => {
                    this.props.subirFoto(url)
                })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    rechazarFoto(){
        this.setState({
            fotoUri: "",
            mostrarCamara: true
        })
    }

    render(){
        return(
        
        <View style = {styles.container}>
            {
                this.state.mostrarCamara ?
            <>
            <Camera 
                    style={styles.camara}
                    type={Camera.Constants.Type.back}
                    ref={reference => this.metodosDeCamara = reference}
                />
            <TouchableOpacity onPress={() => this.sacarFoto()}>
                <Text>Sacar foto</Text>
            </TouchableOpacity>
            </>
            :
            this.state.mostrarCamara === false && this.state.fotoUri !== "" ?
            <>
            <Image 
            style = {styles.camara}
            source = {{uri: this.state.fotoUri}}
            />
            <TouchableOpacity onPress={()=> this.aceptarFoto(this.state.fotoUri)}>
                <Text>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.rechazarFoto()}>
                <Text>Rechazar</Text>
            </TouchableOpacity>
            </> :
            <Text>No tienes permiso para usar la Camara</Text>
            }
        </View> 
        )
    }
}
const styles = StyleSheet.create({
    camara: {
        height: 300
    },
    container: {
        flex: 1,
        height: 500
    }

})
    