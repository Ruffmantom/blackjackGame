import React, { useEffect, useState } from 'react'
import { cards } from '../data/cards'
import GameHeader from './GameHeader'
import GameFooter from './GameFooter'

export default function BlackJack() {
    // console.log(cards)
    const [playableCards, setPlayableCards] = useState([])
    const [burnedCards, setBurnedCards] = useState([])
    // user cards
    const [dealersCards, setDealersCards] = useState([])
    const [usersCards, setUsersCards] = useState([])
    const [runningCount, setRunningCount] = useState(0)

    const shuffleDecks = (e) => {
        if (e) {
            e.preventDefault()
        }
        // init full deck
        let fullDeck = []

        // full deck has 8 sets of 52 cards
        for (var i = 0; i <= 7; i++) {
            cards.map(card => fullDeck.push(card))
        }

        // shuffle
        for (let i = fullDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [fullDeck[i], fullDeck[j]] = [fullDeck[j], fullDeck[i]];
        }

        // another shuffle
        fullDeck.sort(() => Math.random() - 0.5);
        console.log(fullDeck)
        setPlayableCards(fullDeck)
        // burn first card after shuffle
        
    }

    const burnCard =  () => {
        let updatedSet = playableCards
        updatedSet.shift()
         console.log(updatedSet)
        setPlayableCards(updatedSet)
    }

    const dealInitialCards = (e) => {
        e.preventDefault()
        // deal 







        let count = runningCount
        let playersSet = []
        let dealersSet = []
        console.log("Starting count: ", count)
        console.log("Setting Players Hand ", playableCards[count])
        playersSet.push(playableCards[count])
        count++
        console.log("Starting count: ", playableCards[count])
        dealersSet.push(playableCards[count])
        count++
        console.log("Setting Players Hand ", playableCards[count])
        playersSet.push(playableCards[count])
        count++
        console.log("Starting count: ", playableCards[count])
        dealersSet.push(playableCards[count])
        setRunningCount(count)
        console.log("Dealers Hand: ", dealersSet)
        console.log("Players Hand: ", playersSet)
        setDealersCards(dealersSet)
        setUsersCards(playersSet)
    }

    const handleHit = (e) => {
        e.preventDefault()
        console.log(runningCount)
        let playersCards = usersCards
        let count = runningCount

        count++
        playersCards.push(playableCards[count])

        setUsersCards(playersCards)
    }

    const handleStay = (e) => {
        // goal is to take eight decks of cards and shuffle them
        e.preventDefault()
    }

    useEffect(() => {
        shuffleDecks()
        burnCard()

    }, [shuffleDecks,burnCard])

    return (
        <div className='game_container'>

                <GameHeader/>

                <div className="playable_area">
                    <p>Playable area</p>
                </div>

                <GameFooter/>

        </div>
    )
}
