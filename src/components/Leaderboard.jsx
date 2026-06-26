import React from 'react'

export default function Leaderboard({ entries = [], highlightScore }){
  return (
    <section className="leaderboard-card" aria-label="Leaderboard">
      <div className="leaderboard-header">
        <h3 className="leaderboard-title">Leaderboard</h3>
        <p className="leaderboard-note">Top 5 campaigns by score.</p>
      </div>
      {entries.length === 0 ? (
        <p className="leaderboard-empty">No recorded scores yet. Complete a campaign to save your best run.</p>
      ) : (
        <ol className="leaderboard-list">
          {entries.map((entry, idx) => (
            <li key={idx} className={`leaderboard-item ${entry.score === highlightScore ? 'highlight' : ''}`}>
              <span className="leaderboard-rank">#{idx + 1}</span>
              <span className="leaderboard-name">{entry.name || 'Player'}</span>
              <span className="leaderboard-score">{entry.score}</span>
              <span className="leaderboard-meta">
                {entry.date}{entry.endedEarly ? ' • Early exit' : ''}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
