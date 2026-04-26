# Лекция 12: Создание собственного API и HTTP запросы (работа с CRUD (Axios))

В реальных приложениях фронтенд всегда взаимодействует с сервером через API. 

**Зачем создавать собственное (Mock) API на этапе обучения?**
* Понять, как работает «бэкенд» и база данных.
* Натренировать базовые операции с данными (CRUD) на реальных HTTP-запросах.
* Разрабатывать и отлаживать пользовательский интерфейс (UI) независимо, даже если реальный бэкенд еще не готов.

Собственное API (например, с помощью пакета `json-server`) — это полноценная имитация серверной части, которая позволяет работать с данными так же, как в production-приложении.

---

## 1. Запуск собственного сервера (json-server)

**🟩 Шаг 1 — Установка**
В терминале (PowerShell, Terminal, VS Code) устанавливаем пакет глобально:
```bash
npm install -g json-server
```
*(Проверить установку: `json-server --version`)*

**🟩 Шаг 2 — Создаем «Базу данных»**
Создаем файл `db.json` в корне проекта. Это и будет наш сервер.
```json
{
  "posts": [
    { "id": "1", "author": "Анна Новакова", "content": "Всем привет!", "likes": 5 },
    { "id": "2", "author": "Петр Свобода", "content": "Изучаю JavaScript", "likes": 2 }
  ]
}
```

**🟩 Шаг 3 — Запуск сервера**
```bash
json-server --watch db.json --port 3001
```
*(Если команда выше не работает, используйте `npx json-server --watch db.json --port 3001`)*

> **В чем разница: npm vs npx?**
> * `npm` (Node Package Manager) — устанавливает пакеты на компьютер или в проект.
> * `npx` (Node Package Execute) — скачивает, запускает пакет единоразово и удаляет, не засоряя систему.

Теперь ваше API доступно по адресу: `http://localhost:3001/posts`.

---

## 2. Что такое CRUD?

В базовом курсе архитектура REST API обычно рассматривается через 4 базовые операции с данными — **CRUD**. Каждой операции соответствует свой HTTP-метод:

* **C** (Create) → создание нового объекта (`POST`-запрос).
* **R** (Read) → получение данных (`GET`-запрос).
* **U** (Update) → обновление существующего объекта (`PUT` — полное, `PATCH` — частичное).
* **D** (Delete) → удаление объекта (`DELETE`-запрос).

---

## 3. Библиотека Axios vs Fetch

В прошлой лекции мы использовали встроенный `fetch`. В реальных проектах разработчики чаще выбирают библиотеку **Axios**. Почему?

1. **Автоматический JSON:** В `fetch` нужно писать `await res.json()`. В Axios ответ уже преобразован в JavaScript-объект: `const data = res.data;`.
2. **Умная обработка ошибок:** Для `fetch` ответы с ошибкой 404 или 500 не считаются ошибкой сети, и код идет дальше. В Axios любой HTTP-ответ с кодом ошибки (400-500) автоматически отправляется в блок `catch`.
3. **Универсальность:** Axios одинаково хорошо работает и в браузере, и на сервере (Node.js).

---

Чтобы наглядно понять, как работают методы **POST, PUT, PATCH и DELETE** под капотом, попробуйте этот интерактивный тренажер. Нажимайте на кнопки и смотрите, как меняется JSON-база данных и какой HTTP-запрос отправляется по сети:

```json?chameleon
{"component":"LlmGeneratedComponent","props":{"height":"750px","prompt":"Создать интерактивный симулятор REST API и CRUD операций. Objective: Показать, как HTTP-методы (GET, POST, PUT, PATCH, DELETE) изменяют JSON базу данных. Data State: Стартовый массив 'posts': [{ 'id': '1', 'author': 'Анна', 'content': 'Привет!', 'likes': 0 }]. Strategy: Standard Layout. Inputs: Кнопки для выполнения конкретных запросов: 'GET /posts' (обновить данные), 'POST /posts' (создать новый случайный пост), 'PATCH /posts/1' (добавить лайк первому посту), 'PUT /posts/1' (полностью перезаписать первый пост), 'DELETE /posts/1' (удалить первый пост). Behavior: Разделить интерфейс на две основные зоны. Левая зона — Панель управления с кнопками-методами. Правая зона — 'Сервер', состоящая из двух блоков: 1) 'Network Log' (Консоль сети), где появляется строчка с отправленным запросом и статусом (например, '➡️ POST /posts... 201 Created'), 2) 'db.json (База данных)', где в реальном времени красиво отображается текущий массив 'posts' в формате JSON. При клике на кнопки в левой панели, обновлять Network Log и соответствующим образом изменять JSON в правой панели. Интерфейс на русском языке.","id":"im_f27ea67dc5cef5eb"}}
```

---

## 4. Практика: Моя социальная сеть

Давайте напишем интерфейс, который будет использовать все методы CRUD через `axios` для работы с нашим `json-server`.

**HTML:**
```html
<h1>Моя социальная сеть</h1>
<input type="text" id="author" placeholder="Имя">
<textarea id="content" placeholder="Напиши что-нибудь..."></textarea>
<button id="submitPost">Добавить пост</button>
<hr>
<ul id="postList"></ul>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

**JavaScript:**
```javascript
const postList = document.getElementById("postList");
const submitBtn = document.getElementById("submitPost");
const authorInput = document.getElementById("author");
const contentInput = document.getElementById("content");

// Переменная для хранения ID редактируемого поста
let editPostId = null;

// ============================
// 1. ЧТЕНИЕ (READ) -> GET
// ============================
const loadPosts = async () => {
    try {
        const res = await axios.get("http://localhost:3001/posts");
        const data = res.data; // Данные уже готовы к работе!
        
        postList.innerHTML = ""; // Очищаем список перед рендером

        data.forEach(post => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${post.author}</strong>: ${post.content}<br>
                <small>💬 Лайки: ${post.likes || 0}</small><br><br>
            `;

            // Кнопка Лайк (PATCH)
            const btnLike = document.createElement("button");
            btnLike.textContent = "❤️ Лайк";
            btnLike.addEventListener("click", () => likePost(post));

            // Кнопка Редактировать
            const btnEdit = document.createElement("button");
            btnEdit.textContent = "✏️ Ред.";
            btnEdit.addEventListener("click", () => openEditForm(post));

            // Кнопка Удалить (DELETE)
            const btnDel = document.createElement("button");
            btnDel.textContent = "🗑️ Удалить";
            btnDel.addEventListener("click", () => deletePost(post.id));

            li.append(btnLike, btnEdit, btnDel);
            postList.appendChild(li);
        });
    } catch (error) {
        console.error("Ошибка загрузки постов", error);
    }
};

// Загружаем посты при старте страницы
loadPosts();

// ============================
// 2. СОЗДАНИЕ (CREATE) -> POST
//    ОБНОВЛЕНИЕ (UPDATE) -> PUT
// ============================
submitBtn.addEventListener("click", async () => {
    const author = authorInput.value.trim();
    const content = contentInput.value.trim();

    if (!author || !content) {
        alert("Заполните имя и текст поста.");
        return; 
    }

    try {
        if (editPostId) {
            // Если есть editPostId, значит мы редактируем старый пост (PUT)
            await axios.put(`http://localhost:3001/posts/${editPostId}`, {
                author: author,
                content: content,
                likes: 0 // PUT перезаписывает объект целиком!
            });
            editPostId = null;
            submitBtn.textContent = "Добавить пост";
        } else {
            // Иначе создаем новый пост (POST)
            await axios.post("http://localhost:3001/posts", {
                id: String(Date.now()), // Сервер требует строковый ID
                author: author,
                content: content,
                likes: 0 
            });
        }

        // Очищаем форму и обновляем список
        authorInput.value = "";
        contentInput.value = "";
        loadPosts();

    } catch (error) {
        console.error("Ошибка при сохранении поста", error);
    }
});

// ============================
// 3. УДАЛЕНИЕ (DELETE) -> DELETE
// ============================
async function deletePost(id) {
    try {
        await axios.delete(`http://localhost:3001/posts/${id}`);
        loadPosts(); // Обновляем экран
    } catch (error) {
        console.error("Ошибка при удалении поста", error);
    }
}

// ============================
// 4. ЧАСТИЧНОЕ ОБНОВЛЕНИЕ -> PATCH
// ============================
async function likePost(post) {
    try {
        // PATCH меняет только одно свойство, не трогая остальные
        await axios.patch(`http://localhost:3001/posts/${post.id}`, {
            likes: (post.likes || 0) + 1
        });
        loadPosts(); // Обновляем экран
    } catch (error) {
        console.error("Ошибка при лайке поста", error);
    }
}

// ============================
// 5. ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ (Подготовка к PUT)
// ============================
function openEditForm(post) {
    authorInput.value = post.author;
    contentInput.value = post.content;
    submitBtn.textContent = "Сохранить изменения";
    editPostId = post.id; // Запоминаем ID, чтобы POST превратился в PUT
}
```
### 🛠 Полезные онлайн-инструменты

* **[SassMeister](https://www.google.com/search?q=https://www.sassmeister.com/)** — лучший онлайн-компилятор. Если под рукой нет VS Code, можно проверить любую идею прямо в браузере.
* **[BeautifyTools Sass to CSS](https://www.google.com/search?q=https://beautifytools.com/sass-to-css-converter.php)** — быстрый конвертер, если нужно перегнать старый кусок кода.

---

### 🗺 Навигация:

[⬅ Лекция 11: Асинхронность](./lekce11.md) | [🏠 В оглавление](./README.md) | [Лекция 13: Сборшик проектов Vite ➡](./lekce13.md)
