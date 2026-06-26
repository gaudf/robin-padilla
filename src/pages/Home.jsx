import React, { useState, useEffect } from 'react'
import StartButton from '../components/StartButton'
import Leaderboard from '../components/Leaderboard'

export default function Home({ onStart, leaderboard, playerName, onNameChange }){
  const [transitioning, setTransitioning] = useState(false)
  const [name, setName] = useState(playerName || '')

  useEffect(() => {
    setName(playerName || '')
  }, [playerName])

  function handleStart(){
    if (transitioning) return
    setTransitioning(true)
    const nextName = name.trim() || 'Player'
    onNameChange(nextName)
    setTimeout(() => onStart(nextName), 600)
  }

  return (
    <main className={`office-menu ${transitioning ? 'transitioning' : ''}`} role="main">
      {/* Background - Office View */}
      <div className="menu-background">
        <div className="office-window">
          <div className="window-glass" />
          <div className="city-skyline">
            <div className="skyline-building s1" />
            <div className="skyline-building s2" />
            <div className="skyline-building s3" />
          </div>
        </div>
      </div>

      {/* Desk Area */}
      <div className="menu-desk" role="region" aria-label="Game introduction layout">
        {/* Computer Setup */}
        <div className="menu-computer">
          <div className="menu-monitor">
            <div className="monitor-screen">
              <div className="screen-content">
                <h1>Robin Padilla Simulator</h1>
                <p>Political Strategy Game</p>
              </div>
            </div>
            <div className="monitor-bezel" />
          </div>
          <div className="monitor-base-stand" />
        </div>

        {/* Menu Card */}
        <div className="menu-card-main" role="region" aria-labelledby="game-title">
          <div className="card-top-shine" />
          
          <h1 id="game-title">Robin Padilla Simulator</h1>
          
          <p className="menu-tagline">Navigate politics. Make decisions. Rise to power.</p>
          
          <p className="menu-description">
            Step into the shoes of an ambitious politician. Face scandals, media pressure, and tough choices.
            Manage your popularity, build trust, and increase your influence to reach the top.
          </p>

          <div className="player-name-field">
            <label className="player-name-label" htmlFor="player-name">Campaign Name</label>
            <input
              id="player-name"
              type="text"
              className="player-name-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your campaign name"
              maxLength={18}
              aria-label="Campaign name"
            />
          </div>

          <div className="menu-spacer" />
          
          <StartButton onStart={handleStart} />
          
          <div className="menu-features" aria-label="Game features">
            <div className="feature">
              <span className="feature-icon">📊</span>
              <span>Track 4 Core Stats</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <span>8 Strategic Events</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🏆</span>
              <span>5 Best Scores</span>
            </div>
          </div>
        </div>
        <Leaderboard entries={leaderboard} />

        {/* Desk Items - Left Side */}
        <div className="menu-left-items">
          <div className="item-coffee">
            <div className="coffee-cup-body" />
            <div className="coffee-steam s1" />
            <div className="coffee-steam s2" />
          </div>
          
          <div className="item-notebook">
            <div className="notebook-page" />
            <div className="notebook-lines" />
          </div>
        </div>

        {/* Desk Items - Right Side */}
        <div className="menu-right-items">
          <div className="item-lamp">
            <div className="lamp-head" />
            <div className="lamp-neck" />
            <div className="lamp-base-small" />
            <div className="lamp-glow" />
          </div>
          
          <div className="item-pen-cup">
            <div className="pen-cup-container" />
            <div className="pen pen1" />
            <div className="pen pen2" />
            <div className="pen pen3" />
          </div>
        </div>
      </div>

      {/* Ambient Lighting */}
      <div className="menu-ambient-light" />
      
      {/* Floating Particles */}
      <div className="menu-particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="menu-particle" style={{
            '--particle-left': `${Math.random() * 100}%`,
            '--particle-top': `${Math.random() * 100}%`,
            '--particle-delay': `${i * 0.1}s`,
            '--particle-duration': `${4 + Math.random() * 3}s`
          }} />
        ))}
      </div>
    </main>
  )
}
