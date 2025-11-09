const workDuration = 25 * 60;
const clockDOMElement = document.getElementById("timerClock");
const startButton = document.getElementById("startBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");

let timer;
let timeLeft = workDuration;

function renderTimeForDisplay(time) {
    let displayMinutes = String(Math.floor(time / 60)).padStart(2, "0");
    let displaySeconds = String(time % 60).padStart(2, "0");
    return `${displayMinutes}:${displaySeconds}`;
}

function updateClockDisplay(displayDOMElement, time) {
    displayDOMElement.textContent = renderTimeForDisplay(time);
}

function startTimerWithParameters(displayDOMElement, updateDisplayFunction) {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplayFunction(displayDOMElement, timeLeft);
        } else {
            clearInterval(timer);
        }
    }, 1000);
}

function resetTimeLeft() {
    timeLeft = workDuration;
}

function startTimer() {
    startTimerWithParameters(clockDOMElement, updateClockDisplay);
}

function pauseTimer() {
    clearInterval(timer);
    updateClockDisplay(clockDOMElement, timeLeft);
}

function resetTimer() {
    clearInterval(timer);
    resetTimeLeft();
    updateClockDisplay(clockDOMElement, timeLeft);
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
