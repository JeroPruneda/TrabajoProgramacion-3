import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

class Register extends Component {

    constructor(){
        super()
        this.state={
            email:'',
            password:'',
        }
    }

    
    

    render() {
        return (
        <View></View>
        )
    }
}

const styles = StyleSheet.create({
    
})

export default Register