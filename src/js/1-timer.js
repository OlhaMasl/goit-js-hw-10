
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const calender = document.querySelector("input#datetime-picker");
const startBtn = document.querySelector(".date-btn");

const timerElements = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
};

// console.log(timerElements.days);

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    const selectedDatesMs = Date.parse(selectedDates[0]);
    const currentDate = Date.now();
    const dateDiff = selectedDatesMs - currentDate;
    // console.log(dateDiff);
    
      if (dateDiff <= 0) {
          iziToast.show({
              message: 'Please choose a date in the future',
              messageColor: 'white',
              messageSize: '',
              messageLineHeight: '',
              backgroundColor: 'red',
              maxWidth: 302,
              position: 'topRight',
          });
          startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
        timer(dateDiff);
        //  return userSelectedDate = selectedDates[0];
      }
  },
};
 
flatpickr(calender, options);

const timer = (msec) => {
  startBtn.disabled = true;
  const interval = setInterval(() => {
    if (msec === 0) {
      clearInterval(interval);
    };
    msec = msec - 1000;
    let dateObj = convertMs(msec);
    timerElements.days.innerHTML = addZero(dateObj.days);
    timerElements.hours.innerHTML = addZero(dateObj.hours);
    timerElements.minutes.innerHTML = addZero(dateObj.minutes);
    timerElements.seconds.innerHTML = addZero(dateObj.seconds);
  }, 1000);
}

startBtn.addEventListener("click", timer);



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
};

function addZero(value) {
  return String(value).padStart(2, "0");
};
 
