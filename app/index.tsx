//index -- parte da mensagem esta errado
import { Button, ButtonText } from '@/components/ui/button'
import { Input, InputField } from '@/components/ui/input'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from './config/constants'

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
        router.replace('/esquecisenha')
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

          await AsyncStorage.setItem('login', 'true')
          await AsyncStorage.setItem('token', data.token)

          router.replace('intern/profile')

        } else setErrLogin("Usuário não encontrado")

    } catch (e) {
        console.log(e)
        setErrLogin("Erro ao efetuar login")
    }
       console.log(user)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <Input variant='outline' size='lg' style={styles.input}> 
                <InputField onChangeText={(txt) => setUser({...user, email: txt})} 
                placeholder='E-mail'/>
            </Input>

            <Input variant='outline' size='lg' style={styles.input}> 
                <InputField onChangeText={(txt) => setUser({...user, senha: txt})} 
                placeholder='Senha' type='password'/>
            </Input>
            <Text style={{marginBottom: 25, color: "red"}}> {errLogin} </Text>

            <Button style={[styles.button, {marginTop: 20}]} onPress={login} 
            size="md" variant="solid" action="primary">
                <ButtonText>Entrar</ButtonText>
            </Button >

            <Button style={[styles.button, {marginTop: 20}]} onPress={cadastrar}
            size="md" variant="solid" action="primary">
                <ButtonText>Cadastrar-se</ButtonText>
            </Button >

            <Button style={{marginTop: 35}} onPress={esqueci}
            size="md" variant="link" action="primary">
                <ButtonText>Esqueci a senha</ButtonText>
            </Button >

            <StatusBar style="auto" />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },
    input: {
        height: 40,
        width: 330,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        marginTop: 8,
        paddingHorizontal: 8,
      },
    title: {
        fontSize: 25, 
        fontWeight: 'bold',
        marginBottom: 20, 
        textAlign: 'center', 
      },
    button: {
        width: 120,
        height: 40,
    }
})