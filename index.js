let workDuration = 25 * 60;
let breakDuration = 5*60;
let isTimerRunning = false;
let currentTime = workDuration;

let timerInterval;

function startTimer() {
    if (!isTimerRunning) { // if timer is NOT running then start running
        isTimerRunning = true;
        timerInterval = setInterval(updateTimer, 1000) // runs updateTimer function every second
    }
}

function updateTimer() {
    currentTime--;
    updateDisplay(currentTime);

    if (currentTime <= 0) {
        toggleSession(); // runs toggleSession function when timer hits 0
    }
}

function toggleSession() { // switches from work to break timer
    isTimerRunning = false; // turns off timer
    clearInterval(timerInterval); // clears timer

    if (currentTime <= 0 && isWorkSession) { // checks to see if timer ran out AND if it ran out during a work session
        currentTime = breakDuration; // switches to break timer
        isWorkSession = false;
    } else {
        currentTime = workDuration;
        isWorkSession = true;
    }

    startTimer(); //starts next session

    }

    function updateDisplay(timeInSeconds) {
        let minutes = Math.floor(timeInSeconds / 60); //rounds down to the lowest whole number
        let seconds = timeInSeconds % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes; // makes sure the display adds a 0 in front of single digit numbers
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        document.getElementById("timerDisplay").textContent = `${minutes}:${seconds}`;
    }

    function pauseTimer() {
        isTimerRunning = false;
        clearInterval(timerInterval);
    }

    function resetTimer() {
        isTimerRunning = false;
        clearInterval(timerInterval);
        currentTime = workDuration; // reset to work timer
        updateDisplay(currentTime);
    }