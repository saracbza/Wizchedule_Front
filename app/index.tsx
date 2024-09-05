//index -- parte da mensagem esta errado
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import api from '@/helpers/axios';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IUserLogin{
    email: string
    password: string
}

export default function Login() {
    const [user, setUser] = useState<IUserLogin>({email: '', password: ''})
    let [errLogin, setErrLogin] = useState<string>("")

    const cadastrar = () => {
        router.replace('/cadastro')
    }

    const esqueci = () => {
        router.replace('/esquecisenha')
    }

    const login = async() => {
        try{
            const resp = await fetch('http://localhost:3000/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }) 
        console.log(resp)
        
        if(resp.status == 200){

          const data = resp.json()
          console.log(data.token)

          await AsyncStorage.setItem('login', 'true')
          await AsyncStorage.setItem('token', data.token)

          router.replace('/profile')

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
                <InputField onChangeText={(txt) => setUser({...user, password: txt})} 
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
}); 