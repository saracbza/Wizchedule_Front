import { View, StyleSheet, Text, TextStyle, ScrollView } from "react-native"
import { Button } from "../ui/button"

interface Props {
    materia: string
    horario: string
    local: string
}

export default function Monitoria({materia, horario, local}: Props){
    return(
        <ScrollView>
            <View style={styles.viewQuadro}>
                <View style={styles.caixaMateria}>
                    <Text style={styles.materiaTexto}>{materia}</Text>
                </View>
                <View style={styles.caixaLocalHora}>
                    <Text style={styles.localHoraTexto}>{horario}</Text>
                    <Text style={styles.localHoraTexto}>{local}</Text>
                </View>
            </View>    
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    viewQuadro: {
        padding: 20,
        backgroundColor: '#1a2224',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    caixaMateria:{
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
        height: 80,
        width: 160,
        justifyContent: 'center',
    },
    caixaLocalHora: {
        padding: 20,
        marginLeft: 5,
        backgroundColor: '#555455',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
        height: 80,
    },
    materiaTexto: {
        fontSize: 20,
        color: '#000',
    },
    localHoraTexto:{
        fontSize: 16,
        color: '#fff',
    },
})