import React from 'react'

export default function EventBox({ event }){
  return (
    <div className="event-box">
      <div>{event?.text || 'Event loading...'}</div>
    </div>
  )
}
