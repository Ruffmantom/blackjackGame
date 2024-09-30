import React from 'react'
import { useGameStore } from '../stores/GameContext'

export default function GameFooter() {
  const { startGame } = useGameStore()


  const handleBet = (e) => {
    e.preventDefault()
    startGame()
  }

  return (
    <div className='game_footer'>
      <button onClick={e => handleBet(e)} className='btn_primary'>
        Bet
      </button>
    </div>
  )
}
