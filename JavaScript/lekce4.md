# Лекция 4: Конструкция Switch и Циклы в JavaScript

## 1. Конструкция Switch / Case <br>
`switch` — это конструкция, которая позволяет проверить одно значение сразу на несколько возможных вариантов, избегая длинных и трудночитаемых цепочек `else if`.
Если у вас много условий вида:
```javascript
if (x === 1) { ... }
else if (x === 2) { ... }
else if (x === 3) { ... }
// ...
````
То гораздо красивее и правильнее использовать `switch`.

### 📌 Структура `switch`
```javascript
switch (выражение) {
    case значение1:
        // код выполнится, если выражение === значение1
        break;
    case значение2:
        // код выполнится, если выражение === значение2
        break;
    default:
        // выполнится, если ни один case не подошёл
}
```
**Как это работает:**
  - Вычисляется выражение в скобках `switch(value)`.
  - JavaScript сравнивает его со всеми `case`.<br>‼️**Важно: используется строгое сравнение (`===`)**.
  - Если совпадение найдено — запускается код внутри этого `case`.
  - Выполнение продолжается до ключевого слова `break`. `break` полностью останавливает `switch` и выходит из него.
  - Если вы забудете поставить `break`, код продолжит выполняться (проваливаться) в следующие `case` подряд, даже если они не совпадают\!
  - Блок `default` работает как `else` — он выполняется, если ни одно из значений не подошло.

**Где использовать `switch`?** <br>
  Идеально подходит, когда нужно сравнить **одно** значение со **многими** конкретными вариантами:
  - выбор в меню (старт/стоп/пауза)
  - дни недели
  - номера месяцев
  - статусы заказов или типы ошибок
-----

### Примеры использования
**✔ Пример 1: День недели**

```javascript
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

> 💡 **Подсказка:** Можно использовать встроенный объект `new Date()` для получения реального текущего дня: `new Date().getDay()` вернет число от 0 (воскресенье) до 6 (суббота), которое можно передать в `switch`.

**✔ Пример 2: Объединённые `case` (проваливание)**

Если для нескольких вариантов нужен один и тот же код, мы можем просто убрать `break` между ними.

```javascript
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
        console.log("Такого месяца нет!");
}
```

**✔ Пример 3: `switch(true)` для сложных условий**
Иногда `switch` используют не для проверки конкретного значения, а для проверки логических выражений.

```javascript
let userInput = prompt("Введите число:");
let number = Number(userInput);

switch (true) {
    case Number.isNaN(number):
        console.log("Ошибка: вы ввели не число! ❌");
        break;
    case number < 0:
        console.log("Ошибка: число не может быть отрицательным.");
        break;
    default:
        console.log("Успех! Результат умножения на 10:", number * 10);
}
```

-----

## 2. Циклы в JavaScript

Циклы позволяют выполнять один и тот же участок кода несколько раз подряд.

**Для чего они нужны:**

  - повторение однотипных действий
  - работа с диапазонами чисел
  - перебор символов в тексте
  - повторные запросы данных у пользователя (пока не введет правильно)

### 2.1 Цикл `for`

Используется, когда **заранее известно количество повторений** (итераций).

**📌 Структура**

```javascript
for (начало; условие; шаг) {
    // тело цикла (выполняется, пока условие true)
}
```

*Пример: вывод чисел от 1 до 5*

```javascript
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

*Пример: сумма чисел от 1 до 10*

```javascript
let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum += i;
}
console.log(sum); // 55
```

*Пример: вывод только чётных чисел (шаг увеличивается на 2)*

```javascript
for (let i = 2; i <= 20; i += 2) {
    console.log(i);
}
```

*Пример: перебор символов в строке*

```javascript
let text = "hello";
// Индексы начинаются с 0, поэтому условие строго меньше длины
for (let i = 0; i < text.length; i += 1) {
    console.log(text[i]);
}
```

-----

### 2.2 Цикл `while`

Используется, когда количество повторений **заранее НЕ известно** (цикл работает, пока условие истинно).

**📌 Структура**

```javascript
while (условие) {
    // тело цикла
}
```

*Пример: обратный отсчёт*

```javascript
let i = 5;
while (i > 0) {
    console.log(i);
    i--; // Обязательно меняем счетчик, иначе цикл станет бесконечным!
}
```

*Пример: пользователь вводит число, пока не введёт 0*

```javascript
let num = Number(prompt("Введите число (0 — стоп):"));
while (num !== 0) {
    console.log("Вы ввели:", num);
    num = Number(prompt("Введите ещё число (0 — стоп):"));
}
```

-----

### 2.3 Операторы `break` и `continue`

Это вспомогательные операторы для управления поведением циклов:

  - `break` — **полностью останавливает** цикл и выходит из него.
  - `continue` — **пропускает текущую итерацию** и переходит к следующему шагу.

*Пример 1: Использование `break` (прерываем, когда найдем 5)*

```javascript
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        console.log("Найдена пятёрка, останавливаем цикл!");
        break; 
    }
    console.log(i); // Выведет 1, 2, 3, 4
}
```

*Пример 2: Использование `continue` (пропускаем число 3)*

```javascript
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        console.log("Пропускаем число 3");
        continue; 
    }
    console.log(i); // Выведет 1, 2, 4, 5
}
```

-----
## 💻 Практические задания для самостоятельной работы
**1. День недели по номеру** <br>
Создайте переменную с числом (1-7). Используя конструкцию `switch`, выведите в консоль название соответствующего дня недели.

<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
let dayNumber = 3;

switch(dayNumber) {
    case 1: console.log("Понедельник"); break;
    case 2: console.log("Вторник"); break;
    case 3: console.log("Среда"); break;
    case 4: console.log("Четверг"); break;
    case 5: console.log("Пятница"); break;
    case 6: console.log("Суббота"); break;
    case 7: console.log("Воскресенье"); break;
    default: console.log("Некорректный номер дня");
}
```
</details>

**2. Тип напитка и цена** <br>
Есть переменная `drink = "coffee"`. Выведите через конструкцию `switch` цену: чай — 35 крон, кофе — 70 крон, вода — 25 крон. Иначе "Напитка нет".

<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
let drink = "coffee";

switch(drink) {
    case "tea":
        console.log("Чай стоит 35 крон");
        break;
    case "coffee":
        console.log("Кофе стоит 70 крон");
        break;
    case "water":
        console.log("Вода стоит 25 крон");
        break;
    default:
        console.log("Такого напитка нет в меню");
}
```
</details>

**3. Определение сезона** <br>
Решите задачу определения времени года по номеру месяца через конструкцию `switch` с объединением `case`.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
let month = 4;

switch(month) {
    case 12: case 1: case 2:
        console.log("Зима");
        break;
    case 3: case 4: case 5:
        console.log("Весна");
        break;
    case 6: case 7: case 8:
        console.log("Лето");
        break;
    case 9: case 10: case 11:
        console.log("Осень");
        break;
    default:
        console.log("Некорректный номер месяца");
}
```
</details>

**4. Меню команд (с учетом регистра)** <br>
Пользователь вводит команду `start`, `stop`, `exit`, `help`. Очистите ввод от пробелов и приведите к нижнему регистру, а затем обработайте через `switch`.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
let command = "  StArT  "; // Имитация ввода с клавиатуры

command = command.toLowerCase().trim();

switch(command) {
    case "start":
        console.log("Система запущена");
        break;
    case "stop":
        console.log("Система остановлена");
        break;
    case "exit":
        console.log("Выход из программы");
        break;
    case "help":
        console.log("Доступные команды: start, stop, exit, help");
        break;
    default:
        console.log("Неизвестная команда. Введите 'help' для справки");
}
```
</details>

**5. Вывести числа от 1 до 100** <br>
Выведите все числа от 1 до 100 двумя способами через `for` и через `while`.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
// Вариант 1: for (классический)
for (let i = 1; i <= 100; i++) {
    console.log(i);
}

// Вариант 2: while
let j = 1;
while (j <= 100) {
    console.log(j);
    j++;
}
```

</details>

**6. Вывести нечётные числа от 1 до 20** <br>
Используя цикл, выведите в консоль только нечетные числа из этого диапазона.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
// Вариант 1: проверка остатка
for (let i = 1; i <= 20; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    }
}

// Вариант 2: шаг +2 (работает быстрее и элегантнее)
for (let i = 1; i <= 20; i += 2) {
    console.log(i);
}
```
</details>

**7. Сумма чисел от 1 до N** <br>
Пользователь вводит число `n`. Найдите сумму всех чисел от 1 до n включительно с помощью цикла.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
let n = Number(prompt("Введите число:"));
let sum = 0;

for (let i = 1; i <= n; i++) {
    sum += i;
}
console.log(`Сумма чисел от 1 до ${n} = ${sum}`);
```
</details>

**8. Факториал числа N** <br>
Найдите факториал числа. Hапример, `5! = 1 * 2 * 3 * 4 * 5 = 120`.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
let n = 5; // Можно запросить через prompt
let factorial = 1; // Умножение начинаем с 1, а не с 0!

for (let i = 1; i <= n; i++) {
    factorial *= i;
}
console.log(`${n}! = ${factorial}`);
```
</details>

**9. Таблица умножения числа 7** <br>
Выведите в консоль таблицу умножения для семерки от 1 до 10.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
for (let i = 1; i <= 10; i++) {
    console.log(`7 × ${i} = ${7 * i}`);
}
```

</details>

**10. Ввод до отрицательного числа** <br>
Просите пользователя вводить числа через `prompt`. Остановите цикл, если введено отрицательное число или не-число (текст).
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
while (true) {
    let input = prompt("Введите положительное число:");
    let number = Number(input);
    
    if (Number.isNaN(number) || number < 0) {
        console.log("Ввод прерван. Программа завершена.");
        break; // Прерываем бесконечный цикл
    }
    console.log("Вы ввели:", number);
}
```
</details>

**11. Игра "Угадай число"** <br>
Компьютер загадывает число от 1 до 10. Пользователь вводит числа через `prompt`. Программа подсказывает **"Больше"** или **"Меньше"**, пока число не будет угадано.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
let randomNumber = Math.floor(Math.random() * 10) + 1;

while (true) {
    let guess = Number(prompt("Угадайте число от 1 до 10:"));
    
    if (Number.isNaN(guess)) {
        console.log("Это не число! Попробуй ещё раз.");
        continue;
    }

    if (guess === randomNumber) {
        console.log("🎉 Поздравляю! Ты угадал!");
        break; // Угадали — выходим из цикла
    } else if (guess > randomNumber) {
        console.log("📉 Моё число меньше. Попробуй ещё раз.");
    } else {
        console.log("📈 Моё число больше. Попробуй ещё раз.");
    }
}
```
</details>

**12. Запрос пароля**<br>
Просите пользователя вводить пароль, пока он не введет `"admin123"`.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
const correctPassword = "admin123";

while (true) {
    let password = prompt("Введите пароль:");
       
    if (password.trim() === correctPassword) {
        console.log("✅ Добро пожаловать!");
        break;
    } else {
        console.log("❌ Неверный пароль. Попробуйте снова.");
    }
}
```
</details>

**13. Вывод каждой буквы**<br>
С помощью цикла `for` выведите каждую букву строки **"JavaScript"** в консоль с новой строки.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
let text = "JavaScript";

for (let i = 0; i < text.length; i++) {
    console.log(text[i]);
}
```
</details>

**14. Подсчет гласных**<br>
Посчитайте, сколько гласных букв в слове **"JavaScript"**. Используйте метод `.includes()`.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
let word = "JavaScript";
let vowels = "aeiouAEIOU";
let count = 0;

for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
        count++;
    }
}
console.log("Количество гласных: " + count);
```
</details>

**15. Проверка ввода (1-5)** <br>
Просите пользователя ввести число от 1 до 5. Если он ввел число больше 5 — спрашивайте снова.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
let num = Number(prompt("Введите число от 1 до 5:"));

while (num > 5 || Number.isNaN(num)) {
    num = Number(prompt("Ошибка! Введите число именно от 1 до 5:"));
}

console.log("Спасибо! Вы ввели:", num);
```
</details>

**16. Сложная сумма ряда**<br>
Пользователь вводит число `n`. Вычислите ряд: 1/1 + 1/4 + 1/7 + ... Где `n` это количество дробей, знаменатель каждый шаг +3, результат округлите до 2 знаков.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
let n = Number(prompt("Введите число n:"));
let sum = 0;

for (let i = 0; i < n; i++) {
    // В JS лучше избегать проблем с дробями, используя сложение математически,
    // а округлять только финальный результат с помощью toFixed()
    sum += 1 / (1 + i * 3);
}

// .toFixed() возвращает строку, поэтому оборачиваем в Number
console.log(Number(sum.toFixed(2)));
```

</details>

**17. Проверка на панграмму**<br>
Напишите код, который проверяет, содержит ли заданное предложение все буквы английского алфавита хотя бы один раз.
<details>
  <summary>💡 Посмотреть решение</summary>
    
```javascript
// Оборачиваем логику в функцию для удобства переиспользования
function isPangram(sentence) {
    const lower = sentence.toLowerCase();
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    
    // Перебираем каждую букву алфавита (используем for...of для строк)
    for (let letter of alphabet) {
        // Если какой-то буквы алфавита нет в нашем предложении — это не панграмма
        if (!lower.includes(letter)) {
            return false;
        }
    }
    // Если цикл прошел до конца, значит все буквы найдены
    return true; 
}

console.log(isPangram("The quick brown fox jumps over the lazy dog")); // true
console.log(isPangram("Hello world")); // false
```

</details>

----

### 🛠 Полезные онлайн-инструменты

* **[learn.javascript.ru: Конструкция "switch"](https://learn.javascript.ru/switch)** — подробный разбор конструкции с примерами группировки `case`.
* **[learn.javascript.ru: Циклы while и for](https://learn.javascript.ru/while-for)** — всё о циклах, прерываниях и бесконечных циклах.
* **[MDN Web Docs: switch](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/switch)** — официальная документация по `switch`.

----

### 🗺 Навигация:

[⬅ Лекция 3: Логика, тип данных Boolean](./lekce3.md) | [🏠 В оглавление](./README.md) | [Лекция 5: Структуры данных ➡](./lekce5.md)
