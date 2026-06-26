// Sound utilities using Web Audio API
// No external files needed - all sounds generated in real-time

let audioContext = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

export function playClickSound() {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.frequency.value = 400
    osc.type = 'sine'
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.1)
  } catch (e) {
    console.log('Audio not available')
  }
}

export function playSuccessSound() {
  try {
    const ctx = getAudioContext()
    const notes = [523.25, 659.25, 783.99] // C5, E5, G5
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.frequency.value = freq
      osc.type = 'sine'
      
      const startTime = ctx.currentTime + index * 0.08
      gain.gain.setValueAtTime(0.1, startTime)
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15)
      
      osc.start(startTime)
      osc.stop(startTime + 0.15)
    })
  } catch (e) {
    console.log('Audio not available')
  }
}

export function playChoiceSound() {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.frequency.setValueAtTime(600, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15)
    osc.type = 'sine'
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  } catch (e) {
    console.log('Audio not available')
  }
}

export function playStatChangeSound() {
  try {
    const ctx = getAudioContext()
    
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.frequency.setValueAtTime(440, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.1)
    osc.type = 'triangle'
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.1)
  } catch (e) {
    console.log('Audio not available')
  }
}

export function playGameOverSound() {
  try {
    const ctx = getAudioContext()
    const notes = [392, 349.23, 293.66, 261.63] // G, F, D, C (descending)
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.frequency.value = freq
      osc.type = 'sine'
      
      const startTime = ctx.currentTime + index * 0.1
      gain.gain.setValueAtTime(0.1, startTime)
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25)
      
      osc.start(startTime)
      osc.stop(startTime + 0.25)
    })
  } catch (e) {
    console.log('Audio not available')
  }
}

export function playHoverSound() {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.frequency.value = 350
    osc.type = 'sine'
    
    gain.gain.setValueAtTime(0.03, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.05)
  } catch (e) {
    console.log('Audio not available')
  }
}
