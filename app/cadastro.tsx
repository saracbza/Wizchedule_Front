import { Button, ButtonText } from '@/components/ui/button'
import { router } from 'expo-router'
import { Text, View, StyleSheet, Modal, Alert } from 'react-native'
import { Input, InputField } from '@/components/ui/input'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'

interface IUserRegister{
    email: string
    senha: string
    nome: string
    curso: string
    tipo: string
    confirmar: string
}

export default function Cadastro(){
    const [user, setUser] = useState<IUserRegister>({email: '', senha: '', confirmar: '',
                                                nome: '', curso: '', tipo: ''})
    const [modalVisible, setModalVisible] = useState(false)                                     
    const [curso, setCurso] = useState<string>("Selecione seu curso")
    const [errLogin, setErrLogin] = useState<string>("")  

    

    const cancelar = () => {
        router.replace('/login')
    }

    const cadastrar = () => {

    }

    const modal = (cursoEscolha: string) => {
        setCurso(cursoEscolha)
        setUser({...user, curso: cursoEscolha})
        setModalVisible(!modalVisible)
        console.log(user)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <Input variant='outline' size='lg' style={styles.input}> 
                <InputField onChangeText={(txt) => setUser({...user, nome: txt})} 
                placeholder='Nome completo'/>
            </Input>

            <Input variant='outline' size='lg' style={styles.input}> 
                <InputField onChangeText={(txt) => setUser({...user, email: txt})} 
                placeholder='E-mail'/>
            </Input>

            <Input variant='outline' size='lg' style={styles.input}> 
                <InputField onChangeText={(txt) => setUser({...user, senha: txt})} 
                placeholder='Senha' type='password'/>
            </Input>

            <Input variant='outline' size='lg' style={styles.input}> 
                <InputField onChangeText={(txt) => setUser({...user, confirmar: txt})} 
                placeholder='Confirmar senha' type='password'/>
            </Input>

            <Modal 
                animationType='slide' transparent={false}
                visible={modalVisible}
                onRequestClose={()=>{
                    setModalVisible(!modalVisible)}
                }>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.title}> Selecione um curso </Text>
                    <Button style={styles.modalButton}
                    onPress={() => modal("Análise e desenvolvimento de sistemas")}>
                        <ButtonText> Análise e desenvolvimento de sistemas </ButtonText>
                    </Button>
                    <Button style={styles.modalButton}
                    onPress={() => modal("Comércio")}>
                        <ButtonText> Comércio </ButtonText>
                    </Button>
                    <Button style={styles.modalButton}
                    onPress={() => modal("Logística")}>
                        <ButtonText> Logística </ButtonText>
                    </Button>
                </View>
            </View>
            </Modal>
            <Button style={[styles.button, {marginTop: 8, width: 330, 
            height: 40}]} 
            onPress={()=> setModalVisible(true)}
            size="md" variant="outline" action="primary">
                <ButtonText style={styles.buttonText}>{user.curso}</ButtonText>
            </Button >

            <Text style={{marginBottom: 25, color: "red"}}> {errLogin} </Text>

            <StatusBar style="auto" />

            <View style={styles.buttonsView}>

                <Button style={[styles.button, {marginRight: 10}]} onPress={cancelar}
                    size="md" variant="solid" action="primary">
                    <ButtonText>Cancelar</ButtonText>
                </Button >

            <Button style={styles.button} onPress={cadastrar}
            size="md" variant="solid" action="primary">
                <ButtonText>Cadastrar</ButtonText>
            </Button >
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    buttonText:{
        color: 'grey', 
        textAlign: 'left',

    },
    buttonsView:{
        padding: 16,
        width: 120,
        height: 40,
        marginBottom: 8,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },
    input: {
        height: 40,
        width: 330,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        marginTop: 8,
        paddingHorizontal: 8,
      },
    title: {
        fontSize: 25, 
        fontWeight: 'bold',
        marginBottom: 20, 
        textAlign: 'center', 
      },
    button: {
        width: 120,
        height: 40,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
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
        width: 330,
        height: 40,
        marginTop: 10,
    }
})