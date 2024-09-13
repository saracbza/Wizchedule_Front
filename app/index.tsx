import { Button, ButtonText } from '@/components/ui/button'
import { Input, InputField } from '@/components/ui/input'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from './config/constants'
import logoCromo from '../assets/logoCromoTransp.png'

interface IUserLogin{
    email: string
    senha: string
}

export default function Login() {
    const [user, setUser] = useState<IUserLogin>({email: '', senha: ''})
    const [errLogin, setErrLogin] = useState<string>("")

    const cadastrar = () => {
        router.replace('/cadastro')
    }

    const esqueci = () => {
        router.push('esquecisenha')
    }

    const login = async() => {
        try{
            const resp = await fetch(`${API_URL}/auth/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: user.email, senha: user.senha}),
        })
        
        if(resp.status == 200){
          const data = await resp.json()
          console.log(data)

          await AsyncStorage.setItem('token', data.token)
          await AsyncStorage.setItem('nomeUsuario', data.nome)
          await AsyncStorage.setItem('cursoUsuario', data.curso)
          await AsyncStorage.setItem('foto', data.foto.toString())
          await AsyncStorage.setItem('cursoUsuario', data.curso)
          await AsyncStorage.setItem('email', user.email)

          if (data.tipo == 'Aluno') router.replace('internA/pages/home')
          else router.replace('internM/pages/home')

        } else setErrLogin("Usuário não encontrado")

    } catch (e) {
        console.log(e)
        setErrLogin("Erro ao efetuar login")
    }
       console.log(user)
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewLogo}>
                <Image
                    source={logoCromo} 
                    style={styles.logo}
                />
            </View>

            <Input variant='outline' size='lg' style={styles.input}> 
                <InputField onChangeText={(txt) => setUser({...user, email: txt})} 
                placeholder='E-mail'/>
            </Input>

            <Input variant='outline' size='lg' style={styles.input}> 
                <InputField onChangeText={(txt) => setUser({...user, senha: txt})} 
                placeholder='Senha' type='password'/>
            </Input>
            <Text style={{marginBottom: 25, color: "red"}}> {errLogin} </Text>

            <Button style={[styles.button, {marginTop: 20, backgroundColor: '#cf1111'}]} onPress={login} 
            size="md" variant="solid" action="primary">
                <ButtonText style={{fontSize: 16}}>ENTRAR</ButtonText>
            </Button >

            <Button style={[styles.button, {marginTop: 20, backgroundColor: '#245161'}]} onPress={cadastrar}
            size="md" variant="solid" action="primary">
                <ButtonText style={{fontSize: 16}}>CADASTRAR-SE</ButtonText>
            </Button >

            <Button style={{marginTop: 35}} onPress={esqueci}
            size="md" variant="link" action="primary">
                <ButtonText style={{color: '#a2292e', fontSize: 17}}>Esqueci a senha</ButtonText>
            </Button >

            <StatusBar style="auto" />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a2224',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },
    viewLogo:{
        backgroundColor: '#fff',
        height: 150,
        width: 320,
        borderRadius: 20,
        marginBottom: 85,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width: 400,
        height: 400,
    },
    input: {
        height: 40,
        width: 330,
        borderColor: 'gray',
        fontWeight: 'bold',
        borderWidth: 1,
        marginBottom: 8,
        marginTop: 8,
        paddingHorizontal: 8,
        backgroundColor: '#fff'
      },
    button: {
        width: 155,
        height: 50,
        borderRadius: 15,
    }
})
