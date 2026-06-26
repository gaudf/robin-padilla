import React, { useState } from 'react'
import Stats from '../components/Stats'
import EventBox from '../components/EventBox'
import ChoiceButtons from '../components/ChoiceButtons'
import { playStatChangeSound } from '../utils/sounds'

const EVENTS_POOL = [
  {
    id: 1,
    text: 'A scandal emerges. How do you respond?',
    choices: ['Deny Everything', 'Admit and Apologize'],
    effects: [
      { popularity: -15, trust: -20, influence: 10, momentum: -20 },
      { popularity: 10, trust: 25, influence: -5, momentum: 10 }
    ],
    outcomes: [
      'You keep eyes on you but lose credibility.',
      'You may lose some momentum, but earn public trust.'
    ]
  },
  {
    id: 2,
    text: 'The media wants an exclusive interview. What do you do?',
    choices: ['Grant the Interview', 'Decline Politely'],
    effects: [
      { popularity: 25, trust: 10, influence: 15, momentum: 20 },
      { popularity: -10, trust: 5, influence: 0, momentum: -5 }
    ],
    outcomes: [
      'You take the spotlight and build momentum.',
      'You avoid potential mistakes, but miss a major boost.'
    ]
  },
  {
    id: 3,
    text: 'A rival politician challenges you publicly. Your move?',
    choices: ['Counter-Attack', 'Take the High Road'],
    effects: [
      { popularity: 15, trust: -10, influence: 25, momentum: 15 },
      { popularity: 5, trust: 30, influence: 10, momentum: 10 }
    ],
    outcomes: [
      'Bold and aggressive, but divisive.',
      'You look steady, principled, and trustworthy.'
    ]
  },
  {
    id: 4,
    text: 'Your approval rating dips. Emergency damage control?',
    choices: ['Launch Ad Campaign', 'Focus on Policy'],
    effects: [
      { popularity: 20, trust: -10, influence: 15, momentum: 10 },
      { popularity: 10, trust: 25, influence: 20, momentum: 10 }
    ],
    outcomes: [
      'Flashy moves grab attention fast.',
      'Substance wins over thoughtful supporters.'
    ]
  },
  {
    id: 5,
    text: 'A campaign donor demands a favor. Do you comply?',
    choices: ['Agree for Support', 'Refuse the Request'],
    effects: [
      { popularity: 10, trust: -25, influence: 25, momentum: 20 },
      { popularity: -5, trust: 30, influence: 5, momentum: -5 }
    ],
    outcomes: [
      'You gain power but risk your values.',
      'You keep integrity and win long-term respect.'
    ]
  },
  {
    id: 6,
    text: 'A community event asks you to speak. Do you go bold or heartfelt?',
    choices: ['Bold Rally Speech', 'Personal Story'],
    effects: [
      { popularity: 20, trust: -5, influence: 20, momentum: 20 },
      { popularity: 10, trust: 25, influence: 10, momentum: 10 }
    ],
    outcomes: [
      'Your presence electrifies the crowd.',
      'The audience connects with your sincerity.'
    ]
  },
  {
    id: 7,
    text: 'A policy alliance is on the table. Do you build a coalition or stay independent?',
    choices: ['Build Coalition', 'Stay Independent'],
    effects: [
      { popularity: 10, trust: 15, influence: 20, momentum: 15 },
      { popularity: 5, trust: 25, influence: 5, momentum: -10 }
    ],
    outcomes: [
      'You secure partners and a broader base.',
      'You remain true to your values but lose momentum.'
    ]
  },
  {
    id: 8,
    text: 'A sudden crisis demands a quick decision. Do you lead from the front or delegate it?',
    choices: ['Lead from the Front', 'Delegate to Experts'],
    effects: [
      { popularity: 25, trust: -10, influence: 30, momentum: 20 },
      { popularity: 10, trust: 25, influence: 15, momentum: 5 }
    ],
    outcomes: [
      'Your leadership shines under pressure.',
      'You stay safe and maintain credibility.'
    ]
  },
  {
    id: 9,
    text: 'A new social media campaign goes viral. Will you join in or stay grounded?',
    choices: ['Go Viral', 'Stay Grounded'],
    effects: [
      { popularity: 20, trust: -15, influence: 25, momentum: 25 },
      { popularity: 10, trust: 20, influence: 10, momentum: 10 }
    ],
    outcomes: [
      'You dominate public attention but risk backlash.',
      'You build steady respect with a calmer message.'
    ]
  },
  {
    id: 10,
    text: 'A major legislative win is in reach. Do you push hard or negotiate slowly?',
    choices: ['Push Hard', 'Negotiate Slowly'],
    effects: [
      { popularity: 15, trust: -10, influence: 30, momentum: 15 },
      { popularity: 10, trust: 20, influence: 20, momentum: 15 }
    ],
    outcomes: [
      'A strong push can yield big rewards or big risks.',
      'Slow negotiation keeps support while building influence.'
    ]
  }
]

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function Game({ onGameOver, playerName }){
  const EVENT_COUNT = 8
  const [eventOrder] = useState(() => shuffle(EVENTS_POOL).slice(0, EVENT_COUNT))
  const [round, setRound] = useState(0)
  const [stats, setStats] = useState({ popularity: 50, trust: 50, influence: 50, momentum: 50 })
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [alert, setAlert] = useState('')
  const [history, setHistory] = useState([])
  const currentEvent = eventOrder[round]
  const progress = eventOrder.length > 1 ? Math.round((round / (eventOrder.length - 1)) * 100) : 0

  function buildFeedback(effect, outcome) {
    const parts = []
    if (effect.popularity !== 0) {
      parts.push(`${effect.popularity > 0 ? '📈' : '📉'} Popularity ${effect.popularity > 0 ? '+' : ''}${effect.popularity}`)
    }
    if (effect.trust !== 0) {
      parts.push(`${effect.trust > 0 ? '💎' : '⚠️'} Trust ${effect.trust > 0 ? '+' : ''}${effect.trust}`)
    }
    if (effect.influence !== 0) {
      parts.push(`${effect.influence > 0 ? '⭐' : '📉'} Influence ${effect.influence > 0 ? '+' : ''}${effect.influence}`)
    }
    if (effect.momentum !== 0) {
      parts.push(`${effect.momentum > 0 ? '⚡' : '🌀'} Momentum ${effect.momentum > 0 ? '+' : ''}${effect.momentum}`)
    }
    return `${parts.join(' · ')}${outcome ? ` — ${outcome}` : ''}`
  }

  function handleChoice(choiceIdx) {
    if (!currentEvent || selectedChoice !== null) return

    setSelectedChoice(choiceIdx)
    const effect = currentEvent.effects[choiceIdx]
    const nextStats = {
      popularity: Math.max(0, Math.min(100, stats.popularity + effect.popularity)),
      trust: Math.max(0, Math.min(100, stats.trust + effect.trust)),
      influence: Math.max(0, Math.min(100, stats.influence + effect.influence)),
      momentum: Math.max(0, Math.min(100, stats.momentum + effect.momentum))
    }

    setStats(nextStats)
    const feedbackMessage = buildFeedback(effect, currentEvent.outcomes?.[choiceIdx])
    setFeedback(feedbackMessage)
    setHistory(prev => [
      ...prev,
      {
        event: currentEvent.text,
        choice: currentEvent.choices[choiceIdx],
        effect,
        message: feedbackMessage
      }
    ])

    const lowStats = []
    if (nextStats.popularity <= 30) lowStats.push('Popularity')
    if (nextStats.trust <= 30) lowStats.push('Trust')
    if (nextStats.influence <= 30) lowStats.push('Influence')
    if (nextStats.momentum <= 30) lowStats.push('Momentum')

    setAlert(
      lowStats.length > 0
        ? `Warning: ${lowStats.join(', ')} ${lowStats.length > 1 ? 'are' : 'is'} low. Make a safer move next.`
        : ''
    )

    playStatChangeSound()

    const endedEarly = nextStats.popularity === 0 || nextStats.trust === 0 || nextStats.influence === 0 || nextStats.momentum === 0
    const finishDelay = endedEarly ? 900 : 700

    if (endedEarly) {
      setTimeout(() => onGameOver?.({ ...nextStats, endedEarly: true }), finishDelay)
      return
    }

    if (round >= eventOrder.length - 1) {
      setTimeout(() => onGameOver?.(nextStats), finishDelay)
    } else {
      setTimeout(() => {
        setRound(r => r + 1)
        setSelectedChoice(null)
        setFeedback('')
        setAlert('')
      }, finishDelay)
    }
  }

  return (
    <div className="game-container">
      <div className="player-banner">
        <span>{playerName || 'Player'}, your campaign path is set.</span>
        <span>Stay sharp through every decision.</span>
      </div>

      <div className="game-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{width: `${progress}%`}} />
        </div>
        <div className="progress-row">
          <span className="progress-text">Event {round + 1}/{eventOrder.length}</span>
          <span className="progress-percent">{progress}% Complete</span>
        </div>
      </div>

      <div className="game-scene">
        <div className="character-sprite">
          <svg viewBox="0 0 100 120" width="100" height="120">
            <circle cx="50" cy="30" r="18" fill="#c9a96e" />
            <circle cx="45" cy="28" r="3" fill="#000" />
            <circle cx="55" cy="28" r="3" fill="#000" />
            <path d="M 45 32 Q 50 34 55 32" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
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

        <div className="game-content">
          <Stats stats={stats} />
          <div className="event-header">
            <span className="event-label">Current Situation</span>
            <span className="event-count">Event {round + 1} of {eventOrder.length}</span>
          </div>
          <EventBox event={currentEvent} />
          {feedback && (
            <div className="feedback-message" role="status" aria-live="polite">
              {feedback}
            </div>
          )}
          {alert && <div className="alert-message">{alert}</div>}
          {history.length > 0 && (
            <div className="decision-recap">
              Last choice: <strong>{history[history.length - 1].choice}</strong>
            </div>
          )}
          <ChoiceButtons
            choices={currentEvent?.choices || []}
            onChoice={handleChoice}
            disabled={selectedChoice !== null}
            selectedIdx={selectedChoice}
          />
        </div>
      </div>
    </div>
  )
}
