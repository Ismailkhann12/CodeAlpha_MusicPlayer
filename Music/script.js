 const playlist = [
    { title: "Song 1", artist: "Artist A", src: "_Main_Hoon_Hero_Tera__VIDEO_Song_-_Salman_Khan___Amaal_Mallik___Hero___T-Series(128k).mp3" },
    { title: "Song 2", artist: "Artist B", src: "Ajeeba ghunta Qanun De Sta Da Kali.mp3" },
    { title: "Song 3", artist: "Artist C", src: "Chodd_Diya-_LYRICS____Arijit_Singh(128k).mp3" },
    { title: "Song 4", artist: "Artist D", src: "Atif_Aslam_Mashup_Full_Song_Video___DJ_Chetas___Bollywood_Love_Songs(128k).mp3" }
  ];

  let currentSong = 0;
  const audio = document.getElementById('audio');
  const title = document.getElementById('title');
  const artist = document.getElementById('artist');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const progress = document.getElementById('progress');
  const durationEl = document.getElementById('duration');
  const volume = document.getElementById('volume');
  const playlistEl = document.getElementById('playlist');

  function loadSong(index) {
    const song = playlist[index];
    audio.src = song.src;
    title.textContent = song.title;
    artist.textContent = song.artist;
  }

  function playSong() {
    audio.play();
    playBtn.textContent = '⏸';
  }

  function pauseSong() {
    audio.pause();
    playBtn.textContent = '▶';
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      playSong();
    } else {
      pauseSong();
    }
  });

  nextBtn.addEventListener('click', () => {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    playSong();
  });

  prevBtn.addEventListener('click', () => {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    playSong();
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;
      durationEl.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
    }
  });

  progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  volume.addEventListener('input', () => {
    audio.volume = volume.value;
  });

  audio.addEventListener('ended', () => {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    playSong();
  });

  function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  // Load playlist items
  playlist.forEach((song, index) => {
    const item = document.createElement('div');
    item.textContent = song.title + " - " + song.artist;
    item.className = 'playlist-item';
    item.addEventListener('click', () => {
      currentSong = index;
      loadSong(currentSong);
      playSong();
    });
    playlistEl.appendChild(item);
  });

  // Initial load
  loadSong(currentSong);
