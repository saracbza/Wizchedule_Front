import { Button, ButtonText } from '@/components/ui/button'
import { router } from 'expo-router'
import { Text, View, StyleSheet, Modal, Alert } from 'react-native'
import { Input, InputField } from '@/components/ui/input'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { API_URL } from './config/constants'

interface IUserRegister{
    email: string
    senha: string
    nome: string
    curso: string
    tipo: string
    confirmar: string
}

export default function Cadastro(){
    const [user, setUser] = useState<IUserRegister>({email: '', senha: '', nome: '', confirmar: '',
                                                     curso: '', tipo: 'Aluno'})
    const [modalVisible, setModalVisible] = useState(false)                                     
    const [curso, setCurso] = useState<string>("Selecione seu curso")
    const [errLogin, setErrLogin] = useState<string>("")

    const cancelar = () => {
        router.replace('./login')
    }

    const cadastrar = async() => {

        if (user.confirmar != user.senha) setErrLogin("Senhas não coincidem!")
        else {
            const resp = await fetch(`${API_URL}/auth/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: user.email, senha: user.senha, nome: user.nome, curso: user.curso, tipo: user.tipo}),
            })
            if (user.curso == "Selecione seu curso" || resp.status == 400) setErrLogin("Todos os campos são obrigatórios!")
            else if (resp.status == 409) setErrLogin("Usuário já cadastrado")
            else if (resp.status == 422) setErrLogin("E-mail inválido. O e-mail deve ser com o domínio @fatec.sp.gov.br")
            else if (resp.status == 200) {
                router.replace('/login')
                ativaAlerta
            }
        }
    }
    
    const ativaAlerta = () =>
        Alert.alert('Cadastro realizado', 'Seu cadastro foi realizado com sucesso!', [
          {text: 'Fechar',},
        ])

    const modal = (cursoEscolha: string) => {
        setCurso(cursoEscolha)
        setUser({...user, curso: cursoEscolha})
        setModalVisible(!modalVisible)
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
                animationType='slide' transparent={true}
                visible={modalVisible}
                onRequestClose={()=>{
                    setModalVisible(!modalVisible)}
                }>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.title}> Selecione um curso </Text>

                    <Button style={styles.modalButton}
                    onPress={() => modal("Análise e Desenvolvimento de Sistemas")}>
                        <ButtonText> Análise e desenvolvimento de sistemas </ButtonText>
                    </Button>

                    <Button style={styles.modalButton}
                    onPress={() => modal("Comércio Exterior")}>
                        <ButtonText> Comércio Exterior </ButtonText>
                    </Button>
                    
                    <Button style={styles.modalButton}
                    onPress={() => modal("Desenvolvimento de Software Multiplataforma")}>
                        <ButtonText> Desenvolvimento de Software Multiplataforma </ButtonText>
                    </Button>

                    <Button style={styles.modalButton}
                    onPress={() => modal("Gestão de Serviços")}>
                        <ButtonText> Gestão de Serviços </ButtonText>
                    </Button>

                    <Button style={styles.modalButton}
                    onPress={() => modal("Gestão Empresarial")}>
                        <ButtonText> Gestão Empresarial </ButtonText>
                    </Button>

                    <Button style={styles.modalButton}
                    onPress={() => modal("Logística Aeroportuária")}>
                        <ButtonText> Logística Aeroportuária </ButtonText>
                    </Button>

                </View>
            </View>
            </Modal>

            <Button style={{marginTop: 8, width: 330, backgroundColor: '#fff',
                height: 40, justifyContent: 'flex-start'}} 
                onPress={()=> setModalVisible(true)}
                size="md" variant="outline" action="primary">
                <ButtonText style={styles.buttonText}>{curso}</ButtonText>
            </Button>

            <Text style={{marginBottom: 25, color: "red"}}> {errLogin} </Text>

            <StatusBar style="auto" />

            <View style={styles.buttonsView}>

                <Button style={[styles.button, {marginRight: 10, backgroundColor: '#cf1111'}]} 
                onPress={cancelar}
                    size="md" variant="solid" action="primary">
                    <ButtonText>Cancelar</ButtonText>
                </Button >

                <Button style={[styles.button, {backgroundColor: '#234e5e'}]} 
                onPress={cadastrar}
                    size="md" variant="solid" action="primary">
                    <ButtonText>Cadastrar</ButtonText>
                </Button>
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
        backgroundColor: '#1a2224',
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
        backgroundColor: '#fff'
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