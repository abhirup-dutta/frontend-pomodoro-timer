const FOCUS_MINUTES = 25;
const BREAK_MINUTES = 5;
const FOCUS_STATUS = "Focus Time";
const BREAK_STATUS = "Break Time";
const CYCLES_DONE = "Cycles Done";
const focusDuration = FOCUS_MINUTES * 60;
const breakDuration = BREAK_MINUTES * 60;
const clockDOMElement = document.getElementById("timerClock");
const statusDOMElement = document.getElementById("timerStatus");
const cycleDOMElement = document.getElementById("cycleCount");
const startButton = document.getElementById("startBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");

let timer;
let timeLeft = focusDuration;
let isFocusTime = true;
let cycleCount = 0;

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

function updateCyclesDisplay(count) {
    cycleDOMElement.textContent = `${count} ${CYCLES_DONE}`;
}

function toggleStatus_TimeLeft_And_Cycle() {
    isFocusTime = !isFocusTime;
    timeLeft = isFocusTime ? focusDuration : breakDuration;
    if (isFocusTime) {
        updateCycleCount();
    }
}

function resetStatus_TimeLeft_And_Cycle() {
    isFocusTime = true;
    timeLeft = focusDuration;
    resetCycleCount();

}

function stopTimer() {
    clearInterval(timer);
}

function updateCycleCount() {
    cycleCount++;
}

function resetCycleCount() {
    cycleCount = 0;
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateClockDisplay(timeLeft);
        } else {
            stopTimer();
            toggleStatus_TimeLeft_And_Cycle();
            updateClockDisplay(timeLeft);
            updateStatusDisplay(isFocusTime);
            updateCyclesDisplay(cycleCount);
            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    stopTimer();
}

function resetTimer() {
    stopTimer();
    resetStatus_TimeLeft_And_Cycle();
    updateClockDisplay(timeLeft);
    updateStatusDisplay(isFocusTime);
    updateCyclesDisplay(cycleCount);
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
