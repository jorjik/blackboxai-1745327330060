document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const trackId = urlParams.get('track');

  const tracks = {
    track1: { name: 'Track 1', file: 'audio/track1.mp3' },
    track2: { name: 'Track 2', file: 'audio/track2.mp3' },
    track3: { name: 'Track 3', file: 'audio/track3.mp3' },
  };

  const track = tracks[trackId];
  const audioPlayer = document.getElementById('audio-player');
  const trackTitle = document.getElementById('track-title');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const timerBtn = document.getElementById('timer-btn');
  const timerPopup = document.getElementById('timer-popup');
  const timerRemaining = document.getElementById('timer-remaining');
  const timerCancel = document.getElementById('timer-cancel');
  const timerOptions = document.querySelectorAll('.timer-option');

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
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
    updatePlayPauseIcon();
  });

  // Timer popup show/hide
  timerBtn.addEventListener('click', () => {
    timerPopup.classList.remove('hidden');
  });

  timerCancel.addEventListener('click', () => {
    timerPopup.classList.add('hidden');
  });

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
      timerRemaining.textContent = 'Timer ended';
      return;
    }
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    timerRemaining.textContent = `Time left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  timerOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const minutes = parseInt(btn.getAttribute('data-minutes'), 10);
      clearTimer();
      timerEndTime = Date.now() + minutes * 60000;
      timerId = setTimeout(() => {
        audioPlayer.pause();
        timerRemaining.textContent = 'Timer ended';
      }, minutes * 60000);
      timerInterval = setInterval(updateRemainingTime, 1000);
      updateRemainingTime();
      timerPopup.classList.add('hidden');
    });
  });
});
