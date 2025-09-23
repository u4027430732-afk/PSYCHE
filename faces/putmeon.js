const uploadImage = document.getElementById('uploadImage');
const photoCanvas = document.getElementById('photoCanvas');
const exportButton = document.getElementById('exportButton');
const increaseSize = document.getElementById('increaseSize');
const decreaseSize = document.getElementById('decreaseSize');
const flipHat = document.getElementById('flipHat');
const rotateLeft = document.getElementById('rotateLeft');
const rotateRight = document.getElementById('rotateRight');
const ctx = photoCanvas.getContext('2d');

let photo = null; 
let hat = new Image();
let hatX = 180, hatY = 180, isDragging = false;
let hatWidth = 100, hatHeight = 100;  
let hatFlipped = false;
let hatRotation = 0; 
let dragOffsetX = 0, dragOffsetY = 0;

photoCanvas.width = 500;
photoCanvas.height = 500;

hat.src = './assets/hat1.png';
hat.onload = function () {
    updateCanvas();
};

uploadImage.addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        photo = new Image();
        photo.src = event.target.result;
        photo.onload = function () {
            updateCanvas(); 
        };
    };
    reader.readAsDataURL(file);
});

function getEventPosition(e) {
    const rect = photoCanvas.getBoundingClientRect();
    const scaleX = photoCanvas.width / rect.width;
    const scaleY = photoCanvas.height / rect.height;

    if (e.touches && e.touches[0]) {
        return {
            x: (e.touches[0].clientX - rect.left) * scaleX,
            y: (e.touches[0].clientY - rect.top) * scaleY
        };
    } else {
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }
}

photoCanvas.addEventListener('mousedown', startDragging);
photoCanvas.addEventListener('touchstart', startDragging, { passive: false });

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });

document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);

function startDragging(e) {
    e.preventDefault();
    const { x, y } = getEventPosition(e);

    if (x > hatX && x < hatX + hatWidth && y > hatY && y < hatY + hatHeight) {
        isDragging = true;
        dragOffsetX = x - hatX;
        dragOffsetY = y - hatY;
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        const { x, y } = getEventPosition(e);
        hatX = x - dragOffsetX;
        hatY = y - dragOffsetY;
        updateCanvas();
    }
}

function stopDragging() {
    isDragging = false;
}

function updateCanvas() {
    ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);

    if (photo) {
        const aspectRatio = Math.min(photoCanvas.width / photo.width, photoCanvas.height / photo.height);
        const newWidth = photo.width * aspectRatio;
        const newHeight = photo.height * aspectRatio;
        ctx.drawImage(photo, (photoCanvas.width - newWidth) / 2, (photoCanvas.height - newHeight) / 2, newWidth, newHeight);
    }

    ctx.save();
    ctx.translate(hatX + hatWidth / 2, hatY + hatHeight / 2);
    ctx.rotate((hatRotation * Math.PI) / 180);
    if (hatFlipped) {
        ctx.scale(-1, 1);
    }
    ctx.drawImage(hat, -hatWidth / 2, -hatHeight / 2, hatWidth, hatHeight);
    ctx.restore();
}

increaseSize.addEventListener('click', function () {
    hatWidth += 10;
    hatHeight += 10;
    updateCanvas();
});

decreaseSize.addEventListener('click', function () {
    hatWidth = Math.max(10, hatWidth - 10);
    hatHeight = Math.max(10, hatHeight - 10);
    updateCanvas();
});

flipHat.addEventListener('click', function () {
    hatFlipped = !hatFlipped;
    updateCanvas();
});

rotateLeft.addEventListener('click', function () {
    hatRotation -= 15;
    updateCanvas();
});

rotateRight.addEventListener('click', function () {
    hatRotation += 15;
    updateCanvas();
});

exportButton.addEventListener('click', function () {
    const link = document.createElement('a');
    link.download = 'edited-photo.png';
    link.href = photoCanvas.toDataURL();
    link.click();
});