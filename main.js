document.addEventListener('DOMContentLoaded', () => {
  const tracks = [
    { id: 'binaural-beat', name: 'Binaural Beat', file: 'audio/binaural-beat.mp3' },
    { id: 'deep-sleep', name: 'Deep Sleep', file: 'audio/deep-sleep.mp3' },
    { id: 'dreamer', name: 'Dreamer', file: 'audio/dreamer.mp3' },
    { id: 'heaven-water', name: 'Heaven Water', file: 'audio/heaven-water.mp3' },
    { id: 'morning-relax', name: 'Morning Relax', file: 'audio/morning-relax.mp3' },
    { id: 'om-chanting', name: 'Om Chanting', file: 'audio/om-chanting.mp3' },
    { id: 'peaceful', name: 'Peaceful', file: 'audio/peaceful.mp3' },
    { id: 'sleep', name: 'Sleep', file: 'audio/sleep.mp3' }
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

