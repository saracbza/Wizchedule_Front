import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logoCromo from '../../assets/cromo.png'
import foto1 from '../../assets/perfil/1.png'
import foto2 from '../../assets/perfil/2.png'
import foto3 from '../../assets/perfil/3.png'
import foto4 from '../../assets/perfil/4.png'

export default function Header(){

    const [nome, setNome] = useState('')
    const [curso, setCurso] = useState('')
    const [data, setData] = useState('')
    const [fotoPerfil, setFotoPerfil] = useState<ImageSourcePropType>()

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const nomeUsuario = await AsyncStorage.getItem('nomeUsuario')
                const cursoUsuario = await AsyncStorage.getItem('cursoUsuario')
                const fotoId = await AsyncStorage.getItem('foto')
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
            }catch (e) { 
                console.error('Erro ao buscar dados do AsyncStorage', e)
            }
        }
        buscarDados()
    }, [])

    useEffect(() => {
        const hoje = converterData()
        setData(hoje)
    }, [])

    const converterData = () => {
        const data = new Date()
        const dia = String(data.getDate()).padStart(2, '0')
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const ano = data.getFullYear()
        return `${dia}/${mes}/${ano}`
    }

    return (
        <View style={styles.header}>
            <View style={styles.profileContainer}>
                <Image
                    source={fotoPerfil}
                    style={styles.profileImagem}
                />
                <View style={styles.infos}>
                    <Text style={styles.nome}>{nome}</Text>
                    <Text style={styles.text}>{curso}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Image
                    source={logoCromo} 
                    style={styles.logo}
                    //resizeMode="contain"
                />
                <Text style={styles.text}>{data}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 16,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff', 
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImagem: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    infos: {
        justifyContent: 'center',
        marginLeft: 0,
    },
    nome: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#34535c'
    },
    text: {
        fontSize: 12,
        color: '#63797b',
    },
    rightContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 70,
        height: 22,
        marginBottom: 8,
    },
})