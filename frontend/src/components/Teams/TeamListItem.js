import React from 'react'
import {Col, ListGroup, Row} from 'react-bootstrap'



const TeamListItem = ({team, teamDetailsSelectHandler, active}) => {
    const {teamName, roster} = team
    // const [clickedInput, setClickedInput] = useState();
     
    

    
     const selectHandler = () => {
         teamDetailsSelectHandler(team)
     }


    return (
        <ListGroup.Item active={active} action onClick={()=>selectHandler()}>
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
