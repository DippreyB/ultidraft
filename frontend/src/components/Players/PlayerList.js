import React, { useEffect, useReducer } from 'react'
import { getPlayersFromApi } from '../../actions/playersActions'
import leaguePlayersReducer from '../../Reducers/playersReducer'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../slices/loggedInUserSlice'
import { ListGroup, Spinner } from 'react-bootstrap'
import PlayerListItem from './PlayerListItem'
import Message from '../Message'


const PlayerList = ({players, playerDetailsSelectHandler}) => {


    return (
        <>
        <ListGroup >
            {players && 
                players.map(player => { 
                    
                    return (
                        <PlayerListItem key={player._id} player={player} playerDetailsSelectHandler={playerDetailsSelectHandler}>

                        </PlayerListItem>
                    )
                })
            }
        </ListGroup>
        </>
    )
}

export default PlayerList
