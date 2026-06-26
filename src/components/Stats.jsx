import React from 'react'

export default function Stats({ stats = { popularity: 0, trust: 0, influence: 0, momentum: 0 } }){
  return (
    <div className="stats-display">
      <div className="stat-bar">
        <div className="stat-label">Popularity</div>
        <div className="stat-meter">
          <div className="stat-fill popularity" style={{width: `${stats.popularity}%`}}></div>
        </div>
        <div className="stat-value">{stats.popularity}</div>
      </div>
      <div className="stat-bar">
        <div className="stat-label">Trust</div>
        <div className="stat-meter">
          <div className="stat-fill trust" style={{width: `${stats.trust}%`}}></div>
        </div>
        <div className="stat-value">{stats.trust}</div>
      </div>
      <div className="stat-bar">
        <div className="stat-label">Influence</div>
        <div className="stat-meter">
          <div className="stat-fill influence" style={{width: `${stats.influence}%`}}></div>
        </div>
        <div className="stat-value">{stats.influence}</div>
      </div>
      <div className="stat-bar">
        <div className="stat-label">Momentum</div>
        <div className="stat-meter">
          <div className="stat-fill momentum" style={{width: `${stats.momentum}%`}}></div>
        </div>
        <div className="stat-value">{stats.momentum}</div>
      </div>
    </div>
  )
}
