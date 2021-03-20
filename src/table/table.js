import React, {useState, useEffect} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Checkbox} from 'primereact/checkbox';
import { Button } from 'primereact/button'
import './table.css'
import { preguntaService } from "../services/pregunta-service";
import Pregunta from "../dominio/pregunta";



const Table = ({history, match}) => {

    useEffect(()=>{
        buscarPregunta()
    }, [])

    const [pregunta, setPregunta] = useState(new Pregunta())
    const [opciones, setOpciones] = useState([])
    //const [correcta,setCorrecta] = useState("")
    const [elegida, setElegida] = useState(false)

    const buscarPregunta = async () => {
        const preg = await preguntaService.getPregunta(match.params.id)
        setPregunta(preg)
        convertirOpciones(preg.opciones)
    }

    const convertirOpciones = (options) => {
        const opcionesConvertidas = []
        options.forEach(op => {
            opcionesConvertidas.push({descripcion: op, elegida: false})
        })
        setOpciones(opcionesConvertidas)
    }
    
    const seleccionar = (opcion) => {
        return(
            <Checkbox className="chckbx" onChange={() => setChckbx(opcion)} checked={elegida}></Checkbox>
            )
        }
    
    const setChckbx = (opcion) => {
        /* const updatedOptions = opciones.forEach(op => {
            
        }) */
        
        
        /* const updatedList = respuestas.map(respuesta => {
            if(respuesta.id === id) {
                respuestas.map(respuesta => respuesta.elegida = false)
                respuesta.elegida = !respuesta.elegida
            }
            return respuesta
        })
        setRespuestas(updatedList) */
    }

    const existeSeleccionada = () => {
        return respuestas.map(respuesta => respuesta.elegida).includes(true)
    }

    const aceptar = async() => {

    }

    const cancelar = () => {
        history.push("/busqueda")
    }

    return(
        <div className="container-table">
            <span className="autor">Autor: Pepe Palala</span>
            <DataTable value={opciones} autoLayout={true}>
                <Column className ="descripcion" field="descripcion" header={pregunta.descripcion}></Column>
                <Column className ="" body={seleccionar}></Column>
            </DataTable>
            <div className ="buttonsdiv">
                <div className ="buttons">
                <Button label="Aceptar" className="p-button-primary" onClick={() => aceptar()} />
                <Button label="Cancelar" className="p-button-secondary" onClick={() => cancelar()} />
                </div>
            </div>
        </div>
    )
}
export default Table