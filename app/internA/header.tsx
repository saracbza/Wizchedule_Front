import { useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Header(){
    const nome = AsyncStorage.getItem('nomeUsuario')
    const curso = AsyncStorage.getItem('cursoUsuario')
    const dataString = AsyncStorage.getItem('hoje').toString()
    const data = new Date(dataString)
    

    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()
    const hoje = `${dia}/${mes}/${ano}`

    return(
        <View style={styles.header}>
            <View style={styles.profile}>
                <Image
                    src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fprofile-icon&psig=AOvVaw02UdG5QxvCBKtANU8n3P9D&ust=1725813223011000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCPDoqrKhsYgDFQAAAAAdAAAAABAE'
                    style={styles.profileImage}
                />
                <View style={styles.infos}>
                    <Text>{nome}</Text>
                    <Text>{curso}</Text>
                </View>
                <View style={styles.infos}>
                    <Text>{hoje}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 16,
        paddingTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'gray', 
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    infos: {
        justifyContent: 'center',
    }
})