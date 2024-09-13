import { View, StyleSheet, Text, ScrollView, Modal } from "react-native"
import { Button, ButtonIcon, ButtonText } from "../ui/button"
import { useState } from "react"
import { EyeIcon, TrashIcon } from '@/components/ui/icon'

interface Props {
    materia: string
    data: string
    local: string
    obs: string
    dia_semana: string
    horario: string
}

export default function Agendamento({materia, data, local, obs, dia_semana, horario}: Props){
    const [modalVisible, setModalVisible] = useState(false) 
    return(
        <ScrollView>
            <View style={styles.viewCaixas}>
                <View>
                    <Text style={styles.materiaTexto}> {materia} - {data} </Text>
                    <Text style={styles.infosTexto}> {dia_semana} </Text>
                </View>
                <View style={styles.viewButton}>
                    <Button 
                    style={styles.button}
                    onPress={()=> setModalVisible(true)}>
                            <ButtonIcon as={EyeIcon}/>
                    </Button>
                    <Button style={styles.button}>
                        <ButtonIcon style={{backgroundColor: '#fff'}} as={TrashIcon}/>
                    </Button>
                <Modal 
                animationType='slide' transparent={true}
                visible={modalVisible}
                onRequestClose={()=>{
                    setModalVisible(!modalVisible)}
                }>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.title}> Agendamento </Text>
                    <Text style={styles.materiaTexto}> {materia} - {data} </Text>
                    <Text style={styles.infosTexto}> {horario} | {local}  </Text>
                    <Text style={styles.infosTexto}> {dia_semana} </Text>
                    <Text style={styles.infosTexto}> {obs} </Text>
                    <Button style={styles.modalButton}
                    onPress={() => setModalVisible(!modalVisible)}>
                        <ButtonText> Fechar </ButtonText>
                    </Button>
                </View>
            </View>
            </Modal>
                </View>
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20, 
        fontWeight: 'bold',
        marginBottom: 20, 
        textAlign: 'center', 
      },
    viewCaixas: {
        padding: 10,
        backgroundColor: '#ffffff',
        margin: 5,
        borderRadius: 20,
        height: 80,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewButton: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    button: {
        padding: 20,
        marginLeft: 5,
        backgroundColor: '#a82326',
        borderRadius: 12,
        width: 50,
        height: 50,
    },
    materiaTexto: {
        fontSize: 16,
        color: '#275161',
        fontWeight: 'bold',
    },
    infosTexto:{
        fontSize: 13,
        color: '#275161',
    },
    container: {
        flex: 1,
        backgroundColor: '#1a2224',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
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
        //alignItems: 'center',
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
        backgroundColor: '#cf1111'
    },
})