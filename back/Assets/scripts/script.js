let currentStream;
let useFrontCamera = true;

async function getMedia() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }
    const constraints = {
        video: {
            facingMode: useFrontCamera ? "user" : "environment"
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

document.getElementById('camera').addEventListener('click', () => {
    document.getElementById('camera-input').click();
});

document.getElementById('camera-input').addEventListener('change', processImageFromFile);

document.getElementById('take-photo').addEventListener('click', processImageFromCamera);

function processImageFromCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const width = canvas.width = video.videoWidth;
    const height = canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, width, height);
    analyzeImage(canvas);
}

function processImageFromFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            const image = new Image();
            image.src = reader.result;

            image.onload = function () {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                analyzeImage(canvas);
            };
        };
    }
}

function analyzeImage(canvas) {
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

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

    brightness /= (canvas.width * canvas.height);

    const hexColor = `#${dominantColor.map(x => x.toString(16).padStart(2, '0')).join('')}`;

    window.location.href = `loader.html?color=${encodeURIComponent(hexColor)}&brightness=${encodeURIComponent(brightness)}`;
}

window.addEventListener('load', getMedia);
