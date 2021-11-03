import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
let userDate;
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    daysEl: document.querySelector('span[data-days]'),
    hoursEl: document.querySelector('span[data-hours]'),
    minutesEl: document.querySelector('span[data-minutes]'),
    secondsEl: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userDate = selectedDates[0];
      if (userDate > Date.now()) {
          refs.startBtn.removeAttribute('disabled');
      } else {
          Notify.failure("Please choose a date in the future");
          refs.startBtn.setAttribute('disabled', true);
      } 
  },
};

flatpickr("input#datetime-picker", options)

function onStartBtnClick () {
    setInterval(() => {
        if (userDate <= Date.now()) return;
        const currentTime = convertMs(userDate - Date.now());

        refs.secondsEl.textContent = addLeadingZero(currentTime.seconds);
        refs.minutesEl.textContent = addLeadingZero(currentTime.minutes);
        refs.hoursEl.textContent = addLeadingZero(currentTime.hours);
        refs.daysEl.textContent = addLeadingZero(currentTime.days);
        
    }, 1000)
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}
