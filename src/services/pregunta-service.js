import Pregunta from '../dominio/pregunta'
import axios from 'axios'
import { REST_SERVER_URL } from './constants'

class PreguntaService {

    async getPregunta(id) {
        const { data } = await axios.get(`${REST_SERVER_URL}/pregunta/${id}`)
        return Pregunta.fromJson(data)
    }

    async getPreguntas(valorBusqueda, soloActivas) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntas/${valorBusqueda}/${soloActivas}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async allInstances(soloActivas) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntasAll/${soloActivas}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async actualizarPregunta(pregunta) {
        return await axios.put(`${REST_SERVER_URL}/pregunta/${pregunta.id}`, pregunta.toJSON())
    }

    async nuevaPregunta(pregunta) {
        await axios.post(`${REST_SERVER_URL}/pregunta`, pregunta.toJSON())
    }

}
export const preguntaService = new PreguntaService()