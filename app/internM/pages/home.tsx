import { Button, ButtonText } from '@/components/ui/button'
import { router } from 'expo-router'
import { Text, View, StyleSheet } from 'react-native'

export default function Home(){

    const voltar = () => {
        router.replace('/login')
    }

    return(
        <View style={styles.container}>
            <Text> Olá Monitor! </Text>
            <Button style={{ marginTop: 5 }} onPress={voltar}
            size="md" variant="solid" action="primary">
             <ButtonText>Voltar</ButtonText>
            </Button>
        </View>
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
})