import React, { useEffect, useRef, useState } from 'react'
import {Col, ListGroup, Row} from 'react-bootstrap'



const TeamListItem = ({team, teamDetailsSelectHandler}) => {
    const {teamName, roster} = team
    // const [clickedInput, setClickedInput] = useState();
     const activeInput = useRef()
    

    
     const selectHandler = () => {
         teamDetailsSelectHandler(team)
    //     setClickedInput(activeInput.current)
    //     console.log(clickedInput)
    //     //activeInput.current.classList.toggle('active')
     }
  
    // useEffect(()=>{
    //         activeInput.current.classList.toggle('active')
    // },[activeInput.current])


    return (
        <ListGroup.Item ref={activeInput} action onClick={()=>selectHandler()}>
            <Row>
                <Col><strong>{teamName}</strong></Col> 
            </Row>
            <Row>
                <Col>Players: {roster.length}</Col>
            </Row>
        </ListGroup.Item>
    )
}

export default TeamListItem
