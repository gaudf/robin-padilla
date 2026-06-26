import React from 'react'
import { playChoiceSound, playHoverSound } from '../utils/sounds'

export default function ChoiceButtons({ choices = [], onChoice, disabled, selectedIdx }){
  const handleChoice = (idx) => {
    playChoiceSound()
    onChoice?.(idx)
  }

  return (
    <div className="choices-container">
      {choices.map((choice, idx) => (
        <button 
          key={idx} 
          className={`choice-btn ${selectedIdx === idx ? 'selected' : ''} ${disabled && selectedIdx !== idx ? 'disabled' : ''}`}
          onClick={() => !disabled && handleChoice(idx)}
          onMouseEnter={() => !disabled && playHoverSound()}
          disabled={disabled}
          aria-pressed={selectedIdx === idx}
        >
          <span className="choice-text">{choice}</span>
          {selectedIdx === idx && <span className="checkmark">✓</span>}
        </button>
      ))}
    </div>
  )
}
