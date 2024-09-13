import { API_URL } from "@/app/config/constants";
import { useEffect, useState } from "react";
import Agendamento from "../agendamento";

interface Agendamento {
    id: number
    materia: string
    data: string
    local: string
    obs: string
    dia_semana: string
    horario: string
}

export default function Agendamentos(){
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
    async function loadAgendamentos(){
    try{
        const resp = await fetch(`${API_URL}/agendamento`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            const data = await resp.json()
            if (resp.status == 200) {
                setAgendamentos(data)
            }
            console.log(resp)
        } catch(e){
            console.log("erro: ", e)
        }
    } 

    useEffect(() => {
        loadAgendamentos()
    }, [])

    return(
        <>
            {agendamentos.length > 0 ? (
                agendamentos.map((agendamento)=> (
                <Agendamento key={agendamento.id}
                materia={agendamento.materia}
                local={agendamento.local}
                horario={agendamento.horario}
                data={agendamento.data}
                obs={agendamento.obs}
                dia_semana={agendamento.dia_semana}/> ))
            ) : (
                <Agendamento key={1}
                materia='Sem agendamento'
                local='' horario='' data=''
                obs='' dia_semana=''/>
            )}
        </>
        
    )
}
