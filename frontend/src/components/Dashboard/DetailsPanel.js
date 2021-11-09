import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap'


const DetailsPanel = ({setDetails, children, detailsObject}) => {

    const [isSmallWindow, setIsSmallWindow] = useState(false)

    useEffect(()=> {
        setIsSmallWindow(window.matchMedia("(max-width: 767px)")) //Is this too much voodoo? Seems like there must be a better solution.
    },[detailsObject])


    return (
        <Card>
            {isSmallWindow.matches ? 
            
            <Modal fullscreen backdrop={false} show={detailsObject !== undefined} onHide={()=>setDetails(undefined)}>    
                <Modal.Header closeButton><Modal.Title><span className='text-capitalize'>Test Details</span></Modal.Title> </Modal.Header>
                {children}
            </Modal> 
            :  <> {children} </>
            }

        </Card>
    )
}

export default DetailsPanel
