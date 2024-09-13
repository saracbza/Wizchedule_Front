import Monitorias from '@/components/monitorias'
import { Button, ButtonText } from '@/components/ui/button'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, StyleSheet, SafeAreaView, View } from 'react-native'

export default function Home(){
    const [dia, setDia] = useState<string>('')
    const hoje = new Date()
    const DiaDaSemana = (data: Date) => {
        const diasDaSemana = [
            "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", 
            "Quinta-feira", "Sexta-feira", "Sábado",  
        ]
        setDia(diasDaSemana[data.getDay()])
    }
    
    useEffect(() => {
        DiaDaSemana(hoje)
    }, [])

    const agendar = () => {
        router.replace('/agendamentos')
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={[styles.title, {color: '#fff'}]}> Monitorias do dia </Text>
            <View style={styles.viewDia}>
                <Text style={{color: '#fff', fontSize: 18}}>{dia}</Text>
            </View>
            <View style={styles.viewCaixas}>
                <Monitorias/>
            </View>
            <Button style={{ marginLeft: 10 }} onPress={agendar}
            size='xl' variant="link" action="primary">
                <ButtonText style={styles.buttonText}>Agendar monitoria</ButtonText>
            </Button>
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
    },
    buttonText: {
        fontSize: 20,
        color: '#942226',
        flex: 1,
    },
    viewDia: {
        padding: 10,
        backgroundColor: '#275161',
        margin: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginBottom: 0
    },
    viewCaixas: {
        marginTop: 0,
        padding: 10,
        backgroundColor: '#ffffff',
        margin: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
})