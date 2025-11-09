const FOCUS_MINUTES = 25;
const BREAK_MINUTES = 5;
const FOCUS_STATUS = "Focus Time";
const BREAK_STATUS = "Break Time";
const focusDuration = FOCUS_MINUTES * 60;
const breakDuration = BREAK_MINUTES * 60;
const clockDOMElement = document.getElementById("timerClock");
const statusDOMElement = document.getElementById("timerStatus");
const startButton = document.getElementById("startBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");

let timer;
let timeLeft = focusDuration;
let isFocusTime = true;

function renderTimeForDisplay(time) {
    let displayMinutes = String(Math.floor(time / 60)).padStart(2, "0");
    let displaySeconds = String(time % 60).padStart(2, "0");
    return `${displayMinutes}:${displaySeconds}`;
}

function updateClockDisplay(time) {
    clockDOMElement.textContent = renderTimeForDisplay(time);
}

function updateStatusDisplay(status) {
    statusDOMElement.textContent = status ? FOCUS_STATUS : BREAK_STATUS;
}

function toggleStatus_And_TimeLeft() {
    isFocusTime = !isFocusTime;
    timeLeft = isFocusTime ? focusDuration : breakDuration;
}

function resetStatus_And_TimeLeft() {
    isFocusTime = true;
    timeLeft = focusDuration;
}

function stopTimer() {
    clearInterval(timer);
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateClockDisplay(timeLeft);
        } else {
            stopTimer();
            toggleStatus_And_TimeLeft();
            updateClockDisplay(timeLeft);
            updateStatusDisplay(isFocusTime);
            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    stopTimer();
}

function resetTimer() {
    stopTimer();
    resetStatus_And_TimeLeft();
    updateClockDisplay(timeLeft);
    updateStatusDisplay(isFocusTime);
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
