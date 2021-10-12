import React from 'react'
import { Card } from 'react-bootstrap'
import PlayerDetails from './PlayerDetails'

const DetailsPanel = ({detailsObject}) => {
    return (
        <Card>
            {detailsObject.detailsType === 'player' && <PlayerDetails detailsObject={detailsObject} /> }
        </Card>
    )
}

export default DetailsPanel
