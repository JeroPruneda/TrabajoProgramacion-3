import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import TabNavigation from "./TabNavigation";
import Comentarios from "../screens/Comentarios/Comentarios";
import Editar from "../screens/Editar/Editar";
import PerfilDeOtros from "../screens/PerfilDeOtros/PerfilDeOtros";
import Profile from "../screens/Profile/Profile";
const Stack = createNativeStackNavigator()

function MainNavigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen  name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Comentarios" component={Comentarios}/>
                <Stack.Screen name="Editar" component={Editar}/>
                <Stack.Screen name = "PerfilDeOtros" component={PerfilDeOtros}/>
                <Stack.Screen name = "Profile" component={Profile}/>
                <Stack.Screen name="TabNavigation" component={TabNavigation} options = {{headerShown: false}}/>
                
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default MainNavigation

