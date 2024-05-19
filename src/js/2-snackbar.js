// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const inputDelay = document.querySelector(".delay-input");
const radioInput = document.getElementsByName("state");

console.log(radioInput[0].value);
console.log(radioInput[1].value);



function onFormSubmit(event) {
    event.preventDefault();
    const delayValue = inputDelay.value;
    // console.log(delayValue);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
             if (radioInput[0].checked) {
              resolve(iziToast.show({
              message: `✅ Fulfilled promise in ${delayValue}ms`,
              messageColor: 'white',
              backgroundColor: 'green',
              maxWidth: 302,
              position: 'topRight',
          }))  
             } else {
                reject(iziToast.show({
              message: `❌ Rejected promise in ${delayValue}ms`,
              messageColor: 'white',
              backgroundColor: 'red',
              maxWidth: 302,
              position: 'topRight',
          })) 
             }
       }, delayValue)
    })

};
 
form.addEventListener("submit", onFormSubmit);