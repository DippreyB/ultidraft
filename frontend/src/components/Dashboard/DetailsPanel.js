import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import PlayerDetails from '../Players/PlayerDetails'
import TeamDetails from '../Teams/TeamDetails'

const DetailsPanel = ({detailsObject, setDetailsObject}) => {

    const [isSmallWindow, setIsSmallWindow] = useState(false)

    useEffect(()=> {
        setIsSmallWindow(window.matchMedia("(max-width: 767px)")) //Is this too much voodoo? Seems like there must be a better solution.
    },[detailsObject])

    let detailsComponent

    if(detailsObject.type === 'player')
        detailsComponent = <PlayerDetails  detailsObject={detailsObject} />
    else 
        detailsComponent = <TeamDetails detailsObject={detailsObject} />

    return (
        <Card>
            {isSmallWindow.matches ? 
            
            <Modal fullscreen backdrop={false} show={detailsObject !== undefined} onHide={()=>setDetailsObject(undefined)}>    
                <Modal.Header closeButton><Modal.Title><span className='text-capitalize'>{detailsObject.type}</span> Details</Modal.Title> </Modal.Header>
                {detailsComponent}
            </Modal> 
            :  <> {detailsComponent} </>
            }

        </Card>
    )
}

export default DetailsPanel
