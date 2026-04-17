# Лекция 8: DOM (Document Object Model). Работа с элементами

## 1. Что такое DOM?

**DOM (Document Object Model, Объектная модель документа)** — это программный объект, который представляет HTML-документ как древовидную структуру узлов `(nodes)`. Браузер строит DOM из HTML-кода и предоставляет JavaScript API для взаимодействия со страницей.
>*Причечание:* **Application Programming Interface** (Программный интерфейс приложения) - это набор правил, протоколов и инструментов, позволяющий одной компьютерной программе взаимодействовать с другой. API дает нам данные (текст, цифры, ссылки на фото), а DOM позволяет нам красиво показать эти данные на экране. Без API наш сайт был бы пустым и скучным (на нем нечего было бы показывать). А без DOM мы не смогли бы вывести полученные от API данные на экран — они так бы и остались висеть невидимыми в памяти браузера.

**С помощью DOM мы можем:**
* создавать, изменять и удалять HTML-элементы;
* менять текст, стили и классы;
* реагировать на действия пользователя (клики, ввод текста).

### Типы узлов (nodes)
* **Element node (Элемент)** — сами теги (`<div>`, `<p>`, `<input>`).
* **Text node (Текстовый узел)** — текст внутри элемента (даже пробелы и переносы строк считаются текстовыми узлами).
* **Comment node** — комментарии `<!-- comment -->`.
* **Document** — корневой объект, с которого начинается всё дерево.
* **DocumentFragment** — легковесный контейнер для безопасной сборки кусков DOM перед их вставкой на страницу.

### Доступ к документу
```javascript
document;        // Корневой объект
window.document; // То же самое (document всегда находится внутри глобального объекта window)
````

-----

## 2. Поиск элементов на странице

  * **`getElementById(id)`** — очень быстрый метод. Возвращает один элемент или `null`, если его нет.
    ```javascript
    const el = document.getElementById("main");
    ```
  * **`getElementsByClassName(name)`** — возвращает «живую» HTMLCollection (она автоматически обновляется, если в DOM добавляются элементы с таким классом).
    ```javascript
    const cols = document.getElementsByClassName("item");
    ```
  * **`getElementsByTagName(tag)`** — возвращает «живую» HTMLCollection по имени тегу.
    ```javascript
    const elements = document.getElementsByTagName("div");
    ```
  * **`getAttribute("id")`** — возвращает найденый атрибут в **елементе**, если атрибут не найден вернет `null`.
    ```javascript
    const img = document.getElementsByTagName("img");
    const atr = img.getAttribute("alt");       // Важно, понимать что атрибуты есть только у елементов, а объект `document` — это не HTML-тег. Это просто глобальная «обертка», которая представляет всю вашу веб-страницу целиком
    ```
  * **`querySelector(selector)`** — современный и универсальный метод. Возвращает **первый** элемент, который совпадает с CSS-селектором, тегом, id или атрибутом.
    ```javascript
    const ul = document.querySelector("ul");
    const first = document.querySelector(".list > li:first-child");
    const btn = document.querySelector("#btn");
    const img = document.querySelector("[alt="Котик"]");
    const inputField = document.querySelector('input[type="text"]'); // более строгий поиск, ищем input, у которого type равен "text"
    
    ```
  * **`querySelectorAll(selector)`** — возвращает статический массив (NodeList) всех найденных элементов.
    ```javascript
    const nodes = document.querySelectorAll(".card");
    ``` 

### Навигация по DOM-дереву (отталкиваясь от элемента `elem`):

  * `elem.parentNode` — родительский элемент.
  * `elem.childNodes` — псевдомассив **всех** дочерних узлов (включая текст и комментарии).
  * `elem.children` — псевдомассив **только дочерних тегов** (используется чаще всего).
  * `elem.firstChild` / `elem.lastChild` — первый/последний узел (включая текстовые).
  * `elem.firstElementChild` / `elem.lastElementChild` — первый/последний узел-тег.
  * `elem.previousElementSibling` / `elem.nextElementSibling` — соседи (предыдущий и следующий элементы на том же уровне).

-----

## 3. Свойства и атрибуты элементов

При построении DOM-дерева многие стандартные HTML-атрибуты становятся свойствами JS-объектов.

```html
<img class="image" src="https://picsum.photos/id/9/320/240" alt="A laptop" width="300" />
```

```javascript
const image = document.querySelector(".image");
console.log(image.src); // https://picsum.photos/id/9/320/240
```

Часто используемые свойства:

  * `value` — текущий текст внутри `input` или `textarea`.
  * `checked` — состояние чекбокса или радиокнопки (`true` / `false`).
  * `name` — значение атрибута `name` (важно для форм).

### 3.1 Свойство `textContent` и `innerHTML`

  * **`textContent`** — позволяет читать или менять **только текст** внутри элемента. Браузер игнорирует любые HTML-теги, переданные сюда (защита от XSS).
  >**XSS (Cross-Site Scripting, или Межсайтовый скриптинг)** — это тип хакерской атаки, при которой злоумышленник умудряется внедрить свой вредоносный JavaScript-код на твой сайт. А «защита от XSS» — это то, как мы не даем ему это сделать.

 ```javascript
const textEl = document.querySelector(".article-text");
textEl.textContent = "Привет, мир!"; 
```
  * **`innerHTML`** — позволяет читать или полностью заменять содержимое элемента вместе с HTML-тегами.
```javascript
const box = document.querySelector('.box');
box.innerHTML = '<h2>А вот и новый заголовок!</h2>
                 <button>Нажми меня</button>';
```
>📢 **Интересно**
>Используйте свойство `elem.innerHTML = ` для добавления только тогда, когда элемент `elem` пустой, или если нужно полностью заменить его содержимое.
>При исполльзовании свойства `elem.innerHTML += ` браузер полностью пересоздаёт всё содержимое элемента заново <br>
>Из-за этого:<br>
>❌ удаляются все старые DOM-элементы<br>
>❌ пропадают обработчики событий (addEventListener)<br>
>❌ может ухудшиться производительность<br>
>**Поэтому += — это быстрый, но не всегда безопасный способ**

### 3.2 Свойство `style` (Инлайновые стили)

Используется для работы с **инлайновыми** стилями элемента. Свойства пишутся в `camelCase` (например, `background-color` становится `backgroundColor`).

```javascript
const button = document.querySelector(".btn");
button.style.backgroundColor = "teal";
button.style.fontSize = "24px";
```

### 3.3 Работа с классами: `classList`

Объект `classList` предоставляет удобные методы для управления классами (намного лучше, чем перезаписывать свойство `className`).

  * `elem.classList.contains(cls)` — проверка наличия класса (`true`/`false`).
  * `elem.classList.add(cls)` — добавление класса.
  * `elem.classList.remove(cls)` — удаление класса.
  * `elem.classList.toggle(cls)` — переключатель (есть — удалит, нет — добавит).
  * `elem.classList.replace(old, new)` — замена класса.

**Пример: Переключение темной темы**

```javascript
const themeBtn = document.querySelector('.theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});
```

### 3.4 Атрибуты (`setAttribute`, `getAttribute`)

Доступ к произвольным HTML-атрибутам (особенно полезно для `data-*` атрибутов).
>**data- * атрибуты** — это специальные пользовательские атрибуты в HTML, которые позволяют программистам (то есть нам, разработчикам) хранить дополнительную, скрытую информацию прямо внутри HTML-тегов, чтобы потом легко забирать ее с помощью JavaScript.
>**Например:** Допустим, мы делаем интернет-магазин, и у нас есть карточка товара — смартфона.
>```javascript
  ><div class="product-card">
  >   <h3>iPhone 15</h3>
  >   <button class="buy-btn">Купить</button>
  ></div>
>```
>Нам нужно как-то сообщить нашему JavaScript-коду, что это за товар, какой у него артикул (ID) и сколько он стоит, чтобы при клике на кнопку «Купить» мы добавили в корзину правильную вещь. Мы могли бы спрятать эти данные в классах, но это неудобно и неправильно.
> Здесь нас спасают data-* атрибуты! Мы добавляем их прямо в HTML-тег:
>```javascript
  ><div class="product-card" data-product-id="4829" data-price="999" data-category="smartphones">
  >   <h3>iPhone 15</h3>
  >   <button class="buy-btn">Купить</button>
  ></div>
>```

  * `elem.hasAttribute(name)` — проверяет наличие (`true`/`false`).
  * `elem.getAttribute(name)` — получает значение.
  * `elem.setAttribute(name, value)` — устанавливает значение.
  * `elem.removeAttribute(name)` — удаляет атрибут.

```javascript
const img = document.querySelector('img');
img.setAttribute('title', 'Милый котик');
```

-----

## 4. Манипуляции с DOM

### 4.1 Создание элементов

```javascript
const div = document.createElement('div');
const p = document.createElement('p');

div.textContent = 'Это новый текст';
div.classList.add('container');
```

### 4.2 Вставка элементов в дерево

  * **`container.append(el1, el2, "текст")`** — добавляет в **конец** (внутрь) элемента.
  * **`container.prepend(el1)`** — добавляет в **начало** (внутрь) элемента.
  * **`container.before(el1)`** — вставляет **до** элемента (снаружи).
  * **`container.after(el1)`** — вставляет **после** элемента (снаружи).
>**Примечание:** Все эти четыре современных метода, работают по одному и тому же принципу и все они умеют принимать сразу несколько аргументов (как элементы, так и просто текст).

```javascript
   const messageBox = document.querySelector('.message-box');
   // Создаем первый элемент (иконку)

   const icon = document.createElement('span');
   icon.textContent = '👋 ';
 
   // Создаем второй элемент (имя пользователя)
   const userName = document.createElement('strong');
   userName.textContent = 'Alex';
   userName.style.color = 'blue';
  
   // Вставляем всё сразу за одну команду!
   // Порядок аргументов = порядок на странице
   messageBox.append(icon, userName, ', добро пожаловать на наш сайт!');
```
Кроме классических методов добавлений елементов может встечаться `appendChild` - это более старый синтаксис, но всё ещё рабочий. Главное отличие в том, что `appendChild` принимает только один DOM-элемент, нельзя передать строку, возвращает добавленный элемент.

**`insertAdjacentHTML`** — вставка HTML-строки в конкретную позицию. Это современный метод для добавления строки с HTML-тегами перед, после или внутрь элемента.
Решает проблему `innerHTML`, связанную с повторной сериализацией содержимого элемента при добавлении разметки к уже существующей.
```javascript
elem.insertAdjacentHTML(position, string);
```
Аргумент `position` — это строка, которая задаёт положение относительно элемента `elem`.<br>
Принимает одно из четырёх значений:<br>
* **"beforebegin"** — перед `elem`
* **"afterbegin"** — внутри `elem`, перед всеми дочерними элементами
* **"beforeend"** — внутри `elem`, после всех дочерних элементов
* **"afterend"** — после elem

```html
<div class="container">
содержимое
</div>
```

```javascript
container.insertAdjacentHTML('beforeend', '<p>В конец контейнера</p>');
```
**‼️ Внимание**, главные отличия `insertAdjacentHTML` от методов `container.append...`:

* С помощью `insertAdjacentHTML` мы передаём строку HTML, и браузер парсит её, превращает в DOM-узлы и вставляет в нужное место. То есть мы передаём браузеру чертёж, по которому он сам всё создаёт и добавляет в HTML-разметку.
* `container.append()` — здесь мы работаем напрямую с DOM-узлами, и готовые элементы мы передаём в браузер. То есть браузер ничего не парсит, ничего не создаёт, а просто берёт наш готовый вариант и добавляет его в нужное место HTML-разметки. Простыми словами, `container.append()` — это работа с реальными стройматериалами (кирпичами), из которых мы строим вручную.

**Когда что использовать:**

✅ **insertAdjacentHTML:**
* когда у тебя есть готовая HTML-строка, например, шаблон: `box.insertAdjacentHTML('beforeend', '<li class="item">Товар</li>');`
* но в целях кибербезопасности он может быть уязвим к XSS (если вставлять пользовательский ввод), и вообще работа со строками менее контролируема.

✅ **append:**
* когда создаёшь элементы через JS;
* когда есть обработчики событий;
* когда важна безопасность (лучше подходит для сложной логики).
  
### 4.3 Замена и удаление элементов
Чтобы удалить элемент, используется метод `remove()`. Он вызывается на элементе `elem`, который необходимо удалить.

```javascript
const element = document.querySelector('.remove-me');

// Удаление самого элемента
element.remove();

// Замена элемента
const oldElement = document.querySelector('.old');
const newElement = document.createElement('div');
oldElement.replaceWith(newElement);

// Быстрая очистка контейнера от всех детей
container.innerHTML = '';
```

-----

## 💻 Практические задания
**Задание 1: Создать структуру:** Создай через JavaScript `div.container`с заголовком, параграфом и кнопкой внутри. Добавь всё в `body`.
<details>
  <summary>💡 Посмотреть решение</summary>
 
```javascript
// Создаем элементы
const container = document.createElement('div');
const h1 = document.createElement('h1');
const p = document.createElement('p');
const button = document.createElement('button');

// Добавляем классы и текст
container.className = 'container';
h1.textContent = 'Заголовок';
p.textContent = 'Это параграф';
button.textContent = 'Кнопка';

// Собираем структуру (добавляем внутрь контейнера)
container.append(h1, p, button); // Можно передать сразу несколько через append

// Добавляем в body
document.body.append(container);
```
</details>

**Задание 2: Изменить существующий элемент:** Найди `div id="box" class="old"`. Измени текст на `Новый текст`, класс на `new`, добавь атрибут `data-status="active"` и сделай фон `lightblue`. 
<details>
  <summary>💡 Посмотреть решение</summary>
 
```javascript
const box = document.getElementById('box');

box.textContent = 'Новый текст';
box.className = 'new';
box.setAttribute('data-status', 'active');
box.style.backgroundColor = 'lightblue';
```
</details>

**Задание 3: Создать список** Создай список `<ul>` с 5 элементами `<li>` и текстом: `"Элемент 1", "Элемент 2" и т.д.` через цикл. 
<details>
  <summary>💡 Посмотреть решение</summary>
 
```javascript
const ul = document.createElement('ul');

for (let i = 1; i <= 5; i++) {
    const li = document.createElement('li');
    li.textContent = `Элемент ${i}`;
    ul.appendChild(li);
}

document.body.appendChild(ul);
```
</details>

**Задание 4: Добавление в разные позиции** Дан контейнер `#middle` с параграфом. Добавь параграфы `"Начало"` перед элементом `middle`, `"Конец"` после элемента `middle` и заголовки `<h2>` до и после самого контейнера.
<details>
  <summary>💡 Посмотреть решение</summary>
 
```javascript
dococument.getElementById('container');
const middle = document.getElementById('middle');

// В начало и в конец внутри container
const pStart = document.createElement('p');
pStart.textContent = 'Начало';
middle.before(pStart); // Вставляем перед middle

const pEnd = document.createElement('p');
pEnd.textContent = 'Конец';
middle.after(pEnd); // Вставляем после middle

// Снаружи container
const h2Before = document.createElement('h2');
h2Before.textContent = 'Перед контейнером';
container.before(h2Before);

const h2After = document.createElement('h2');
h2After.textContent = 'После контейнера';
container.after(h2After);
```
</details>

**Задание 5: Удаление элементов** Удали из списка все элементы с классом `remove-me` и отдельно удали самый первый элемент списка. 
<details>
  <summary>💡 Посмотреть решение</summary>
 
```javascript
// Удаляем все элементы с классом remove-me
const removeElements = document.querySelectorAll('.remove-me');
removeElements.forEach(el => el.remove());

// Удаляем первый элемент списка
const list = document.getElementById('list');
list.firstElementChild.remove();
```
</details>

**Задание 6: Замена элемента** Замени `<p id="old">` на новый `<div class="new">` с текстом `"Новый div"`.
<details>
  <summary>💡 Посмотреть решение</summary>
 
```javascript
const oldElement = document.getElementById('old');

const newElement = document.createElement('div');
newElement.className = 'new';
newElement.textContent = 'Новый div';

oldElement.replaceWith(newElement);
```
</details>

**Задание 7: Создать таблицу** Напиши код, который генерирует таблицу 3x3 с числами от 1 до 9 в ячейках.
<details>
  <summary>💡 Посмотреть решение</summary>
 
```javascript
const table = document.createElement('table');
let counter = 1;

for (let i = 0; i < 3; i++) {
    const tr = document.createElement('tr');
    
    for (let j = 0; j < 3; j++) {
        const td = document.createElement('td');
        td.textContent = counter;
        counter++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

document.body.appendChild(table);
```

</details>

**Задание 8: Работа с классами** Дан `<div id="box" class="red large">`. Добавь класс `active`, удали `large`, переключи `red` и замени `active` на `inactive`.
<details>
  <summary>💡 Посмотреть решение</summary>
 
```javascript
const box = document.getElementById('box');

box.classList.add('active');
box.classList.remove('large');
box.classList.toggle('red');
box.classList.replace('active', 'inactive');
```
</details>

**Задание 9: Создать карточки товаров** Есть массив объектов. Создай для каждого товара карточку с картинкой, заголовком и ценой, и добавь их в DOM.
```javascript
const products = [
    { name: 'Товар 1', img: 'product1.jpg', price: 1000 },
    { name: 'Товар 2', img: 'product2.jpg', price: 2000 },
    { name: 'Товар 3', img: 'product3.jpg', price: 3000 }
];
```

<details>
  <summary>💡 Посмотреть решение</summary>
 
```javascript
products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    
    const img = document.createElement('img');
    img.src = product.img;
    img.alt = product.name;
    
    const h3 = document.createElement('h3');
    h3.textContent = product.name;
    
    const p = document.createElement('p');
    p.className = 'price';
    p.textContent = `${product.price} крон`; // Используем шаблонные строки
    
    // Добавляем все элементы в карточку, а карточку в body
    div.append(img, h3, p);
    document.body.appendChild(div);
});
```
</details>

**Задание 10: Навигация по DOM** Внутри элемента `#parent` найди: второго ребенка измени текст, последнего ребёнка и добавь класс, первого ребёнка и добавь перед ним новый элемент.
<details>
  <summary>💡 Посмотреть решение</summary>
 
```javascript
const parent = document.getElementById('parent');

// Второй дочерний элемент (индекс 1)
parent.children[1].textContent = 'ВТОРОЙ';

// Последний дочерний элемент
parent.lastElementChild.classList.add('last');

// Добавить перед первым
const newDiv = document.createElement('div');
newDiv.textContent = 'Нулевой';
parent.firstElementChild.before(newDiv);
```
</details>

-----

## 🛠 Полезные ссылки

  * **[learn.javascript.ru: DOM-дерево](https://learn.javascript.ru/dom-nodes)** — подробнее о том, как браузер видит страницу.
  * **[learn.javascript.ru: Поиск getElement\*, querySelector\*](https://learn.javascript.ru/searching-elements-dom)** — разница между живыми и статичными коллекциями.
  * **[learn.javascript.ru: Изменение документа](https://learn.javascript.ru/modifying-document)** — шпаргалка по методам `append`, `prepend`, `before`, `after`.



### 🗺 Навигация:

[⬅ Лекция 7: Callback и методы массивов](./lekce7.md) | [🏠 В оглавление](./README.md) | [Лекция 9: События ➡](./lekce9.md)
