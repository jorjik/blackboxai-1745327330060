document.addEventListener('DOMContentLoaded', () => {
  const tracks = [
    { id: 'track1', name: 'Track 1', file: 'audio/track1.mp3' },
    { id: 'track2', name: 'Track 2', file: 'audio/track2.mp3' },
    { id: 'track3', name: 'Track 3', file: 'audio/track3.mp3' },
  ];

  const trackList = document.getElementById('track-list');

  tracks.forEach(track => {
    const btn = document.createElement('button');
    btn.textContent = track.name;
    btn.className = 'bg-blue-600 hover:bg-blue-700 rounded-md py-3 text-lg font-semibold transition-colors';
    btn.addEventListener('click', () => {
      // Navigate to player.html with track id as query param
      window.location.href = `player.html?track=${track.id}`;
    });
    trackList.appendChild(btn);
  });
});
