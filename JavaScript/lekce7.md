# Лекция 7: Callback и методы массивов (forEach, map, filter, reduce)

## 1\. Callback-функции (Колбэки)

**Колбэк** — это функция, которую мы передаём в другую функцию как аргумент, чтобы она была вызвана позже.

**Зачем они нужны:**

  * **Гибкость:** мы можем менять поведение функции, не переписывая её саму.
  * **Переиспользование:** одна функция может выполнять разные задачи в зависимости от переданного колбэка.
  * **Асинхронность:** выполнение кода после того, как что-то произошло (клик, таймер, ответ от сервера).

<!-- end list -->

```javascript
function welcome(name, callback) {
    callback(name);
}

function sayHello(name) {
    console.log(`Hello, ${name}!`);
}

// Передаем ССЫЛКУ на функцию sayHello как колбэк
welcome("Alex", sayHello); 
```

⚠️ **ВАЖНО:** Мы передаем именно ссылку (`sayHello`), а не вызов функции (`sayHello()`).

  * `doSomething(myFunction);` — ✅ Правильно (передали рецепт).
  * `doSomething(myFunction());` — ❌ Ошибка (передали результат выполнения).

-----

## 2\. Контекст `this`
Ключевое слово `this` переводится как «этот». В JavaScript оно указывает на **объект, который прямо сейчас выполняет код**. 
Главное правило: **у обычных функций `this` определяется тем, КАК функцию вызвали, а у стрелочных — тем, ГДЕ она была создана.**

### Пример 1: Обычная функция как метод объекта
Если обычная функция вызывается как метод объекта (через точку), то `this` — это сам этот объект.

```javascript
const user = {
    name: "Alex",
    age: 25,
    sayHi() { // Это обычная функция (метод объекта)
        console.log(`Привет, меня зовут ${this.name}`);
    }
};

user.sayHi(); // "Привет, меня зовут Alex" (this === user)


Это тот самый момент, где новички часто совершают ошибки. Когда мы передаем функцию как колбэк, она может «потерять» свой контекст (`this`).

### Проблема: Потеря контекста

Обычная функция внутри методов (как `forEach`) или таймеров теряет связь с объектом.

```javascript
const hotel = {
    name: "Resort Spa",
    showName() {
        console.log(this.name);
    },
    logInfo() {
        // Обычная функция в колбэке потеряет 'this'
        [1].forEach(function() {
            console.log(this.name); // ❌ Ошибка или undefined
        });
    }
};
```

### Решение: Стрелочные функции

У стрелочных функций **нет своего `this`**. Они берут его из внешнего окружения. Поэтому они идеальны для колбэков\!

```javascript
const hotel = {
    name: "Resort Spa",
    logInfo() {
        // Стрелка берет 'this' у метода logInfo (где this === hotel)
        [1].forEach(() => {
            console.log(`Добро пожаловать в ${this.name}!`); // ✅ Работает: "Resort Spa"
        });
    }
};
```

**Вывод:** Если внутри колбэка вам нужно обратиться к свойствам объекта (через `this`), всегда используйте стрелочную функцию.

-----

## 3\. Перебирающие методы массивов

Все эти методы используют колбэки для работы с элементами.

### 3.1 forEach()

Просто перебирает массив. Ничего не возвращает (`undefined`). Нужен для «побочных эффектов» (вывод в консоль, запись в базу, изменение DOM).

```javascript
const fruits = ["apple", "banana", "orange"];
fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});
```

*Не поддерживает `break` или `continue`.*

### 3.2 map() — Трансформация

Создает **новый** массив такой же длины, преобразуя каждый элемент.

```javascript
const users = [{ name: "Alex", age: 20 }, { name: "Mia", age: 25 }];
const updated = users.map(user => ({
    ...user,
    isAdult: user.age >= 18
}));
```

### 3.3 filter() — Отбор

Создает новый массив только из тех элементов, для которых колбэк вернул `true`.

```javascript
const numbers = [5, 12, 8, 20];
const bigNumbers = numbers.filter(num => num > 10); // [12, 20]
```

### 3.4 find() и findIndex()

  * `find()` — возвращает **первый** найденный элемент или `undefined`.
  * `findIndex()` — возвращает **индекс** первого найденного элемента или `-1`.

### 3.5 some() и every() — Проверки

  * `some()` — хотя бы один элемент подходит? (Вернет `true`/`false`).
  * `every()` — **все** элементы подходят? (Вернет `true`/`false`).

### 3.6 sort() — Сортировка

**Внимание:** мутирует (изменяет) исходный массив\!

```javascript
const nums = [10, 5, 20, 1];
nums.sort((a, b) => a - b); // Сортировка чисел по возрастанию
```

### 3.7 reduce() — Агрегация

«Сворачивает» массив в одно значение (число, строку, объект).

```javascript
const orders = [{ total: 100 }, { total: 50 }];
const sum = orders.reduce((acc, order) => acc + order.total, 0); // 150
```

-----

## 4\. Работа со временем: setTimeout и setInterval

Эти функции принимают колбэк и время задержки (в мс).

  * **`setTimeout(cb, delay)`** — выполнит один раз.
  * **`setInterval(cb, delay)`** — будет выполнять постоянно, пока не остановите через `clearInterval()`.

<!-- end list -->

```javascript
const timerId = setTimeout(() => {
    console.log("Прошла 1 секунда");
}, 1000);

// Остановка (если нужно прервать до выполнения)
clearTimeout(timerId);
```

-----

## 💻 Практика
**1. Оплаченные заказы** Получить только заказы со статусом `"paid"`.
<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
const orders = [
    { id: 1, status: "paid", total: 100 },
    { id: 2, status: "pending", total: 50 },
    { id: 3, status: "paid", total: 70 },
];
const paidOrders = orders.filter(order => order.status === "paid");
console.log(paidOrders);
```
</details>

**2. Ближайшее событие** Найти первое событие, дата которого больше сегодняшней `("2025-12-06")`.
<details>
  <summary>💡 Посмотреть решение</summary>
  
```javascript
const events = [
    { name: "Концерт", date: "2025-12-10" },
    { name: "Выставка", date: "2025-12-05" }
];
const today = "2025-12-06";
const nextEvent = events.find(event => event.date > today);
console.log(nextEvent);
```

</details>

**3. Проверка склада** Проверить через `some`, есть ли товары в наличии.
<details>
  <summary>💡 Посмотреть решение</summary>
  
```javascript
const products = [
    { name: "Телефон", qty: 0 },
    { name: "Наушники", qty: 5 }
];
const hasStock = products.some(p => p.qty > 0);
console.log(hasStock); // true
```
</details>

**4. Общая сумма** Посчитать общую сумму `total` всех заказов через `reduce`.
<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
const orders = [{ total: 100 }, { total: 50 }, { total: 70 }];
const totalSum = orders.reduce((sum, order) => sum + order.total, 0);
console.log(totalSum); // 220
```
</details>

**5. Трансформация имен** Получить массив имен пользователей, которым больше 21 года `(filter + map)`.

<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
const users = [
    { name: "Alex", age: 20 },
    { name: "Mia", age: 25 },
    { name: "John", age: 30 }
];
const names = users
    .filter(user => user.age >= 21)
    .map(user => user.name);
console.log(names); // ["Mia", "John"]
```

</details>

**6. Таймер обратного отсчета** Сделать таймер от 5 до 0. На 0 вывести `"Время вышло!"` и остановить интервал.
<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
let seconds = 5;
const timer = setInterval(() => {
    console.log(seconds);
    seconds--;
    if (seconds < 0) {
        console.log("Время вышло!");
        clearInterval(timer);
    }
}, 1000);
```
</details>

**7. Часы в реальном времени** Выводить текущее время (ЧЧ:ММ:СС) в консоль и на страницу каждую секунду.
<details>
  <summary>💡 Посмотреть решение</summary>
  
```javascript
setInterval(() => {
    const now = new Date();
    // padStart(2, "0") добавит нолик спереди, если число меньше 10
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    const timeString = `${hours}:${minutes}:${seconds}`;
    console.log(timeString);
    document.body.innerHTML = `<h1>${timeString}</h1>`;
}, 1000);
```
</details>

-----

## 🛠 Полезные ссылки

  * **[learn.javascript.ru: Колбэки](https://learn.javascript.ru/callbacks)** — основы концепции.
  * **[learn.javascript.ru: Методы массивов (продвинутые)](https://learn.javascript.ru/array-methods)** — детально про map, filter, reduce.
  * **[learn.javascript.ru: setTimeout и setInterval](https://learn.javascript.ru/settimeout-setinterval)** — планирование вызовов.
  * **[MDN: Array.prototype.reduce()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)** — шпаргалка по самому сложному методу.
---

### 🗺 Навигация:

[⬅ Лекция 6: Функции](./lekce6.md) | [🏠 В оглавление](./README.md) | [Лекция 8: DOM: работа с элементами, классами и атрибутами ➡](./lekce8.md)
