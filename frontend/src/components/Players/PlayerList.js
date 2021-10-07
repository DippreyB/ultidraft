import React, { useEffect, useReducer } from 'react'
import { getPlayersFromApi } from '../../actions/playersActions'
import playersReducer from '../../Reducers/playersReducer'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../slices/loggedInUserSlice'
import { ListGroup, Spinner } from 'react-bootstrap'
import PlayerListItem from './PlayerListItem'


const PlayerList = ({leagueId}) => {

    //Make api call to get players for leagueId
    //use a hook to store players state
    const [playersState, dispatch] = useReducer(playersReducer, {
        players: [],
        status: 'idle'
    })
    const {loggedInUser} = useSelector(selectLoggedInUser)

    const {players, status, error} = playersState
    
    useEffect( ()=> {
        dispatch({type: 'PLAYERS_API_REQUEST', payload: {}})

        const fetchPlayers = async () => {
            const playersAction = await getPlayersFromApi(leagueId, loggedInUser)
            dispatch(playersAction)
        }

        fetchPlayers()
        
    },[leagueId, loggedInUser])

    return (
        <>
        {status === 'pending' && <Spinner/>}
        <ListGroup >
            {players && 
                players.map(player => { 
                    
                    return (
                        <PlayerListItem key={player._id} {...player}>

                        </PlayerListItem>
                    )
                })
            }
        </ListGroup>
        </>
    )
}

export default PlayerList
