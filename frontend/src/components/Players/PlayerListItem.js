import React from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'


const PlayerListItem = ({player,selectPlayerHandler, action=true, active, children}) => {
    const {playerName, age, genderMatchup, selfRating, role} = player
    return (
        <ListGroup.Item active={active} action={action} onClick={selectPlayerHandler ? ()=> selectPlayerHandler(player._id) : undefined}>
            <Row>
                <Col><strong>{playerName}</strong></Col>
                <Col className='d-flex justify-content-end text-muted'>
                    <div>{age} </div>
                    <div className='text-capitalize'>&nbsp;{genderMatchup.charAt(0)}</div>
                </Col>
            </Row>
            <Row>
                <Col xs='auto'><span className='text-muted'>Rating: </span>
                <RatingNumber rating={selfRating}/>
                </Col>
                <Col xs='auto'>
                    <span className='text-muted'>Position: </span><span className='text-capitalize'>{role}</span>
                </Col>
                {children && <Col className='d-flex justify-content-end'>
                    {children}
                </Col>}
            </Row>
            
            
        </ListGroup.Item>
    )
}


const ratingColors = [
    {color: "#AE2012"},
    {color:"#CA6702"},
    {color:"#EE9B00"},
    {color:"#0A9396"},
    {color:"#005F73"}
]

const RatingNumber = ({rating}) =>{
    let color
    if(rating > 90) color = ratingColors[0] 
    else if(rating > 80) color = ratingColors[1] 
    else if (rating > 70) color = ratingColors[2] 
    else if(rating > 60) color = ratingColors[3] 
    else color = ratingColors[4] 

    return (
        <span style={color}>
            <strong>{rating}</strong>
        </span>
    )
}

export default PlayerListItem
