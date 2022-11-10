import { Text, View,StyleSheet,TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import back from '../../../assets/back2.webp'

class Editar extends Component {
    constructor(){
        super();
        this.state = {
           mail:"",
           contraseña:""
        }
    }
    
 
       
  render() {
    return (
      <View style={styles.container} >
        
         
        
        
        <TextInput 
        style = {styles.input}
        onChangeText={ (text) => this.setState({ mail: text})}
        placeholder = "Cambiar email"
        value= {this.state.mail}
        />
       
        
        <TextInput 
        style = {styles.input}
        onChangeText={ (text) => this.setState({ pass: text})}
        placeholder = "Cambiar contraseña"
        value= {this.state.pass}
        />
        <TextInput 
        style = {styles.input}
        onChangeText={ (text) => this.setState({ pass: text})}
        placeholder = "Cambiar username"
        value= {this.state.pass}
        />
        <TextInput 
        style = {styles.input}
        onChangeText={ (text) => this.setState({ pass: text})}
        placeholder = "Cambiar Descripcion"
        value= {this.state.pass}
        />
         <View>
            <TouchableOpacity >
                <Text style = {styles.botonColor}> Cambiar</Text>
            </TouchableOpacity>
        </View>
    </View>

        
        
          
            
        
      
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
          alignItems:'center',
          justifyContent:'center',
          backgroundImage:`url(${back})`
      },
      palabra:{
        flexDirection: 'row',
     
       textAlign: "center",
       margin: 10,
       fontFamily:"times new roman",
       fontSize:40,
       
    
       
      },
      input: {
       
        fontSize: 18,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20, 
        fontWeight: '600',
        paddingLeft: 20,
        borderWidth: 1,
        borderRadius: 7,
        paddingRight: 12,
      },
      registro: {
        backgroundColor: '#D13945',
        marginLeft: 30,
        marginTop: 20,
        marginBottom: 20,
         width: 90,
        fontWeight: '600',
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 7,
      },
  
      boton:{
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: "#28a745"
      },
      botonColor:{
        backgroundColor: '#20AB37',
        marginLeft: 30,
        marginTop: 20,
        marginBottom: 20,
         width: 80,
        fontWeight: '600',
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 7,
      },
      imagen:{
        marginTop: 20,
        height:80,
        width:100
    } 
    

   
  
  })

export default Editar