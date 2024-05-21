
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

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    userSelectedDate = Date.parse(selectedDates[0]);
    // console.log(userSelectedDate);
    const currentDate = Date.now();
    const dateDiff = userSelectedDate - currentDate;
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
        calender.setAttribute("disabled", "false");
        return userSelectedDate
      }
  },
};

flatpickr(calender, options);
  
const timer = {
  start() { 
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userSelectedDate - currentTime;
      // console.log(interval);
       if (deltaTime <= 1000) {
      clearInterval(interval);
      };
      const time = convertMs(deltaTime);
      // console.log(time);
      timerElements.days.innerHTML = addZero(time.days);
      timerElements.hours.innerHTML = addZero(time.hours);
      timerElements.minutes.innerHTML = addZero(time.minutes);
      timerElements.seconds.innerHTML = addZero(time.seconds);
      startBtn.disabled = true;
      calender.setAttribute("disabled", "true");
    }, 1000);
  }
}

startBtn.addEventListener("click", () => {
  timer.start();
}); 


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
 
