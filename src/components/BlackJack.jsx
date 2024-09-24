import React, { useEffect, useState } from 'react'
import { cards } from '../data/cards'

export default function BlackJack() {
    // console.log(cards)
    const [playableCards, setPlayableCards] = useState([])
    const [dealersCards, setDealersCards] = useState([])
    const [usersCards, setUsersCards] = useState([])
    const [runningCount, setRunningCount] = useState(0)

    const shuffleDecks = async (e) => {

        if (e) {
            e.preventDefault()
        }

        let a = []
        // goal is to take eight decks of cards and shuffle them
        // the cards data is one deck of cards
        for (var i = 0; i <= 7; i++) {
            cards.map(card => a.push(card))
        }
        // now shuffle
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        // another method
        // a.sort(() => Math.random() - 0.5);
        await setPlayableCards(a)
        console.log(a)
    }

    const burnFirstCard = () => {
        let updatedSet = playableCards
        updatedSet.shift()
        setPlayableCards(updatedSet)
    }

    const dealInitialCards = (e) => {
        e.preventDefault()
        burnFirstCard()
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



    return (
        <div>
            current Card Count {playableCards.length}
            <button onClick={e => shuffleDecks(e)}>Shuffle</button>
            <button onClick={e => dealInitialCards(e)}>Bet</button>
            <button onClick={e => handleHit(e)}>Hit</button>
            <button onClick={e => handleStay(e)}>Stay</button>
            <button onClick={e => {
                e.preventDefault()
                console.log(`Status, UserCards:`, usersCards)
            }}>Show current Values</button>

            <p>Dealers Cards, {dealersCards && dealersCards.map(c => (<span key={c._id}>{c.name}{dealersCards.length > 1 ? "," : ""}</span>))}</p>
            <p>Players Cards, {usersCards && usersCards.map(c => (<span key={c._id}>{c.name}{usersCards.length > 1 ? "," : ""}</span>))}</p>
        </div>
    )
}
