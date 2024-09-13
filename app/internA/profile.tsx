import { API_URL } from '@/app/config/constants'
import { Button, ButtonText } from '@/components/ui/button'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import foto1 from '../../assets/perfil/1.png'
import foto2 from '../../assets/perfil/2.png'
import foto3 from '../../assets/perfil/3.png'
import foto4 from '../../assets/perfil/4.png'
import foto5 from '../../assets/perfil/5.png'

export default function Profile(){

    const sair = async() => {
        const resp = await fetch(`${API_URL}/auth/logout`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json()
        console.log(data)
        if(!data.auth) router.push('login')
    }

    const [nome, setNome] = useState('')
    const [curso, setCurso] = useState('')
    const [email, setEmail] = useState('')
    const [fotoPerfil, setFotoPerfil] = useState<ImageSourcePropType>()

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const nomeUsuario = await AsyncStorage.getItem('nomeUsuario')
                const cursoUsuario = await AsyncStorage.getItem('cursoUsuario')
                const fotoId = await AsyncStorage.getItem('foto')
                const emailUsuario = await AsyncStorage.getItem('email')

                console.log(fotoId)
                switch (fotoId){
                    case '1': setFotoPerfil(foto1)
                    case '2': setFotoPerfil(foto2)
                    case '3': setFotoPerfil(foto3)
                    case '4': setFotoPerfil(foto4)
                    case '5': setFotoPerfil(foto5)
                }
                if (!(!nomeUsuario)) setNome(nomeUsuario)
                if (!(!cursoUsuario)) setCurso(cursoUsuario)
                if (!(!emailUsuario)) setEmail(emailUsuario)
            }catch (e) { 
                console.error('Erro ao buscar dados do AsyncStorage', e)
            }
        }
        buscarDados()
    }, [])


    return(
        <SafeAreaView style={styles.container}>
            <Text style={[styles.title, {color: '#fff'}]}> Meu Perfil </Text>
            <View style={styles.viewPerfil}>
                <View> 
                  <Image
                    source={fotoPerfil}
                    style={styles.profileImagem}
                    />
                </View>
                <View style={styles.viewDados}>
                    <Text style={styles.titles}>Meu nome</Text>
                    <Text style={styles.textInfo}>{nome}</Text>
                    <Text style={styles.titles}>Meu curso</Text>
                    <Text style={styles.textInfo}>{curso}</Text>
                    <Text style={styles.titles}>Meu email</Text>
                    <Text style={styles.textInfo}>{email}</Text>
                    <Text style={styles.titles}>Minha Conta</Text>
                    <Text style={styles.textInfo}>Aluno</Text>
                </View>
            </View>
            <View style={{padding: 20}}>
                <Button style={styles.button} onPress={sair}
                size="lg" variant="solid" action="primary">
                    <ButtonText style={{fontSize: 20}}>SAIR</ButtonText>
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a2224',
        justifyContent: 'flex-start',
        padding: 5,
    },
    viewDados:{
        marginLeft: 20,
        marginRight: 5,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 8,
    },
    titles:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#275161',
    },
    textInfo:{
        fontSize: 13,
        color: '#275161',
    },
    buttonText: {
        fontSize: 20,
        color: '#942226',
        flex: 1,
    },
    viewPerfil: {
        padding: 10,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 20,
        borderTopLeftRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    profileImagem: {
        height: 100,
        width: 100,
        borderRadius: 50,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        marginTop: 200, //lembrar de alterar qnd add os outros componentes
        height: 50,
        padding: 10,
        backgroundColor: '#a82326',
        justifyContent: 'center',
    },
})