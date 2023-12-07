let workDuration = 25 * 60;
let breakDuration = 5 * 60;
let longBreakDuration = 15 * 60;
let completeSets = 0;
let setsBeforeLongBreak = 4;
let isTimerRunning = false;
let isWorkSession = true;
let currentTime = workDuration;

function updateSettings() { // allows for user customization of values
    workDuration = parseFloat(document.getElementById("work-duration-input").value) * 60;
    breakDuration = parseFloat(document.getElementById('short-break-input').value) * 60;
    longBreakDuration = parseFloat(document.getElementById('long-break-input').value) * 60;
    setsBeforeLongBreak = parseInt(document.getElementById('sets-input').value);

    resetTimer();
}

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
    isTimerRunning = false; 
    clearInterval(timerInterval); // stops timer

    if (isWorkSession) {
        completeSets++; // adds to completed set count
        document.getElementById('set-number-display').textContent = completeSets; // update set number display
        if (completeSets % setsBeforeLongBreak === 0) { // checks to see if completeSets is exactly divisable by setsBeforeLongBreak
            currentTime = longBreakDuration;
            isWorkSession = false 
        } else {
            currentTime = breakDuration;
            isWorkSession = false;
        }
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
        
        document.getElementById("timer-display").textContent = `${minutes}:${seconds}`; // updates HTML element timerDisplay
    }

    function pauseTimer() {
        if (isTimerRunning) {
            isTimerRunning = false;
            clearInterval(timerInterval);
        }
    }

    function resetTimer() {
        isTimerRunning = false;
        clearInterval(timerInterval);
        currentTime = workDuration; // reset to work timer
        updateDisplay(currentTime);
    }

    function resetHard() {
        isTimerRunning = false;
        clearInterval(timerInterval);
        currentTime = workDuration;
        updateDisplay(currentTime);
        completeSets = 0; // resets completed sets
        isWorkSession = true; // reset to start with a work session

    }