const stopwatchContainer = document.querySelector('.stopwatch');
const timerContainer = document.querySelector('.timer');
const startStopwatchBtn = document.querySelector('.start-stopwatch');
const lapStopwatchBtn = document.querySelector('.lap-stopwatch');
const resetStopwatchBtn = document.querySelector('.reset-stopwatch');
const startTimerBtn = document.querySelector('.start-timer');
const resetTimerBtn = document.querySelector('.reset-timer');
const lapContainer = document.querySelector('.laps');

let stopwatchInterval;
let stopwatchSeconds = 0;
let lapCounter = 1;

let timerInterval;
let timerSeconds = 0;
let timerDuration = 0;

// Stopwatch functions
function startStopwatch() {
  stopwatchInterval = setInterval(() => {
    stopwatchSeconds++;
    displayStopwatchTime();
  }, 1000);

  startStopwatchBtn.disabled = true;
  lapStopwatchBtn.disabled = false;
  resetStopwatchBtn.disabled = false;
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  startStopwatchBtn.disabled = false;
  lapStopwatchBtn.disabled = true;
}

function resetStopwatch() {
  stopStopwatch();
  stopwatchSeconds = 0;
  lapCounter = 1;
  displayStopwatchTime();
  clearLaps();
  resetStopwatchBtn.disabled = true;
}

function lapStopwatch() {
  const lapTime = document.querySelector('.stopwatch .time').textContent;
  const lapElement = document.createElement('div');
  lapElement.classList.add('lap');
  lapElement.innerHTML = `<span>Lap ${lapCounter}:</span>${lapTime}`;
  lapContainer.appendChild(lapElement);
  lapCounter++;
}

function displayStopwatchTime() {
  const hours = Math.floor(stopwatchSeconds / 3600);
  const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
  const seconds = stopwatchSeconds % 60;

  document.querySelector('.stopwatch .time').textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function clearLaps() {
  lapContainer.innerHTML = '';
}

// Timer functions
function startTimer() {
  const inputTime = document.querySelector('.timer-input').value;
  const timeParts = inputTime.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const seconds = parseInt(timeParts[2]);
  timerDuration = hours * 3600 + minutes * 60 + seconds;

  if (timerDuration > 0) {
    timerInterval = setInterval(() => {
      timerSeconds++;
      displayTimerTime();

      if (timerSeconds >= timerDuration) {
        stopTimer();
        playTimerFinishSound();
      }
    }, 1000);

    startTimerBtn.disabled = true;
    resetTimerBtn.disabled = false;
    document.querySelector('.timer-input').disabled = true;
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  startTimerBtn.disabled = false;
}

function resetTimer() {
  stopTimer();
  timerSeconds = 0;
  timerDuration = 0;
  displayTimerTime();
  document.querySelector('.timer-input').disabled = false;
  startTimerBtn.disabled = false;
  resetTimerBtn.disabled = true;
}

function displayTimerTime() {
  const remainingSeconds = timerDuration - timerSeconds;

  if (remainingSeconds >= 0) {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    document.querySelector('.timer .time').textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
  }
}

function formatTime(value) {
  return value.toString().padStart(2, '0');
}

function playTimerFinishSound() {
 
const timerFinishSound = document.getElementById('timerFinishSound');
timerFinishSound.play();


  console.log('Timer finished!');
}

// Event listeners
startStopwatchBtn.addEventListener('click', startStopwatch);
lapStopwatchBtn.addEventListener('click', lapStopwatch);
resetStopwatchBtn.addEventListener('click', resetStopwatch);
startTimerBtn.addEventListener('click', startTimer);
resetTimerBtn.addEventListener('click', resetTimer);