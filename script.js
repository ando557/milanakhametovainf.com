document.addEventListener('DOMContentLoaded', () => {
    // --- INITIALIZATIONS ---
    AOS.init({ once: true, duration: 800 });
    feather.replace();

    VANTA.GLOBE({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xff69b4,
        color2: 0x9370db,
        backgroundColor: 0xffffff,
        size: 0.8
    });

    // --- PHOTO FRAMES ---
    const photoContainer = document.getElementById('photo-frames-container');
    const photos = [
        'images/photo1.jpg',
        'images/photo2.jpg',
        'images/photo3.jpg',
        'images/photo4.webp',
        'images/photo5.jpg'
    ];

    photos.forEach(photoSrc => {
        const frame = document.createElement('div');
        frame.className = 'photo-frame';
        const img = document.createElement('img');
        img.src = photoSrc;
        frame.appendChild(img);
        photoContainer.appendChild(frame);

        gsap.set(frame, {
            x: `${Math.random() * window.innerWidth}px`,
            y: `${Math.random() * window.innerHeight}px`,
            width: '150px',
            height: '225px',
            rotation: Math.random() * 40 - 20
        });

        gsap.to(frame, {
            x: `random(-100, ${window.innerWidth - 100})`,
            y: `random(-100, ${window.innerHeight - 100})`,
            rotation: 'random(-30, 30)',
            duration: 'random(20, 40)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });

    // --- MOBILE MENU ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('#nav-links a, #mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    // --- MUSIC PLAYER LOGIC ---
    const audio = document.getElementById('audio-player');
    const playerCover = document.getElementById('player-cover');
    const playerTitle = document.getElementById('player-title');
    const playerArtist = document.getElementById('player-artist');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');
    const trackListContainer = document.getElementById('track-list');


    // --- VOLUME CONTROL ---
const volumeSlider = document.getElementById('volume-slider');
const volumeUpBtn = document.getElementById('volume-up');
const volumeDownBtn = document.getElementById('volume-down');

// Установка громкости по ползунку
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// Кнопка "убавить"
volumeDownBtn.addEventListener('click', () => {
    let newVolume = Math.max(0, audio.volume - 0.1);
    audio.volume = newVolume;
    volumeSlider.value = newVolume.toFixed(2);
});

// Кнопка "прибавить"
volumeUpBtn.addEventListener('click', () => {
    let newVolume = Math.min(1, audio.volume + 0.1);
    audio.volume = newVolume;
    volumeSlider.value = newVolume.toFixed(2);
});





    const songs = [
        {
            name: "ЛП",
            artist: "Милана Хаметова & Milana STAR ",
            cover: "images/lp.jpg",
            path: "music/lp.mp3    ",
            duration: "2:13"
        },

        {
            name: "Умка",
            artist: "Милана Хаметова",
            cover: "images/umka.jpg",
            path: "music/umka.mp3",
            duration: "2:13"
        },



        {
            name: "С денм рождения",
            artist: "Милана Хаметова",
            cover: "images/dr.jpg",
            path: "music/dr.mp3",
            duration: "2:50"
        },
        {
            name: "Воздушный поцелуй",
            artist: "Милана Хаметова",
            cover: "images/poceluy.jpg",
            path: "music/poceluy.mp3",
            duration: "2:25"
        },

        {
            name: "Шаг в перёд",
            artist: "Милана Хаметова",
            cover: "images/shag.jpg",
            path: "music/shagvpered.mp3",
            duration: "2:25"
        },

        {
            name: "Я и моя тень",
            artist: "Милана Хаметова",
            cover: "images/teny.jpg",
            path: "music/yaiteny.mp3",
            duration: "2:25"
        },
        

    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    function generateTrackList() {
        trackListContainer.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
        songs.forEach((song, index) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'music-card bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer';
            trackElement.dataset.index = index;
            trackElement.innerHTML = `
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src="${song.cover}" alt="${song.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-medium text-gray-900 truncate">${song.name}</h4>
                        <p class="text-sm text-gray-600 truncate">${song.artist}</p>
                    </div>
                    <span class="text-sm text-gray-500">${song.duration}</span>
                </div>`;
            grid.appendChild(trackElement);
        });
        trackListContainer.appendChild(grid);
    }

    function loadSong(song) {
        playerTitle.textContent = song.name;
        playerArtist.textContent = song.artist;
        playerCover.src = song.cover;
        audio.src = song.path;
        updateActiveTrack();
    }

    function updateActiveTrack() {
        document.querySelectorAll('.music-card').forEach((card, index) => {
            card.classList.toggle('active', index === currentSongIndex);
        });
    }

    function playSong() {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i data-feather="pause"></i>';
        feather.replace();
        audio.play();
    }

    function pauseSong() {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i data-feather="play"></i>';
        feather.replace();
        audio.pause();
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        if (duration) {
            progressBar.style.width = `${(currentTime / duration) * 100}%`;
            totalDurationEl.textContent = formatTime(duration);
        }
        currentTimeEl.textContent = formatTime(currentTime);
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        if (duration) audio.currentTime = (clickX / width) * duration;
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    playPauseBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', nextSong);
    progressContainer.addEventListener('click', setProgress);

    trackListContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.music-card');
        if (card) {
            const index = parseInt(card.dataset.index, 10);
            if (index !== currentSongIndex) {
                currentSongIndex = index;
                loadSong(songs[currentSongIndex]);
            }
            isPlaying ? pauseSong() : playSong();
        }
    });

    generateTrackList();
    loadSong(songs[currentSongIndex]);
});