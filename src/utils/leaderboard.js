const STORAGE_KEY = 'robin-padilla-leaderboard'
const NAME_KEY = 'robin-padilla-player-name'
const MAX_ENTRIES = 5

export function readLeaderboard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveLeaderboardEntry(entry) {
  const current = readLeaderboard()
  const updated = [...current, entry]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_ENTRIES)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export function readPlayerName() {
  try {
    const saved = localStorage.getItem(NAME_KEY)
    return saved || 'Player'
  } catch {
    return 'Player'
  }
}

export function savePlayerName(name) {
  try {
    localStorage.setItem(NAME_KEY, name.trim() || 'Player')
  } catch {
    // ignore
  }
}
