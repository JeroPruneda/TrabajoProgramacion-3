import { Text, View,StyleSheet,TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import back from '../../../assets/back2.webp'
import { auth, db } from "../../firebase/config"
import Profile from '../Profile/Profile'
class Editar extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
           mail: "",
           contraseña:""
        }
    }
    //esto es muy parecido a lo de likes pero nose como pasarle las props 
    actualizar(){
      db.collection("Users")
      .doc("aca habria que llamar al id del documento (email) que ni idea ")
      .update({
        propiedad: mail
      })
      .then(()=>{
        {this.props.navigation.navigate("Profile")}
      })
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
         <View>
            <TouchableOpacity  onPress={() => this.actualizar()}>
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