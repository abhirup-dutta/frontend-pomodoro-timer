const workDuration = 25 * 60;
let clockDOMElement = document.getElementById("timerClock");


function renderTimeForDisplay(time) {
    let displayMinutes = String(Math.floor(time / 60)).padStart(2, "0");
    let displaySeconds = String(time % 60).padStart(2, "0");
    return `${displayMinutes}:${displaySeconds}`;
}

function updateClockDisplay(displayDOMElement, time) {
    displayDOMElement.textContent = renderTimeForDisplay(time);
}

function startTimer(displayDOMElement, timeLeft, updateDisplayFunction) {
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

startTimer(clockDOMElement, workDuration, updateClockDisplay);