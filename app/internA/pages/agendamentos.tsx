import Agendamento from '@/components/agendamento'
import { Button, ButtonText } from '@/components/ui/button'
import { router } from 'expo-router'
import { Text, StyleSheet, SafeAreaView, View, ScrollView } from 'react-native'

export default function Agendamentos(){

    return(
        <SafeAreaView style={styles.container}>
            <Text style={[styles.title, {color: '#fff'}]}> Meus agendamentos </Text>
            <View style={styles.viewAgendamentos}>
                 {/*<Agendamentos /> */}
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a2224',
        justifyContent: 'flex-start',
        padding: 16,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 20,
        color: '#942226',
        flex: 1,
    },
    viewAgendamentos: {
        padding: 10,
        backgroundColor: '#275161',
        borderRadius: 20,
        marginBottom: 0,
        height: 400,
        //flexGrow: 1,
    },
})