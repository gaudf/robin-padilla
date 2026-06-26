import React from 'react'
import GameOver from '../components/GameOver'
import Leaderboard from '../components/Leaderboard'

export default function GameOverPage({ playerName, score, stats, endedEarly, leaderboard, onRestart }){
  return (
    <div className="card">
      <GameOver playerName={playerName} score={score} stats={stats} endedEarly={endedEarly} onRestart={onRestart} />
      <Leaderboard entries={leaderboard} highlightScore={score} />
    </div>
  )
}
