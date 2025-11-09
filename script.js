const workDuration = 25 * 60;
const clockDOMElement = document.getElementById("timerClock");
const startButton = document.getElementById("startBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");


function renderTimeForDisplay(time) {
    let displayMinutes = String(Math.floor(time / 60)).padStart(2, "0");
    let displaySeconds = String(time % 60).padStart(2, "0");
    return `${displayMinutes}:${displaySeconds}`;
}

function updateClockDisplay(displayDOMElement, time) {
    displayDOMElement.textContent = renderTimeForDisplay(time);
}

function startTimerWithParameters(displayDOMElement, timeLeft, updateDisplayFunction) {
    let timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplayFunction(displayDOMElement, timeLeft);
            console.log(timeLeft);
        } else {
            clearInterval(timer);
        }
    }, 1000);
}

function startTimer()
{
    startTimerWithParameters(clockDOMElement, workDuration, updateClockDisplay);
}

startButton.addEventListener("click", startTimer);
