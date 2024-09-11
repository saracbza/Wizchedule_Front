import { Button, ButtonText } from '@/components/ui/button'
import { router } from 'expo-router'
import { Text, StyleSheet, SafeAreaView } from 'react-native'

export default function Home(){

    const voltar = () => {
        router.replace('/login')
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={{color: '#fff'}}> Olá Aluno! </Text>

            <Button style={{ marginTop: 5 }} onPress={voltar}
            size="md" variant="solid" action="primary">
             <ButtonText>Voltar</ButtonText>
            </Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a2224',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
})