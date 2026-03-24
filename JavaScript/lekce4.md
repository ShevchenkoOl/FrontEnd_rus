# Лекция 4: Управление потоком: Switch, циклы for/while

## 1. Switch / Case
### Что такое switch

`switch` — это конструкция, которая позволяет сравнивать одно значение с несколькими возможными вариантами без использования длинных цепочек `else if`.

### Когда используется switch

`switch` применяется, когда нужно проверить **одно значение** на множество вариантов:

* дни недели
* месяцы
* команды пользователя
* типы действий
* статусы системы

## Структура switch

```javascript id="sw1"
switch (выражение) {
    case значение1:
        // код
        break;

    case значение2:
        // код
        break;

    default:
        // выполняется, если совпадений нет
}
```
## Принцип работы

* выполняется выражение внутри `switch`
* результат сравнивается с `case` через строгое равенство `===`
* при совпадении выполняется соответствующий блок
* `break` завершает выполнение конструкции
* если `break` отсутствует — происходит “проваливание” (fall-through)
* `default` выполняется, если ни один `case` не подошёл

---

## ✔ Пример 1: день недели

```javascript id="sw2"
let day = 3;

switch (day) {
    case 1:
        console.log("Понедельник");
        break;
    case 2:
        console.log("Вторник");
        break;
    case 3:
        console.log("Среда");
        break;
    default:
        console.log("Неизвестный день");
}
```

## ✔ Пример 2: объединение case

```javascript id="sw4"
let month = 6;

switch (month) {
    case 12:
    case 1:
    case 2:
        console.log("Зима");
        break;

    case 3:
    case 4:
    case 5:
        console.log("Весна");
        break;

    case 6:
    case 7:
    case 8:
        console.log("Лето");
        break;

    case 9:
    case 10:
    case 11:
        console.log("Осень");
        break;

    default:
        console.log("Некорректный месяц");
}
```

## ✔ Пример 3: switch(true)

```javascript id="sw5"
let number = Number(prompt("Введите число"));

switch (true) {
    case isNaN(number):
        console.log("Ошибка: введено не число");
        break;

    case number < 0:
        console.log("Ошибка: число отрицательное");
        break;

    default:
        console.log("Результат:", number * 10);
}
```

---

# 2. Циклы в JavaScript

**Циклы** — это конструкции, которые позволяют выполнять один и тот же код многократно.

## Где используются циклы
* повторение действий
* обработка данных
* работа с текстом
* перебор чисел
* автоматизация процессов

# 2.1 Цикл for
Используется, если заранее известно количество повторений.

## Структура
```javascript id="f1"
for (инициализация; условие; шаг) {
    // тело цикла
}
```

## ✔ Пример:  вывод чисел от 1 до 5
```javascript id="f2"
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```
## ✔ Сумма чисел
```javascript id="f3"
let sum = 0;

for (let i = 1; i <= 10; i++) {
    sum += i;
}

console.log(sum);
```
## ✔ Чётные числа
```javascript id="f4"
for (let i = 2; i <= 20; i += 2) {
    console.log(i);
}
```
## ✔ Перебор строки
```javascript id="f5"
let text = "hello";

for (let i = 0; i < text.length; i++) {
    console.log(text[i]);
}
```
# 2.2 Цикл while
Используется, если количество повторений заранее неизвестно.

## Структура
```javascript id="w1"
while (условие) {
    // тело цикла
}
```

## ✔ Пример

```javascript id="w2"
let i = 5;

while (i > 0) {
    console.log(i);
    i--;
}
```
## ✔ Ввод пользователя
```javascript id="w3"
let num = Number(prompt("Введите число (0 — выход)"));

while (num !== 0) {
    console.log(num);
    num = Number(prompt("Введите число (0 — выход)"));
}
```
# 2.3 break и continue

## break
Прерывает выполнение цикла полностью.

## continue
Пропускает текущую итерацию.

## break
```javascript id="b1"
for (let i = 1; i <= 10; i++) {
    if (i === 5) break;
    console.log(i);
}
```
## continue
```javascript id="b2"
for (let i = 1; i <= 5; i++) {
    if (i === 3) continue;
    console.log(i);
}
```
# 3. Практические задачи

---

## 1. День недели

```javascript id="p1"
let dayNumber = 3;

switch (dayNumber) {
    case 1: console.log("Понедельник"); break;
    case 2: console.log("Вторник"); break;
    case 3: console.log("Среда"); break;
    default: console.log("Ошибка");
}
```

---

## 2. Напитки

```javascript id="p2"
let drink = "coffee";

switch (drink) {
    case "tea":
        console.log("Чай — 35 крон");
        break;
    case "coffee":
        console.log("Кофе — 70 крон");
        break;
    case "water":
        console.log("Вода — 25 крон");
        break;
    default:
        console.log("Нет в меню");
}
```

---

## 3. Сезоны

```javascript id="p3"
let month = 4;

switch (month) {
    case 12:
    case 1:
    case 2:
        console.log("Зима");
        break;

    case 3:
    case 4:
    case 5:
        console.log("Весна");
        break;

    case 6:
    case 7:
    case 8:
        console.log("Лето");
        break;

    case 9:
    case 10:
    case 11:
        console.log("Осень");
        break;

    default:
        console.log("Ошибка");
}
```

---

## 4. Команды пользователя

```javascript id="p4"
let command = prompt("Введите команду").toLowerCase().trim();

if (command === "start") {
    console.log("Старт");
} else if (command === "stop") {
    console.log("Стоп");
} else if (command === "exit") {
    console.log("Выход");
} else {
    console.log("Неизвестная команда");
}
```

---

## 5. Числа 1–100

```javascript id="p5"
for (let i = 1; i <= 100; i++) {
    console.log(i);
}
```

---

## 6. Нечётные числа

```javascript id="p6"
for (let i = 1; i <= 20; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    }
}
```

---

## 7. Сумма чисел

```javascript id="p7"
let n = 10;
let sum = 0;

for (let i = 1; i <= n; i++) {
    sum += i;
}

console.log(sum);
```

---

## 8. Факториал

```javascript id="p8"
let n = 5;
let factorial = 1;

for (let i = 1; i <= n; i++) {
    factorial *= i;
}

console.log(factorial);
```

---

## 9. Таблица умножения

```javascript id="p9"
for (let i = 1; i <= 10; i++) {
    console.log(`7 × ${i} = ${7 * i}`);
}
```

---

## 10. Ввод до ошибки

```javascript id="p10"
while (true) {
    let input = Number(prompt("Введите число"));

    if (isNaN(input) || input < 0) break;
}
```

---

## 11. Угадай число

```javascript id="p11"
let random = Math.floor(Math.random() * 10) + 1;

while (true) {
    let guess = Number(prompt("Угадайте число"));

    if (guess === random) break;
}
```

---

## 12. Пароль

```javascript id="p12"
while (true) {
    let pass = prompt("Введите пароль");

    if (pass === "admin123") break;
}
```

---

## 13. Перебор строки

```javascript id="p13"
let text = "JavaScript";

for (let i = 0; i < text.length; i++) {
    console.log(text[i]);
}
```

---

## 14. Подсчёт гласных

```javascript id="p14"
let word = "JavaScript";
let vowels = "aeiouAEIOU";
let count = 0;

for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
        count++;
    }
}

console.log(count);
```

---

## 16*. Числовой ряд

```javascript id="p16"
let n = 5;
let sum = 0;

for (let i = 0; i < n; i++) {
    sum += 1 / (1 + i * 3);
}

console.log(sum.toFixed(2));
```

---

## 17. Панграмма

```javascript id="p17"
function isPangram(sen) {
    let lower = sen.toLowerCase();
    let alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (let letter of alphabet) {
        if (!lower.includes(letter)) {
            return false;
        }
    }

    return true;
}
```

### 🛠 Полезные онлайн-инструменты

* **[SassMeister](https://www.google.com/search?q=https://www.sassmeister.com/)** — лучший онлайн-компилятор. Если под рукой нет VS Code, можно проверить любую идею прямо в браузере.
* **[BeautifyTools Sass to CSS](https://www.google.com/search?q=https://beautifytools.com/sass-to-css-converter.php)** — быстрый конвертер, если нужно перегнать старый кусок кода.

---

### 🗺 Навигация:

[⬅ Лекция 3: Логика, тип данных Boolean](./lekce3.md) | [🏠 В оглавление](./README.md) | [Лекция 5: Структуры данных ➡](./lekce5.md)
