// document.addEventListener("contextmenu", (event) => {
//   event.preventDefault(); // отключаем меню браузера
// });

// document.addEventListener("mousedown", (event) => {
//   console.log(event.button);
// })


const user = { name: "Alex", age: 26 };
const str = JSON.stringify(user); // '{"name":"Alex","age":26}'
console.log(str);
// JSON → JS (для использования)
const parsed = JSON.parse(str); // { name: "Alex", age: 26 }
console.log(parsed);