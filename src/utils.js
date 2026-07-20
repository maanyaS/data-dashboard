// Turns a unix timestamp (seconds) into a readable time like "06:16 AM"
export function formatTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
