import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import PlayerDetails from './PlayerDetails'

const DetailsPanel = ({detailsObject, setDetailsObject}) => {

    const [isSmallWindow, setIsSmallWindow] = useState(false)

    useEffect(()=> {
        setIsSmallWindow(window.matchMedia("(max-width: 767px)")) //Is this too much voodoo? Seems like there must be a better solution.
    },[detailsObject])


    return (
        <Card>
            {isSmallWindow.matches ? 
            
            <Modal fullscreen backdrop={false} show={detailsObject !== undefined} onHide={()=>setDetailsObject(undefined)}>    
                <Modal.Header closeButton><Modal.Title>Player Details</Modal.Title> </Modal.Header>
                <PlayerDetails  detailsObject={detailsObject} /> {/* if details object has type, player or Team*/ }
            </Modal> 
            : <PlayerDetails detailsObject={detailsObject} />
        
            }

        </Card>
    )
}

export default DetailsPanel
