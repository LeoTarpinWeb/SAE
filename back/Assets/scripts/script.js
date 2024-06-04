
let currentStream;
let useFrontCamera = true;
let flashOn = false;

async function getMedia() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }
    const constraints = {
        video: {
            facingMode: useFrontCamera ? "user" : "environment",
            torch: flashOn
        }
    };
    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    const video = document.getElementById('video');
    video.srcObject = currentStream;
}

document.getElementById('switch-camera').addEventListener('click', () => {
    useFrontCamera = !useFrontCamera;
    getMedia();
});

document.getElementById('flash').addEventListener('click', async () => {
    flashOn = !flashOn;
    const track = currentStream.getVideoTracks()[0];
    await track.applyConstraints({ advanced: [{ torch: flashOn }] });
});

document.getElementById('take-photo').addEventListener('click', processImage);

function processImage() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const width = canvas.width = video.videoWidth;
    const height = canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, width, height);

    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Analyse de la couleur dominante
    const colorCounts = {};
    let maxColorCount = 0;
    let dominantColor = [0, 0, 0];
    let brightness = 0;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        brightness += (r + g + b) / 3;

        const rgb = [r, g, b].join(",");
        colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;

        if (colorCounts[rgb] > maxColorCount) {
            maxColorCount = colorCounts[rgb];
            dominantColor = [r, g, b];
        }
    }

    // Calcul de la luminosité moyenne
    brightness /= (width * height);

    // Convertir la couleur dominante en code hexadécimal
    const hexColor = `#${dominantColor.map(x => x.toString(16).padStart(2, '0')).join('')}`;

    // Rediriger vers loader.html avec les informations de la couleur dominante
    window.location.href = `loader.html?color=${encodeURIComponent(hexColor)}&brightness=${encodeURIComponent(brightness)}`;
}

window.addEventListener('load', getMedia);

// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
        console.log('Service Worker registration failed:', error);
    });
}
