import React from 'react'
import { playClickSound } from '../utils/sounds'

export default function StartButton({ onStart }){
  const handleClick = () => {
    playClickSound()
    onStart()
  }

  return (
    <div className="center">
      <button type="button" className="start-button" onClick={handleClick}>Start</button>
    </div>
  )
}
