# Лекция 14: Роутинг и архитектура SPA

## 1. От многостраничных сайтов к SPA

До того как мы с вами познакомились со сборщиками проектов, для создания сайта использовался классический подход:
На каждую новую страницу создавался отдельный HTML-файл (`index.html`, `about.html`, `contacts.html`). При переходе по ссылкам браузер полностью стирал текущую страницу, мигал белым экраном и заново скачивал с сервера новый HTML-документ.

Но в современной разработке правит бал **SPA (Single Page Application)**.
SPA — это веб-приложение, которое использует всего одну единственную HTML-страницу (`index.html`). Она загружается один раз, а весь дальнейший контент на ней меняется динамически с помощью JavaScript, без перезагрузки страницы в браузере.

**Преимущества SPA:**

* **Высокая скорость работы:** мы не скачиваем HTML заново, а только получаем нужные данные.
* **Плавные переходы:** нет "моргания" экрана при смене страниц.
* **Нативный опыт:** поведение, неотличимое от полноценных десктопных или мобильных приложений.

---

## 2. Что такое Роутинг?

Если у нас всего одна страница `index.html`, как сделать так, чтобы пользователь мог переходить по разным ссылкам (например, в корзину или профиль), а адресная строка в браузере менялась? На помощь приходит маршрутизация.

**Роутинг (маршрутизация)** во фронтенде — это механизм, который следит за тем, что написано в адресной строке браузера (URL), и в зависимости от этого адреса показывает пользователю нужный кусочек интерфейса (компонент или функцию).

> **Проще говоря:** Роутер — это регулировщик. Он видит, что пользователь ввел `/about`, и говорит JavaScript: *"Так, покажи-ка нам сейчас блок с информацией о компании, а все остальное спрячь"*.

**Основные типы роутов:**

* **Статические (Static Routes):** Маршруты с фиксированным путем (например, `/about`, `/contacts`). Они ведут на конкретную, заранее определенную страницу.
* **Динамические (Dynamic Routes):** Содержат переменные части, например, `/user/:id`. Позволяют загружать профиль конкретного пользователя в зависимости от переданного ID (например, `/user/123`).
* **Вложенные (Nested Routes):** Маршруты внутри других маршрутов. Нужны, когда на странице меняется только маленькая часть. Например, в личном кабинете: `/dashboard/profile` и `/dashboard/settings` — боковое меню остается на месте, меняется только контент справа.
* **Параллельные (Parallel Routes):** Позволяют рендерить несколько независимых страниц одновременно на одном экране (например, отобразить модальное окно поверх ленты новостей).
* **API-роуты:** Серверные маршруты для обмена данными. Они не возвращают HTML, а отдают «чистые» данные в формате JSON (например, `/api/users`).

---

## 3. Как это работает под капотом браузера?

JavaScript использует два основных подхода для реализации роутинга:

* **Hash-роутинг:** Использование символа `#` в URL (например, `https://site.com/#/about`). Самый простой, но устаревший способ. Основан на отслеживании события `window.addEventListener('hashchange', ...)`.
* **History API:** Современный подход без `#` (например, `https://site.com/about`). Работает через встроенный в браузер объект `window.history.pushState()`.

---

## 4. Практика: Пишем свой первый роутер

**Алгоритм создания роутера:**

1. Создаем объект со списком маршрутов (где ключ — это URL, а значение — функция-обработчик или кусок HTML).
2. Пишем функцию, которая читает текущий URL и достает нужный контент из объекта.
3. Вешаем слушатели на ссылки, чтобы при клике запускалась наша функция, а не стандартный переход браузера.

### Архитектура проекта (Vite)

Проект собирается с помощью Vite, поэтому структура файлов будет следующей:

```text
📁 src/
  📁 components/
     📄 header.js
     📄 footer.js
  📁 pages/
     📄 About.js
     📄 Contacts.js
     📄 Home.js
  📄 main.js     <-- Мозг нашего проекта, сюда подключаем всю логику
  📄 router.js   <-- Файл с нашими роутами
📄 index.html 

```

### Код модулей

**`src/components/header.js`**

```javascript
export function Header() {
    return `
        <header style="background: #333; color: white; padding: 15px;">
            <nav style="display: flex; gap: 15px;">
                <a href="/" data-link style="color: white; text-decoration: none;">🏠 Главная</a>
                <a href="/about" data-link style="color: white; text-decoration: none;">📖 О нас</a>
                <a href="/contacts" data-link style="color: white; text-decoration: none;">📞 Контакты</a>
            </nav>
        </header>
    `;
}

```

**`src/router.js`**

```javascript
import { About } from "./pages/About";
import { Contacts } from "./pages/Contacts";
import { Home } from "./pages/Home";

// Экспортируем функцию навигации для использования при кликах
export const navigateTo = (url) => {
    // history.pushState принимает 3 параметра:
    // 1. state (null) — данные, привязанные к переходу.
    // 2. title (null) — заголовок (браузеры его обычно игнорируют).
    // 3. url — сам адрес, который покажется в адресной строке.
    history.pushState(null, null, url);  
    router();
};

// Главная функция роутера
export const router = async () => {
    // База путей использует функции страниц
    const routes = [
        { path: "/", view: Home },
        { path: "/about", view: About },
        { path: "/contacts", view: Contacts }
    ];

    // Проверяем текущий URL (location.pathname) на совпадение с нашими роутами
    const potentialMatches = routes.map(route => { 
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });
        
    // Ищем объект, у которого isMatch === true
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch); 

    // Если совпадений нет (404 ошибка)
    if (!match) { 
        match = {
            // Оборачиваем view в объект route для сохранения структуры 
            // (чтобы вызов match.route.view() ниже сработал корректно)
            route: { view: () => "<h1>404</h1><p>Страница не найдена</p>" },  
            isMatch: true
        };
    }

    // Рендерим нужный компонент. 
    // Обрати внимание: view() — это функция, поэтому мы ее вызываем!
    const routerView = document.getElementById('router-view');
    routerView.innerHTML = match.route.view();  
};

```

**`src/main.js`**

```javascript
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js'; // Предполагается, что файл существует
import { router, navigateTo } from './router.js';

const root = document.getElementById('root');

// 1. СТРОИМ МАКЕТ
function initLayout() {
    root.innerHTML = `
        ${Header()}
        <main id="router-view" style="min-height: 70vh; padding: 20px;"></main>
        ${Footer()}
    `;
}

initLayout();

// 2. ВЕШАЕМ СЛУШАТЕЛИ СОБЫТИЙ

// Кнопки Назад/Вперед в браузере (событие popstate)
window.addEventListener("popstate", router);  

// Делегирование событий клика по ссылкам меню
document.addEventListener("DOMContentLoaded", () => {  
    // Вешаем слушатель на body, чтобы ловить клики динамических элементов
    document.body.addEventListener("click", (e) => { 
        // Если кликнули по элементу с атрибутом data-link
        if (e.target.matches("[data-link]")) { 
            e.preventDefault(); // Отменяем стандартную перезагрузку страницы
            navigateTo(e.target.href); // Запускаем нашу навигацию
        }
    });

    // 3. ПЕРВЫЙ ЗАПУСК РОУТЕРА
    // Отрисовываем стартовую страницу при первой загрузке приложения
    router(); 
});

```

### ⚙️ Основы браузера и History API (Фундамент)

* **[MDN Web Docs: History API](https://developer.mozilla.org/ru/docs/Web/API/History_API)** — Главная энциклопедия веб-разработчика. Здесь подробно описано, как работают `pushState`, `replaceState` и как браузер управляет историей.
* **[MDN Web Docs: Событие popstate](https://developer.mozilla.org/ru/docs/Web/API/Window/popstate_event)** — Подробности о том, как правильно перехватывать нажатия кнопок «Вперед/Назад».
* **[Илья Кантор (learn.javascript.ru): Page Lifecycle](https://learn.javascript.ru/onload-ondomcontentloaded)** — Отличная статья о том, как загружается страница и что на самом деле означает `DOMContentLoaded`, который мы использовали.

### 📖 Статьи и туториалы по Vanilla JS SPA

* **[Build a Single Page Application with JavaScript (No Frameworks)](https://www.youtube.com/watch?v=6BozpmSjk-Y)** *(YouTube, канал dcode)* — Одно из лучших видеоруководств по созданию роутера на чистом JS. Очень похоже на ту архитектуру, которую мы с тобой построили.
* **[Делегирование событий (learn.javascript.ru)](https://learn.javascript.ru/event-delegation)** — Если захочется еще раз освежить в памяти, почему мы вешали слушатель кликов на весь `body` или `postsContainer`, а не на каждую кнопку отдельно.

---

### 🗺 Навигация:

[⬅ Лекция 13: Инструменты: Vite, ES6 Modules](./lekce13.md) | [🏠 В оглавление](./README.md) | [Лекция 15: Объектно-ориентированное программирование (ООП) ➡](./lekce15.md)
