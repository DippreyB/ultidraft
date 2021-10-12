import React from 'react'
import {Col, ListGroup, Row} from 'react-bootstrap'


const TeamListItem = ({team}) => {
    const {teamName} = team

    return (
        <ListGroup.Item action>
            <Row>
                <Col><strong>{teamName}</strong></Col>
            </Row>
            <Row>
                <Col>Captains: </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default TeamListItem
