import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import PlayerDetails from '../Players/PlayerDetails'
import PlayerList from '../Players/PlayerList'
import DetailsPanel from './DetailsPanel'

const PlayersTab = ({players}) => {

    const [selectedPlayer , setSelectedPlayer] = useState()

    const selectPlayerHandler = (id) => { 
        setSelectedPlayer(players.find(player => player._id === id))
    }

    useEffect(() => {
        if(selectedPlayer)
            setSelectedPlayer(players.find(player => player._id === selectedPlayer._id))
    },[players,selectedPlayer])

    return (
        <>
            <Row>
                <Col md={4}>
                    {players && 
                    <PlayerList players={players} 
                        selectPlayerHandler={selectPlayerHandler}
                        selectedPlayer = {selectedPlayer}
                    /> }
                </Col>

                <Col md={8} className='my-5'>
                    {selectedPlayer && 
                    <DetailsPanel 
                    setDetails={setSelectedPlayer} 
                    detailsObject={selectedPlayer}
                    > 
                        <PlayerDetails selectedPlayer={selectedPlayer}>

                        </PlayerDetails>
                    </DetailsPanel>
                    }    
                </Col>
            </Row>
        </>
    )
}

export default PlayersTab
