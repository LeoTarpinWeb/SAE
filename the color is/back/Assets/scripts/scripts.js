let players = [];
let currentTurn = 0;
let timer;
let currentStream;
let targetColor;

document.getElementById('player-setup').addEventListener('submit', (e) => {
    e.preventDefault();
    setupPlayers();
});

document.getElementById('take-photo').addEventListener('click', takePhoto);
document.getElementById('play-again').addEventListener('click', () => {
    location.reload();
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
    nextTurn();
}

async function nextTurn() {
    if (currentTurn >= players.length) {
        endGame();
        return;
    }

    document.getElementById('player-turn').textContent = `${players[currentTurn].name}, à vous de jouer !`;
    document.getElementById('timer').textContent = '10';
    startTimer();
    await getMedia();
}

async function getMedia() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }
    const constraints = {
        video: true
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
    const dominantColor = getDominantColor(data);
    players[currentTurn].photoColor = dominantColor;

    currentTurn++;
    nextTurn();
}

function getDominantColor(data) {
    const colorCounts = {};
    let maxColorCount = 0;
    let dominantColor = [0, 0, 0];

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const rgb = [r, g, b].join(",");
        colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;

        if (colorCounts[rgb] > maxColorCount) {
            maxColorCount = colorCounts[rgb];
            dominantColor = [r, g, b];
        }
    }
    return `rgb(${dominantColor.join(",")})`;
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
    document.getElementById('result').style.display = 'block';

    let closestPlayer = null;
    let closestDistance = Infinity;

    players.forEach(player => {
        const distance = colorDistance(targetColor, player.photoColor);
        player.distance = distance;
        if (distance < closestDistance) {
            closestDistance = distance;
            closestPlayer = player;
        }
    });

    const percentage = ((1 - closestDistance / 441.67) * 100).toFixed(2); // 441.67 is the max possible distance in RGB color space
    document.getElementById('winner').textContent = `Le gagnant est ${closestPlayer.name} avec ${percentage}% de précision !`;
}

function colorDistance(color1, color2) {
    const rgb1 = color1.match(/\d+/g).map(Number);
    const rgb2 = color2.match(/\d+/g).map(Number);
    return Math.sqrt(
        (rgb1[0] - rgb2[0]) ** 2 +
        (rgb1[1] - rgb2[1]) ** 2 +
        (rgb1[2] - rgb2[2]) ** 2
    );
}
