import { Button, ButtonText } from '@/components/ui/button'
import { router } from 'expo-router'
import { Text, View, StyleSheet } from 'react-native'

export default function EsqueciSenha(){

    const voltar = () => {
        router.replace('./login')
    }

    return(
        <View>
            <Text style={styles.container}> Esqueci a senha </Text>
            <Button style={{ marginTop: 20 }} onPress={voltar}
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