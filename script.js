const workDuration = 25 * 60;
const breakDuration = 5 * 60;
const clockDOMElement = document.getElementById("timerClock");
const statusDOMElement = document.getElementById("timerStatus");
const startButton = document.getElementById("startBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");

let timer;
let timeLeft = workDuration;
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
    statusDOMElement.textContent = status ? "Focus Time" : "Break Time";
}

function toggleStatus_And_TimeLeft() {
    isFocusTime = !isFocusTime;
    timeLeft = isFocusTime ? workDuration : breakDuration;
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateClockDisplay(timeLeft);
        } else {
            clearInterval(timer);
            toggleStatus_And_TimeLeft();
            updateClockDisplay(timeLeft);
            updateStatusDisplay(isFocusTime);
            startTimer();
        }
    }, 1000);
}

function resetTimeLeft() {
    timeLeft = workDuration;
}

function pauseTimer() {
    clearInterval(timer);
    updateClockDisplay(timeLeft);
}

function resetTimer() {
    clearInterval(timer);
    resetTimeLeft();
    updateClockDisplay(timeLeft);
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
