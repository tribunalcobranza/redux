// Archivo reducer y otros en uno solo. Metodología Ducks
import axios from "axios"

//constantes (Viene de reducer. lo manda a una constante o estado para que ese estado lo podamos consumir en algún componente )
const dataInicial = { // Contiene nuestro estado
    array: [],
    offset: 0
}

// TYPES
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'// Types del switch lo vamos a declarar 
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'


//reducer (VA A ACEPTAR LISTA DE POKEMONES Y LO ENVIA A UNA CONSTANTE(ARRIBA))
export default function pokeReducer(state = dataInicial, action) { // state es el estado inicial, action la accion 
    switch (action.type) { //action.type es la constante que va cambiando
        case OBTENER_POKEMONES_EXITO:
            return { ...state, array: action.payload }
        case SIGUIENTE_POKEMONES_EXITO:
            //state ya viene modificado, array porque ya tenemos un arreglo con los siguientes 20 pokemones
            return { ...state, array: action.payload.array, offset: action.payload.offset }
        default:
            return state

    }
}


// dispatch para activar el reducer
// acciones (va a consumir la API) (con dispach vamos a activar reducer y con getState vamos a poder obtener data inicial o informacion que se este almacenando )
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    const offset = getState().pokemones.offset

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error)
    }
}

export const siguientePokemonesAccion = (numero) => async (dispatch, getState) => {// numero viene de pokemones.jsx

    //primera alternativa para actualizar offset
    const offset = getState().pokemones.offset
    const siguiente = offset + numero

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`)
        dispatch({ // en reducer SWITCH-CASE SIGUIENTE_POKEMONES_EXITO
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: {
                array: res.data.results,
                offset: siguiente
            }
        })
    } catch (error) {
        console.log(error)
    }
}
