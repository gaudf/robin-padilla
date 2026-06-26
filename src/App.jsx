import React, { useState } from 'react'
import Home from './pages/Home'
import Game from './pages/Game'
import GameOverPage from './pages/GameOver'
import { readLeaderboard, saveLeaderboardEntry, readPlayerName, savePlayerName } from './utils/leaderboard'

export default function App() {
  const [gameState, setGameState] = useState('home')
  const [playerName, setPlayerName] = useState(() => readPlayerName() || 'Player')
  const [score, setScore] = useState(0)
  const [finalStats, setFinalStats] = useState({ popularity: 50, trust: 50, influence: 50, momentum: 50 })
  const [endedEarly, setEndedEarly] = useState(false)
  const [leaderboard, setLeaderboard] = useState(() => readLeaderboard())

  function handleNameChange(name) {
    const normalized = name.trim() || 'Player'
    setPlayerName(normalized)
    savePlayerName(normalized)
  }

  function handleStart(name) {
    handleNameChange(name)
    setScore(0)
    setFinalStats({ popularity: 50, trust: 50, influence: 50, momentum: 50 })
    setEndedEarly(false)
    setGameState('game')
  }

  function handleGameOver(outcome) {
    const totalScore = Math.round((outcome.popularity + outcome.trust + outcome.influence + outcome.momentum) / 4)
    const newEntry = {
      name: playerName,
      score: totalScore,
      date: new Date().toLocaleDateString(),
      endedEarly: Boolean(outcome.endedEarly)
    }
    const updated = saveLeaderboardEntry(newEntry)
    setLeaderboard(updated)
    setScore(totalScore)
    setFinalStats(outcome)
    setEndedEarly(Boolean(outcome.endedEarly))
    setGameState('gameover')
  }

  function handleRestart() {
    setScore(0)
    setFinalStats({ popularity: 50, trust: 50, influence: 50, momentum: 50 })
    setEndedEarly(false)
    setGameState('home')
  }

  return (
    <div className="app-root">
      {gameState === 'home' && (
        <Home
          onStart={handleStart}
          leaderboard={leaderboard}
          playerName={playerName}
          onNameChange={handleNameChange}
        />
      )}

      {gameState === 'game' && (
        <Game onGameOver={handleGameOver} playerName={playerName} />
      )}

      {gameState === 'gameover' && (
        <GameOverPage
          playerName={playerName}
          score={score}
          stats={finalStats}
          endedEarly={endedEarly}
          leaderboard={leaderboard}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
