# Лекция 6: Функции (Declaration, Expression, Arrow functions)

## 1. Что такое функция?

**Функция** — это именованный (или анонимный) фрагмент кода, который выполняет конкретную задачу, может возвращать какое-то значение и переиспользоваться в разных частях программы.

**Функции позволяют:**
* переиспользовать один и тот же код;
* разбивать программу на логические, легко читаемые части;
* инкапсулировать (прятать) сложную логику;
* передавать поведение как аргументы (**колбэки**).

> 💡 **Колбэк (callback)** — это функция, которую мы передаём как аргумент другой функции, чтобы она выполнилась позже, в нужный момент или после какого-то действия.

☕ **Аналогия с кофемашиной** Представьте, что функция — это кофемашина.
* Она принимает **аргументы** (ингредиенты): кофе, воду, молоко.
* Мы **вызываем** функцию, нажав кнопку.
* Она **возвращает** результат — готовую чашку кофе.

Такой подход невероятно удобен: мы ставим одну кофемашину на кухне и получаем кофе в любой момент. Если бы функций не существовало, нам пришлось бы хранить ингредиенты и выполнять весь процесс заваривания вручную каждый раз и везде, где мы хотим кофе — в гостиной, спальне или на балконе. Функции спасают нас от этого дублирования!

---

## 2. Function Declaration (Объявление функции)

Это основной и самый классический вид функции в JavaScript.

### 2.1 Синтаксис
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Alex")); // "Hello, Alex!"
````

  * `greet` — имя функции.
  * `name` — **параметр** (переменная, которая ждет значение).
  * `"Alex"` — **аргумент** (реальное значение, которое мы передаем при вызове).

### 2.2 Оператор `return`

`return` — это один из ключевых механизмов функций. Он делает две вещи:

1.  **Возвращает результат** из функции наружу, позволяя сохранить его в переменную.
    ```javascript
    function sum(a, b) {
        return a + b;
    }
    const result = sum(3, 5); // 8
    ```
2.  **Останавливает выполнение функции.** Любой код, написанный после `return`, никогда не выполнится. (Если `return` не указан, функция по умолчанию возвращает `undefined`).

### 2.3 Особенности Function Declaration

  * **Поднимается вверх (hoisting)** — её можно вызвать в коде *до* того, как она была объявлена.
  * Имеет своё собственное `this` (контекст). Более детально расмотрим на следующий лекции.
  * Чаще всего используется, когда функция описывает базовое поведение и нужна во многих местах программы.

-----

## 3\. Вызов функции vs Ссылка на функцию

Разница между `greet()` и `greet` — одна из самых важных тем в JavaScript\!

✅ **`greet()` — вызов функции**
Когда вы пишете круглые скобки, функция **выполняется** прямо сейчас.

```javascript
function greet() {
    console.log("Hello!");
}
greet(); // ← Вызов. Сразу выведет "Hello!"
```

✅ **`greet` — ссылка на функцию**
Без круглых скобок мы **НЕ выполняем** функцию. Мы просто обращаемся к ней как к объекту (значению).

**Зачем это нужно?**

1.  **Передать функцию как аргумент (Колбэк):**
    ```javascript
    function run(fn) {
        fn(); // вызываем переданную функцию внутри
    }
    run(greet); // Передаём ССЫЛКУ. Если бы передали greet(), она бы выполнилась на месте.
    ```
2.  **Присвоить функцию переменной:**
    ```javascript
    const sayHi = greet; 
    sayHi(); // "Hello!"
    ```
3.  **Передать в объект:**
    ```javascript
    const utils = { hello: greet };
    utils.hello(); // "Hello!"
    ```
4.  **Отложенный вызов (в таймерах или событиях).**

-----

## 4\. Function Expression (Функциональное выражение)

Функция может быть создана без имени (анонимная функция) и сразу записана в переменную. Имя ей не нужно, потому что мы обращаемся к ней по имени переменной.

```javascript
const sum = function(a, b) {
    return a + b;
};
console.log(sum(2, 3)); // 5
```

**Особенности:**

  * **НЕ поднимается (no hoisting)** — вызвать такую функцию можно только *после* её объявления (как и любую переменную `let` или `const`).
  * Часто используется для передачи функции как значения, для колбэков и обработчиков событий.

-----

## 5\. Arrow functions (Стрелочные функции)

Стрелочные функции были добавлены в стандарте ES6 (2015) как более короткая и современная форма записи.

```javascript
const sum = (a, b) => a + b;
console.log(sum(2, 3)); // 5
```

**Особенности:**

  * **Краткий синтаксис.**
  * Если тело функции состоит из одного выражения, можно опустить фигурные скобки `{}` и слово `return` (оно подставится неявно).
  * Если параметр всего один, круглые скобки можно опустить: `x => x * 2`.
  * Если параметров нет, нужны пустые скобки: `() => 42`.
  * **Лексический `this`:** стрелочные функции не имеют своего контекста `this`, они берут его из внешнего окружения.
  * Нельзя вызвать до объявления (как и Function Expression).
  * Идеально подходят для колбэков и перебора массивов.

-----

## 6\. Продвинутая работа с параметрами

✅ **Параметры по умолчанию:**
Если аргумент не передан, функция использует значение по умолчанию.

```javascript
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}
```

✅ **Сбор неизвестного количества аргументов (Rest-оператор `...`):**
Если мы не знаем, сколько аргументов нам передадут, мы можем собрать их все в массив.

```javascript
function multiply(firstNumber, secondNumber, ...otherArgs) {
    console.log(firstNumber);  // 1
    console.log(secondNumber); // 2
    console.log(otherArgs);    // [3, 4] — массив остальных аргументов
}
multiply(1, 2, 3, 4);
```

-----

## 💻 Практические задания

**1.  Деструктуризация в параметрах** Напиши функцию, которая принимает объект `{ name: "Alex", age: 25 }` и возвращает строку `"Привет, Alex! Тебе 25 лет."`. Используй деструктуризацию объекта внутри функции.
<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
function greetUser(user) {
    const { name, age } = user;
    return `Привет, ${name}! Тебе ${age} лет.`;
}

const user = { name: "Alex", age: 25 };
console.log(greetUser(user));
```
</details>

**2. Последний элемент** Напиши функцию `getLastItem(arr)`, которая принимает массив и возвращает его последний элемент. Если массив пустой — возвращает `"массив пуст"`.
<details>
  <summary>💡 Посмотреть решение</summary>

  ```javascript
function getLastItem(arr) {
    if (arr.length === 0) {
        return "массив пуст";
    }
    return arr[arr.length - 1];
}

const arr = [1, 5, 8];
console.log(getLastItem(arr));
```
</details>

**3. Проверка свойства** Напиши функцию `hasProperty(obj, key)`, которая принимает объект и строку. Функция возвращает `true`, если ключ существует, и `false` -  если нет. (Используй оператор `in`).
>**Шпаргалка по оператору 'in':**
>- В объектах: проверяет наличие ключа.
>- В массивах: проверяет наличие ИНДЕКСА (0 in [10, 20] -> true).
>- Со строками: работает только через Object(str) по индексам букв. В строках есть подвох! Строка — это примитив, а не объект. Если написать `0 in "Alex"`, `JavaScript` выдаст ошибку `(TypeError)`. Чтобы проверить наличие индекса в строке, мы должны сначала искусственно превратить её в объект с помощью функции `Object()`. Что делает `Object("Alex")`? Он создает объект, где ключи — это индексы букв:</br>
`{ 0: "A", 1: "l", 2: "e", 3: "x", length: 4 }` И вот теперь оператор `in` сработает отлично: </br>
`0 in Object("Alex") // true (буква под индексом 0 есть)` </br>
`5 in Object("Alex") // false (такого индекса нет)` </br>
>**Резюме:** Оборачивание в `Object("Alex")` нужно только точечно, чтобы "обмануть" оператор `in`. Как только проверка `in` прошла, мы можем продолжать работать с нашей изначальной переменной `"Alex"` как ни в чем не бывало, ведь сама исходная строка при этом не изменилась!

<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
function hasProperty(obj, key) {
    return key in obj;
}

console.log(hasProperty({ name: "Alex", age: 20 }, "age")); // true
```
</details>

**4. Сумма значений объекта** Напиши функцию `sumObjectValues(obj)`, которая возвращает сумму всех чисел объекта.
<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
const data = { a: 2, b: 5, c: 7 };

function sumObjectValues(obj) {
    let sum = 0;
    for (let key in obj) {
        sum += obj[key];
    }
    return sum;
}

console.log(sumObjectValues(data)); // 14
```

</details>

**5. Фильтрация по длине** Напиши функцию `filterByLength(arr, minLen)`, которая принимает массив строк и минимальную длину. Возвращает новый массив, где только строки длиннее `minLen`.
<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
function filterByLength(arr, minLen) {
    const result = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > minLen) {
            result.push(arr[i]);
        }
    }
    return result;
}

const arr = ["car", "apple", "step"];
console.log(filterByLength(arr, 3)); // ["apple", "step"]
```
</details>

**6. Фабрика объектов** Напиши функцию `createUser(name, age)`, которая возвращает объект пользователя с полями: `id (случайное число от 1 до 1000)`, `name`, `age`, `isActive (случайно true или false)`.
<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
function createUser(name, age) {
    return {
        id: Math.floor(Math.random() * 1000) + 1,
        name: name,
        age: age,
        // true будет выпадать примерно в 50% случаев
        isActive: Math.random() < 0.5 
    };
}

console.log(createUser("Alex", 25));
console.log(createUser("Mango", 30));
```
</details>

**7. Подсчёт чётных** Напиши функцию `countEven(numbers)`, которая принимает массив чисел и возвращает количество чётных чисел в нём.
<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
function countEven(numbers) {
    let count = 0;
    for (let num of numbers) {
        if (num % 2 === 0) {
            count++;
        }
    }
    return count;
}

const arr = [14, 13, 78, 1, 0];
console.log(countEven(arr)); // 3 (0 тоже считается чётным)
```

</details>

**8. Форматирование имени** Напиши функцию `formatName(fullName)`, которая принимает строку `"oleksii shevchenko"` и возвращает `"Oleksii Shevchenko"` - первая буква каждого слова — большая.
<details>
  <summary>💡 Посмотреть решение</summary>
  
```javascript
function formatName(fullName) {
    const parts = fullName.split(" ");
    let result = [];

    for (let part of parts) {
        // Берем первую букву, делаем заглавной, приклеиваем остаток слова
        const formatted = part[0].toUpperCase() + part.slice(1).toLowerCase();
        result.push(formatted);
    }
    
    return result.join(" ");
}

console.log(formatName("oleksii shevchenko"));
// Вывод на страницу: document.body.innerHTML = `<h1>${formatName("oleksii shevchenko")}</h1>`;
```
</details>

**9. Слияние объектов (Spread)** Напиши функцию `merge(obj1, obj2)`, которая возвращает **НОВЫЙ объект**, содержащий свойства обоих.
> **Как работает Spread-оператор (...)**
> Он "распаковывает" свойства объекта. Создается **новый объект {}**, в него высыпаются свойства из `obj1`, а затем из `obj2`. Если ключи совпадают, последнее значение перезапишет предыдущее!

<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
function merge(obj1, obj2) {
    return { ...obj1, ...obj2 };
}

console.log(merge({a: 1}, {b: 2})); // {a: 1, b: 2}

```

</details>

**10. Онлайн пользователи** Напиши функцию `getOnlineUsers(users)`, которая принимает массив объектов и возвращает массив имён тех, кто online.
<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
const users = [
    { name: "Alex", online: true },
    { name: "Maria", online: false },
    { name: "Oleg", online: true }
];

function getOnlineUsers(users) {
    let result = [];
    for (let user of users) {
        if (user.online === true) {
            result.push(user.name);
        }
    }
    return result;
}

const onlineUsers = getOnlineUsers(users); // ["Alex", "Oleg"]

// Пример вывода на страницу в виде списка:
let listItems = '';
for (let name of onlineUsers) {
    listItems += `<li>${name}</li>`;
}
document.body.innerHTML = `<ul>${listItems}</ul>`;
```
</details>

## Задание со звёздочкой ✨
**11 ⭐. Сортировка цифр** Создайте функцию, которая принимает неотрицательное целое число и возвращает его с цифрами, отсортированными по убыванию (создает максимально возможное число).
> **Например:** </br>
> Input: 42145 -> Output: 54421
> Input: 145263 -> Output: 654321

<details>
  <summary>💡 Посмотреть решение</summary>

```javascript
function descendingOrder(n) {   
    return Number(String(n).split('').sort((a, b) => b - a).join(''));
}
/* Алгоритм действий:
1. String(n) - Превращаем число в строку
2. .split('') - Разбиваем на массив символов: -> ["1", "4", "5", "2", "6", "3"]
3. .sort((a, b) => b - a) - Сортируем массив по убыванию 
4. .join('') - Склеиваем обратно в строку: -> "654321"
5. Number(...) - Превращаем строку обратно в число
*/

console.log(descendingOrder(145263)); // 654321
```
</details>

---

### 🛠 Полезные ссылки

  * **[learn.javascript.ru: Функции](https://learn.javascript.ru/function-basics)** — базовый синтаксис и параметры по умолчанию.
  * **[learn.javascript.ru: Function Expression](https://learn.javascript.ru/function-expressions)** — разница между Declaration и Expression, понятие колбэков.
  * **[learn.javascript.ru: Стрелочные функции](https://learn.javascript.ru/arrow-functions-basics)** — особенности краткого синтаксиса.
  * **[learn.javascript.ru: Остаточные параметры (...)](https://learn.javascript.ru/rest-parameters-spread-operator)** — подробнее о сборе аргументов в массив.

---

### 🗺 Навигация:

[⬅ Лекция 5: Структуры данных](./lekce5.md) | [🏠 В оглавление](./README.md) | [Лекция 7: Callback и методы массивов ➡](./lekce7.md)
