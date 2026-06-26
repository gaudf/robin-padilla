import React, { useEffect } from 'react'
import { playGameOverSound, playSuccessSound } from '../utils/sounds'

export default function GameOver({ playerName, score, stats, endedEarly, onRestart }){
  useEffect(() => {
    if (endedEarly) {
      playGameOverSound()
    } else if (score >= 70) {
      playSuccessSound()
    } else {
      playGameOverSound()
    }
  }, [score, endedEarly])

  const getAchievement = (score, endedEarly) => {
    if (endedEarly) return { title: '🔥 Fallen Politician', desc: 'Your campaign collapsed under pressure.' }
    if (score >= 90) return { title: '🏆 Political Legend', desc: 'Mastered the art of politics!' }
    if (score >= 75) return { title: '⭐ Rising Star', desc: 'Impressive political career!' }
    if (score >= 55) return { title: '📊 Politician', desc: 'A solid political career.' }
    return { title: '🎯 Newcomer', desc: 'Your political journey begins.' }
  }

  const achievement = getAchievement(score, endedEarly)
  const endingMessage = endedEarly
    ? `${playerName || 'Player'}, a key pillar collapsed early. Learn from the choices and build a stronger campaign.`
    : `Well played, ${playerName || 'Player'} — you completed the campaign. Reflect on each decision and climb higher.`

  return (
    <div className="gameover-display">
      <div className="final-character" aria-hidden="true">
        <svg viewBox="0 0 100 120" width="120" height="140">
          <circle cx="50" cy="30" r="18" fill="#c9a96e" />
          <circle cx="45" cy="28" r="3" fill="#000" />
          <circle cx="55" cy="28" r="3" fill="#000" />
          <path d="M 45 32 Q 50 35 55 32" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          <rect x="42" y="48" width="16" height="25" fill="#2d5a8c" rx="3" />
          <polygon points="50,50 46,55 54,55" fill="#c41e3a" />
          <rect x="30" y="52" width="12" height="8" fill="#c9a96e" rx="4" />
          <rect x="58" y="52" width="12" height="8" fill="#c9a96e" rx="4" />
          <rect x="44" y="73" width="5" height="20" fill="#1a1a1a" />
          <rect x="51" y="73" width="5" height="20" fill="#1a1a1a" />
          <rect x="43" y="93" width="6" height="4" fill="#000" />
          <rect x="51" y="93" width="6" height="4" fill="#000" />
        </svg>
      </div>
      <div className="gameover-content">
        <h2>{playerName || 'Player'}'s Campaign</h2>
        <p className="gameover-summary">{endingMessage}</p>
        <div className="achievement">
          <div className="achievement-title">{achievement.title}</div>
          <div className="achievement-desc">{achievement.desc}</div>
        </div>
        <div className="final-stats gameover-stats">
          <div className="stat-block">
            <div className="stat-label">Popularity</div>
            <div className="stat-value">{stats.popularity}</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Trust</div>
            <div className="stat-value">{stats.trust}</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Influence</div>
            <div className="stat-value">{stats.influence}</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Momentum</div>
            <div className="stat-value">{stats.momentum ?? 0}</div>
          </div>
        </div>
        <div className="final-stats">
          <div className="final-score">{playerName || 'Player'}'s Final Score: {score}</div>
        </div>
        <button className="restart-button" onClick={onRestart}>Play Again</button>
      </div>
    </div>
  )
}
