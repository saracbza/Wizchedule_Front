import { API_URL } from '@/app/config/constants'
import { Button, ButtonText } from '@/components/ui/button'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, ImageSourcePropType, Modal, TouchableOpacity } from 'react-native'
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import foto1 from '../../assets/perfil/1.png'
import foto2 from '../../assets/perfil/2.png'
import foto3 from '../../assets/perfil/3.png'
import foto4 from '../../assets/perfil/4.png'

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
    const [modalVisible, setModalVisible] = useState(false) 
    const [fotoSelecionada, setFotoSelecionada] = useState<number>(1)

    const buscarDados = async () => {
        try {
            const nomeUsuario = await AsyncStorage.getItem('nomeUsuario')
            const cursoUsuario = await AsyncStorage.getItem('cursoUsuario')
            const fotoId = await AsyncStorage.getItem('foto')
            const emailUsuario = await AsyncStorage.getItem('email')

            console.log(fotoId)
            switch (fotoId) {
                case '1':
                  setFotoPerfil(foto1); break
                case '2':
                  setFotoPerfil(foto2); break
                case '3':
                  setFotoPerfil(foto3); break
                case '4':
                  setFotoPerfil(foto4); break
            }
            if (!(!nomeUsuario)) setNome(nomeUsuario)
            if (!(!cursoUsuario)) setCurso(cursoUsuario)
            if (!(!emailUsuario)) setEmail(emailUsuario)
        }catch (e) { 
            console.error('Erro ao buscar dados do AsyncStorage', e)
        }
    }

    const confirmarAlerta = () =>
        Alert.alert('Alteração solicitada', 'Deseja mesmo alterar sua foto de perfil?', [
          {text: 'Alterar', onPress: () => mudarFoto()},
          {text: 'Cancelar'},
        ])

    const mudarFoto = async() => {
        const resp = await fetch(`${API_URL}/auth/mudarFoto/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fotoId: fotoSelecionada }),
        })
        const data = await resp.json()
        console.log(data)
        await AsyncStorage.setItem('foto', fotoSelecionada.toString())
        await buscarDados()
        setModalVisible(!modalVisible)
    }

    useEffect(() => {
        buscarDados()
    }, [])


    return(
        <SafeAreaView style={styles.container}>
            <Text style={[styles.title, {color: '#fff'}]}> Meu Perfil </Text>
            <View style={styles.viewPerfil}>
            <TouchableOpacity onPress={()=> setModalVisible(true)}> 
                  <Image
                    source={fotoPerfil}
                    style={styles.profileImagem}
                    />
            </TouchableOpacity>
            <Modal 
                animationType='slide' transparent={true}
                visible={modalVisible}
                onRequestClose={()=>{
                    setModalVisible(!modalVisible)}
                }>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.titleModal}> Escolha sua nova foto </Text>
                    <View style={styles.opcoesFotos}>
                        <TouchableOpacity style={{padding: 5}}
                        onPress={() => {setFotoSelecionada(1); confirmarAlerta()}}> 
                            <Image
                            source={foto1}
                            style={styles.opcoesImagens}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding: 5}}
                        onPress={() => {setFotoSelecionada(2); confirmarAlerta()}}> 
                            <Image
                            source={foto2}
                            style={styles.opcoesImagens}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.opcoesFotos}>
                        <TouchableOpacity style={{padding: 5}}
                        onPress={() => {setFotoSelecionada(3); confirmarAlerta()}}>
                            <Image
                            source={foto3}
                            style={styles.opcoesImagens}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{padding: 5}}
                        onPress={() => {setFotoSelecionada(4); confirmarAlerta()}}>
                            <Image
                            source={foto4}
                            style={styles.opcoesImagens}
                            />
                        </TouchableOpacity>
                    </View>
                    <Button style={styles.modalButton}
                    onPress={() => setModalVisible(!modalVisible)}>
                        <ButtonText> Fechar </ButtonText>
                    </Button>
                </View>
            </View>
            </Modal>
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
            <View style={{justifyContent: 'center'}}>
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
    opcoesFotos:{
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
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
    opcoesImagens: {
        height: 150,
        width: 150,
        borderRadius: 0,
        padding: 10,
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
    titleModal: {
        fontSize: 20, 
        fontWeight: 'bold',
        marginBottom: 20, 
        textAlign: 'center', 
      },
    viewCaixas: {
        padding: 10,
        backgroundColor: '#ffffff',
        margin: 5,
        borderRadius: 20,
        height: 80,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewButton: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        //alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        width: 190,
        height: 40,
        marginTop: 10,
        padding: 5,
        backgroundColor: '#cf1111'
    },
})