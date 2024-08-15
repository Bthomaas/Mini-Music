const songsList = [
    {
        name: "We Don't Trust You",
        artist: "Future, Metro Boomin",
        src: "Music/We Don't Trust You.mp3",
        cover: "https://loudcave.es/wp-content/uploads/image-67.png"
    },
    {
        name: "Creepin",
        artist: "Metro Boomin",
        src: "Music/Creepin.mp3",
        cover: "https://ih1.redbubble.net/image.4534734018.6732/flat,750x1000,075,t.jpg"
    },
    {
        name: "STARGAZING ",
        artist: "Travis Scott",
        src: "Music/STARGAZING.mp3",
        cover: "https://images.genius.com/4640c40bd4cec077ba11e54347624ac7.1000x563x1.jpg"
    },
    {
        name: "Home ",
        artist: "Metro Boomin, Don Toliver",
        src: "Music/Home.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b2736ed9aef791159496b286179f"
    }
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillbar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio ();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', ()=>{
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});


function loadSong(Index) {
    const {name, artist, src, cover: thumb} = songsList [Index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress(){
    if(song.duration){
        const pos = (song.currentTime / song.duration) * 100;
        fillbar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;

    }
}

function formatTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause(){
    if(playing){
        song.pause();
    }else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong(){
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong(){
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic(){
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e){
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}

const expand_btn = document.querySelector(".expand-btn");

let activeIndex;

expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
});

const current = window.location.href;

const allLinks = document.querySelectorAll(".sidebar-links a");

allLinks.forEach((elem) => {
  elem.addEventListener("click", function () {
    const hrefLinkClick = elem.href;

    allLinks.forEach((link) => {
      if (link.href == hrefLinkClick) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
});

const searchInput = document.querySelector(".search__wrapper input");

searchInput.addEventListener("focus", (e) => {
  document.body.classList.remove("collapsed");
});

