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

    const respuestasArray = [{id: 1, descripcion: "respuesta 1", elegida: false}, {id: 2, descripcion: "respuesta 2", elegida: false}, 
                        {id: 3, descripcion: "respuesta 3", elegida: false}, {id: 4, descripcion: "respuesta 4", elegida: false},
                        {id: 5, descripcion: "respuesta 5", elegida: false}, {id: 6, descripcion: "respuesta 6", elegida: false}]
                        
    const [pregunta, setPregunta] = useState(new Pregunta())
    const [respuestas, setRespuestas] = useState(respuestasArray)
                      
    const buscarPregunta = async() => {
        const preg = await preguntaService.getPregunta(match.params.id)
        setPregunta(preg)
    }
    
    const seleccionar = (respuesta) => {
        return(
            <Checkbox className="chckbx" onChange={() => setChckbx(respuesta.id)} checked={respuesta.elegida}></Checkbox>
            )
        }
    
    const setChckbx = (id) => {
        const updatedList = respuestas.map(respuesta => {
            if(respuesta.id === id) {
                respuestas.map(respuesta => respuesta.elegida = false)
                respuesta.elegida = !respuesta.elegida
            }
            return respuesta
        })
        setRespuestas(updatedList)
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
            <DataTable value={respuestas} autoLayout={true}>
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