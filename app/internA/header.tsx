import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Header(){

    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [data, setData] = useState('');

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const nomeUsuario = await AsyncStorage.getItem('nomeUsuario')
                const cursoUsuario = await AsyncStorage.getItem('cursoUsuario')
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
                    source={{ uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-icon&psig=AOvVaw02UdG5QxvCBKtANU8n3P9D&ust=1725813223011000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCPDoqrKhsYgDFQAAAAAdAAAAABAE' }}
                    style={styles.profileImagem}
                />
                <View style={styles.infos}>
                    <Text style={styles.nome}>{nome}</Text>
                    <Text style={styles.text}>{curso}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Image
                    source={{ uri: '../../assets/cromo' }} 
                    style={styles.logo}
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
        backgroundColor: 'white', 
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImagem: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    infos: {
        justifyContent: 'center',
    },
    nome: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#34535c'
    },
    text: {
        fontSize: 14,
        color: '#63797b',
    },
    rightContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 8,
    },
})