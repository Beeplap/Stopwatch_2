let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;  

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');


startButton.addEventListener('click', toggleStopwatch);
startButton.addEventListener('touchstart', toggleStopwatch);

stopButton.addEventListener('click', toggleStopwatch);
stopButton.addEventListener('touchstart', toggleStopwatch);

resetButton.addEventListener('click', resetStopwatch);
resetButton.addEventListener('touchstart', resetStopwatch);

document.addEventListener('keydown', function(event) {
    switch (event.key.toLowerCase()) {
        case 's':
            toggleStopwatch();
            break;
        case 'r':
            resetStopwatch();
            break;
    }
});

function toggleStopwatch() {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
}

function startStopwatch() {
    if (!timerInterval) {  
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startButton.disabled = true;
        stopButton.disabled = false;
        resetButton.disabled = false;
        isRunning = true;  
    }
}

function stopStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
    startButton.disabled = false;
    stopButton.disabled = true;
    isRunning = false;  
}

function resetStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    display.innerHTML = "00:00:00:00";
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    isRunning = false;  
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;

    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

 
    display.innerHTML = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}
