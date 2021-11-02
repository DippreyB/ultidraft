import React, { useEffect, useState } from 'react'
import { ListGroup, Pagination } from 'react-bootstrap'
import PlayerListItem from './PlayerListItem'



const PlayerList = ({players, playerDetailsSelectHandler, action, variant, selectedPlayer, paginated=true}) => {

    //todo - refactor into usePagination
    const [currentPageNum, setPageNum] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [filteredPlayers, setFilteredPlayers] = useState(players)
    
    const increasePageHandler = () =>{
        setPageNum(prevNum => prevNum + 1)
    }
    const decreasePageHandler = () => {
        setPageNum(prevNum => prevNum - 1)
    }


    useEffect(()=>{
        const playersOnPage = players.filter((player, index) => index < (currentPageNum * itemsPerPage) && index >= (currentPageNum-1) * 10)
        setFilteredPlayers(playersOnPage)
    },[currentPageNum,itemsPerPage,players])

    

    return (
        <>
        {paginated &&
            <Pagination className='d-flex justify-content-center my-2'>
                {currentPageNum > 1 && <Pagination.Prev onClick={decreasePageHandler} />}
                <Pagination.Item active>{currentPageNum}</Pagination.Item>
                {players.length > currentPageNum * 10 && <Pagination.Next onClick={increasePageHandler}></Pagination.Next>}
            </Pagination>
        }
        <ListGroup variant={variant}>
            {filteredPlayers && 
                filteredPlayers.map(player => { 
                    const isActive = selectedPlayer && selectedPlayer._id === player._id;

                    return (
                        <PlayerListItem key={player._id} 
                            player={player} 
                            playerDetailsSelectHandler={playerDetailsSelectHandler}
                            action={action}
                            active={isActive}
                            
                        >

                        </PlayerListItem>
                    )
                })
            }
        </ListGroup>
        </>
    )
}

export default PlayerList
