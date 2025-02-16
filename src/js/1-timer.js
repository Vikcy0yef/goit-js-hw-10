import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysL = document.querySelector('[data-days]');
const hoursL = document.querySelector('[data-hours]');
const minutesL = document.querySelector('[data-minutes]');
const secondsL = document.querySelector('[data-seconds]');

let selectedDate = null;
let timerId = null;
startBtn.addEventListener('click', startTimer);

const flatp = flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.info({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    } else {
      selectedDate = selectedDates[0];
      startBtn.removeAttribute('disabled');
    }
  },
});

function startTimer() {
  timerId = setInterval(updateTimer, 1000);
  startBtn.setAttribute('disabled', true);
  dateInput.setAttribute('disabled', true);
}

function updateTimer() {
  const dif = selectedDate - new Date();
  const { days, hours, minutes, seconds } = convertMs(dif);
  daysL.textContent = addLeadingZero(days);
  hoursL.textContent = addLeadingZero(hours);
  minutesL.textContent = addLeadingZero(minutes);
  secondsL.textContent = addLeadingZero(seconds);
  if (dif <= 1000) {
    clearInterval(timerId);
    dateInput.removeAttribute('disabled');
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
