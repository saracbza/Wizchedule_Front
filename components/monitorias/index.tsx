import { API_URL } from "@/app/config/constants";
import { useEffect, useState } from "react";
import Monitoria from "../monitoria";

interface Monitoria {
    id: number
    materia: string
    horario: string
    local: string
}

export default function Monitorias(){
    const [monitorias, setMonitorias] = useState<Monitoria[]>([])
    const hoje = new Date()
    async function loadMonitorias(){
    try{
        const resp = await fetch(`${API_URL}/monitoria/show`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: hoje}),
        })
            const data = await resp.json()
            if (resp.status == 200) {
                setMonitorias(data)
            }
            console.log(resp)
        } catch(e){
            console.log("erro: ", e)
        }
    } 

    useEffect(() => {
        loadMonitorias()
    }, [])

    return(
        <>
            {monitorias.length > 0 ? (
                monitorias.map((monitoria)=> (
                <Monitoria key={monitoria.id}
                materia={monitoria.materia}
                local={monitoria.local}
                horario={monitoria.horario}/> ))
            ) : (
                <Monitoria key={1}
                materia={''}
                local={'monitoria hoje'}
                horario={'Não há'}/>
            )}
        </>
        
    )
}
