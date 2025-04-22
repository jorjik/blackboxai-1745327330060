document.addEventListener('DOMContentLoaded', () => {
  console.log('Player script loaded');
  const urlParams = new URLSearchParams(window.location.search);
  const trackId = urlParams.get('track');

  const tracks = {
    'binaural-beat': { name: 'Binaural Beat', file: 'audio/binaural-beat.mp3' },
    'deep-sleep': { name: 'Deep Sleep', file: 'audio/deep-sleep.mp3' },
    'dreamer': { name: 'Dreamer', file: 'audio/dreamer.mp3' },
    'heaven-water': { name: 'Heaven Water', file: 'audio/heaven-water.mp3' },
    'morning-relax': { name: 'Morning Relax', file: 'audio/morning-relax.mp3' },
    'om-chanting': { name: 'Om Chanting', file: 'audio/om-chanting.mp3' },
    'peaceful': { name: 'Peaceful', file: 'audio/peaceful.mp3' },
    'sleep': { name: 'Sleep', file: 'audio/sleep.mp3' }
  };

  const track = tracks[trackId];
  const audioPlayer = document.getElementById('audio-player');
  const trackTitle = document.getElementById('track-title');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const timerModal = document.getElementById('timer-modal');
  const timerRemaining = document.getElementById('timer-remaining');
  const timerOptions = document.querySelectorAll('.timer-option');

  console.log('Player elements found:', {
    audioPlayer: !!audioPlayer,
    trackTitle: !!trackTitle,
    playPauseBtn: !!playPauseBtn,
    timerModal: !!timerModal,
    timerOptions: timerOptions.length
  });

  let timerId = null;
  let timerEndTime = null;
  let timerInterval = null;

  if (!track) {
    trackTitle.textContent = 'Track not found';
    return;
  }

  trackTitle.textContent = track.name;
  audioPlayer.src = track.file;
  audioPlayer.loop = true;

  function updatePlayPauseIcon() {
    if (audioPlayer.paused) {
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
  }

  playPauseBtn.addEventListener('click', () => {
    console.log('Play/Pause clicked');
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
    updatePlayPauseIcon();
  });

  // Back button stops playback and navigates back
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      console.log('Back button clicked');
      audioPlayer.pause();
      updatePlayPauseIcon();
      window.location.href = 'index.html';
    });
  } else {
    console.error('Back button not found');
  }

  function clearTimer() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    timerRemaining.textContent = '';
    timerEndTime = null;
  }

  function updateRemainingTime() {
    if (!timerEndTime) return;
    const now = Date.now();
    const diff = timerEndTime - now;
    if (diff <= 0) {
      clearTimer();
      audioPlayer.pause();
      updatePlayPauseIcon();
      timerRemaining.textContent = 'Timer ended';
      return;
    }
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    timerRemaining.textContent = `Time left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  timerOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Timer option clicked:', btn.dataset.minutes);
      const minutes = parseInt(btn.dataset.minutes, 10);
      clearTimer();
      timerEndTime = Date.now() + minutes * 60000;
      timerId = setTimeout(() => {
        audioPlayer.pause();
        updatePlayPauseIcon();
        timerRemaining.textContent = 'Timer ended';
      }, minutes * 60000);
      timerInterval = setInterval(updateRemainingTime, 1000);
      updateRemainingTime();
      timerModal.style.display = 'none';
    });
  });

  console.log('Player initialized');
});
