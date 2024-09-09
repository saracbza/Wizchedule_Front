import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from "../config/constants"

export const pegarDadosTopo = async() => {
    try {
        const resp = await fetch(`${API_URL}/auth/index`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    
        if(resp.status == 200){

            const data = await resp.json()
            console.log(data)

            await AsyncStorage.setItem('nomeUsuario', data.nome)
            await AsyncStorage.setItem('cursoUsuario', data.curso)
         }

    } catch (e) {
    console.log(e)
    }
}