let players = [];
let currentTurn = 0;
let timer;
let currentStream;
let targetColor;
let useFrontCamera = true;

document.getElementById('player-setup').addEventListener('submit', (e) => {
    e.preventDefault();
    setupPlayers();
});

document.getElementById('take-photo').addEventListener('click', takePhoto);
document.getElementById('play-again').addEventListener('click', () => {
    location.reload();
});

document.getElementById('switch-camera').addEventListener('click', () => {
    useFrontCamera = !useFrontCamera;
    getMedia();
});

document.getElementById('next-turn-button').addEventListener('click', () => {
    document.getElementById('countdown').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    nextTurn();
});

function setupPlayers() {
    const numPlayers = document.getElementById('num-players').value;
    players = Array.from({ length: numPlayers }, () => ({
        name: generateRandomName(),
        photoColor: null
    }));
    startGame();
}

function startGame() {
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    targetColor = getRandomColor(); 
    document.getElementById('target-color').style.backgroundColor = targetColor;
    showNextPlayer();
}

function showNextPlayer() {
    if (currentTurn >= players.length) {
        endGame();
        return;
    }

    document.getElementById('countdown').style.display = 'flex';
    document.getElementById('game').style.display = 'none';
    document.getElementById('player-name').textContent = players[currentTurn].name;
}

async function nextTurn() {
    document.getElementById('timer').textContent = '10';
    startTimer();
    await getMedia();
}

async function getMedia() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }
    const constraints = {
        video: {
            facingMode: useFrontCamera ? 'user' : 'environment'
        }
    };
    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    const video = document.getElementById('video');
    video.srcObject = currentStream;
}

function startTimer() {
    let timeLeft = 10;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            takePhoto();
        }
    }, 1000);
}

function takePhoto() {
    clearInterval(timer);
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const width = canvas.width = video.videoWidth;
    const height = canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, width, height);

    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;
    const dominantColor = getAverageColor(data);
    players[currentTurn].photoColor = dominantColor;

    currentTurn++;
    showNextPlayer();
}

function getAverageColor(data) {
    let r = 0, g = 0, b = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
    }
    r = Math.floor(r / count);
    g = Math.floor(g / count);
    b = Math.floor(b / count);
    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomName() {
    const adjectives = ["Drôle", "Rapide", "Lumineux", "Énergique", "Curieux"];
    const animals = ["Chat", "Chien", "Loutre", "Lynx", "Panda"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${adjective} ${animal}`;
}

function endGame() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('result').style.display = 'flex';

    players.forEach(player => {
        player.distance = colorDistance(targetColor, player.photoColor);
        player.percentage = ((1 - player.distance / 441.67) * 100).toFixed(2);
    });

    players.sort((a, b) => b.percentage - a.percentage);

    const rankingDiv = document.getElementById('ranking');
    rankingDiv.innerHTML = '';
    players.forEach((player, index) => {
        const playerResult = document.createElement('div');
        playerResult.classList.add('player-result');
        playerResult.innerHTML = `<span class="rank">${index + 1}.</span> <span class="name">${player.name}</span>: <span class="percentage">${player.percentage}%</span>`;
        rankingDiv.appendChild(playerResult);
    });
}

function colorDistance(color1, color2) {
    if (!color1 || !color2) {
        return Infinity;
    }

    const rgb1 = color1.match(/\d+/g).map(Number);
    const rgb2 = color2.match(/\d+/g).map(Number);

    return Math.sqrt(
        (rgb1[0] - rgb2[0]) ** 2 +
        (rgb1[1] - rgb2[1]) ** 2 +
        (rgb1[2] - rgb2[2]) ** 2
    );
}
