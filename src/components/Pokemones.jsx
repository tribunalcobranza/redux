import React from 'react'

//useDispatch sirve para seleccionar las acciones de pokeDucks y useSelector para leer array
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonesAccion, siguientePokemonesAccion} from '../redux/pokeDucks'

const Pokemones = () => {
    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.array)
    console.log(pokemones)

  return (
    <div>Lista de Pokemones
    <button onClick={() => dispatch(obtenerPokemonesAccion())}>Get Pokemones</button>
    <button onClick={() => dispatch(siguientePokemonesAccion(20))}>Siguiente</button>
        <ul>
            {
            pokemones.map(item => (
                <li key={item.name}>{item.name}</li>
            ))
            }
        </ul>
    </div>
  )
}

export default Pokemones