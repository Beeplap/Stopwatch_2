let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;  // New flag to track if the stopwatch is running

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Event listeners for button clicks and touch for mobile support
startButton.addEventListener('click', toggleStopwatch);
startButton.addEventListener('touchstart', toggleStopwatch);

stopButton.addEventListener('click', toggleStopwatch);
stopButton.addEventListener('touchstart', toggleStopwatch);

resetButton.addEventListener('click', resetStopwatch);
resetButton.addEventListener('touchstart', resetStopwatch);

// Keyboard shortcuts: 'S' to start/stop (toggle), 'R' to reset
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
    if (!timerInterval) {  // Prevent starting multiple intervals
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startButton.disabled = true;
        stopButton.disabled = false;
        resetButton.disabled = false;
        isRunning = true;  // Set running state to true
    }
}

function stopStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
    startButton.disabled = false;
    stopButton.disabled = true;
    isRunning = false;  // Set running state to false
}

function resetStopwatch() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    display.innerHTML = "00:00:00:00";
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    isRunning = false;  // Ensure the stopwatch is marked as stopped
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;

    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    // Format time with leading zeroes if necessary
    display.innerHTML = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}
