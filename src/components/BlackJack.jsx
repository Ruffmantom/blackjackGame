import React, { useEffect, useState } from 'react'
import { cards } from '../data/cards'
import GameHeader from './GameHeader'
import GameFooter from './GameFooter'
import { useGameStore } from '../stores/GameContext'

export default function BlackJack() {
    const {
        playableCards,
        burnedCards,
        playersHand,
        dealersHand,
        shuffleDecks
    } = useGameStore()


    /*
    {
    "name": "eight",
    "suite": "diamonds",
    "values": [
        8
    ],
    "_id": "32",
    "defaultValue": 8,
    "id": "_9btyj8kkq"
}
    */
    const getCurrentScore = (cardsToCount) => {
        let numbers = []
        cardsToCount.forEach(c => {
            if (c.name === "ace") {
                // push 11 first as default
                numbers.push(11)
            } else {
                numbers.push(c.defaultValue)
            }
        })
        let count = numbers.reduce((a, b) => a + b, 0);
        return count
    }

    useEffect(() => {
        // on game load, shuffle the decks
        shuffleDecks()
    }, [shuffleDecks])

    return (
        <div className='game_container'>

            <GameHeader />

            <div className="playable_area">
                <p>Players Cards</p>
                <div className="players_cards_cont">
                    <p>Current Score: {getCurrentScore(playersHand)}</p>
                    {playersHand && playersHand.length >= 1 && playersHand.map((c, i) => (
                        <div key={c.id} className={`playable_card ${i === 1 ? "s_2" : i === 2 ? "s_3" : i === 3 ? "s_4" : i === 4 ? "s_5" : "s_1"}`}>
                            <p className='card_number top'>{c.defaultValue}</p>
                            <p className='card_number bottom'>{c.defaultValue}</p>
                        </div>
                    ))}
                </div>
            </div>

            <GameFooter />

        </div>
    )
}
