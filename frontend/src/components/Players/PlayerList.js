import React from 'react'
import { ListGroup } from 'react-bootstrap'
import PlayerListItem from './PlayerListItem'



const PlayerList = ({players, playerDetailsSelectHandler, action, variant}) => {


    return (
        <>
        <ListGroup variant={variant}>
            {players && 
                players.map(player => { 
                    
                    return (
                        <PlayerListItem key={player._id} 
                            player={player} 
                            playerDetailsSelectHandler={playerDetailsSelectHandler}
                            action={action}
                            
                        >

                        </PlayerListItem>
                    )
                })
            }
        </ListGroup>
        </>
    )
}

export default PlayerList
