import React from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
const ratingColors = [
    {color: "#AE2012"},
    {color:"#CA6702"},
    {color:"#EE9B00"},
    {color:"#0A9396"},
    {color:"#005F73"}
]

const PlayerListItem = ({playerName, age, genderMatchup, selfRating, role, team, _id}) => {
    
    return (
        <ListGroup.Item action>
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
                <Col>
                    <span className='text-muted'>Position: </span><span className='text-capitalize'>{role}</span>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

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
