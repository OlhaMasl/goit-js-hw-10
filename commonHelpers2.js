import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as t}from"./assets/vendor-77e16229.js";const m=document.querySelector(".form"),r=document.querySelector(".delay-input"),o=document.getElementsByName("state");console.log(o[0].value);console.log(o[1].value);function a(s){s.preventDefault();const e=r.value;new Promise((i,n)=>{setTimeout(()=>{o[0].checked?i(t.show({message:`✅ Fulfilled promise in ${e}ms`,messageColor:"white",backgroundColor:"green",maxWidth:302,position:"topRight"})):n(t.show({message:`❌ Rejected promise in ${e}ms`,messageColor:"white",backgroundColor:"red",maxWidth:302,position:"topRight"}))},e)})}m.addEventListener("submit",a);
//# sourceMappingURL=commonHelpers2.js.map