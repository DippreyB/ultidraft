import React from 'react'
import {Col, ListGroup, Row} from 'react-bootstrap'



const TeamListItem = ({team, selectTeamHandler, active}) => {
    const {teamName, roster} = team
    // const [clickedInput, setClickedInput] = useState();
     
    

    
     const selectHandler = (e) => {
         e.preventDefault()
         selectTeamHandler(team._id)
     }


    return (
        <ListGroup.Item active={active} action onClick={(e)=>selectHandler(e)}>
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
