# Лекция 10: Анимации (CSS переходы, CSS анимации, 2D-трансформации)

## 1. CSS Переходы (Transitions)

**Анимация** — это процесс плавного изменения визуальных свойств элементов. Она оживляет интерфейс, делая взаимодействие с сайтом интуитивным.

### ✨ Зачем нужна анимация?

* **Привлекает внимание:** выделяет кнопки или уведомления.
* **Улучшает UX:** делает смену состояний естественной для глаза.
* **Добавляет стиль:** подчеркивает индивидуальность проекта.
* **Информативность:** объясняет процесс загрузки или перемещения данных.

### Основные свойства управления переходом:

1. `transition-property`: какое именно свойство анимируем (`background-color`, `transform`, `all`).
2. `transition-duration`: время анимации (`500ms`, `2s`).
3. `transition-timing-function`: как распределяется скорость (функция времени).
4. `transition-delay`: задержка перед началом.

#### Пример:

```css
.box {
    width: 200px;
    height: 200px;
    background-color: tomato;
    
    /* Сокращенная запись: свойство | время | функция | задержка */
    transition: background-color 500ms linear 0s, 
                transform 500ms ease-in-out 0s;
}

.box:hover {
    background-color: blue;
    transform: rotate(360deg) scale(1.2);
}

```

---

## 1.1 Функции распределения времени (`timing-function`)

Описывают поведение скорости анимации:

* `linear` — равномерно от начала до конца.
* `ease` — медленный старт, ускорение и замедление в конце (по умолчанию).
* `ease-in` — медленно в начале, затем ускорение.
* `ease-out` — быстро в начале, затем замедление.
* `ease-in-out` — медленно в начале и в конце.
* `cubic-bezier(x1, y1, x2, y2)` — ручная настройка кривой ускорения.
* *Инструмент:* [cubic-bezier.com](https://cubic-bezier.com/)



---

## 2. Производительность: что анимировать?
![Образец](./images/how.png)
Браузер отрисовывает страницу в несколько этапов:

1. **Style** → 2. **Layout** (геометрия) → 3. **Paint** (отрисовка пикселей) → 4. **Composite** (сборка слоев).

Чтобы анимация была плавной (60 FPS) и не тормозила компьютер пользователя, рекомендуется анимировать только два свойства:

1. **`opacity`** (прозрачность).
2. **`transform`** (перемещение `translate`, масштаб `scale`, поворот `rotate`).

> **Важно:** Анимация свойств типа `width`, `height` или `margin` заставляет браузер пересчитывать геометрию всего сайта (**Layout**), что очень «дорого» для производительности. **Всегда заменяйте `margin-left` на `transform: translateX()`.**

---

## 2.1 Эффект выезжающего контента (`overflow: hidden`)

Используется для создания декоративных панелей (overlay), которые «прячутся» за границами родителя.

```css
.box {
    position: relative;
    width: 300px;
    height: 300px;
    overflow: hidden; /* Скрывает всё, что выходит за границы */
}

.overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: aqua;
    
    /* Прячем блок, сдвинув его на 100% влево */
    transform: translateX(-100%); 
    transition: transform 250ms ease;
}

.box:hover .overlay {
    /* Возвращаем блок на место */
    transform: translateX(0);
}

```

---

## 3. CSS Анимация (`@keyframes`)

В отличие от переходов (`transition`), анимация:

* Не требует обязательного события (типа `:hover`).
* Может иметь бесконечное количество промежуточных точек.
* Может зацикливаться (`infinite`).

### Создание анимации:

Сначала описываем ключевые кадры через `@keyframes`, затем применяем их к элементу.

```css
@keyframes moveAndColor {
  0% {
    transform: translateX(0);
    background-color: #ff8a80;
  }
  50% {
    transform: translateX(100px);
    background-color: #80d8ff;
  }
  100% {
    transform: translateX(0);
    background-color: #a7ffeb;
  }
}

.box3 {
    width: 200px;
    height: 100px;
    background-color: #ff8a80;
    /* Применяем анимацию */
    animation-name: moveAndColor;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite; /* бесконечно */
    animation-direction: alternate;      /* туда-обратно */
}

```

### Свойства `animation`:

* `animation-iteration-count`: сколько раз повторить (число или `infinite`).
* `animation-direction`: направление (`normal`, `reverse`, `alternate` — туда-обратно).
* `animation-fill-mode`: в каком состоянии остается элемент после финала (`forwards` — замереть на последнем кадре).
* `animation-play-state`: пауза или запуск (`running`, `paused`).

---

### 🗺 Навигация:

[⬅ Лекция 9: Векторная графика, SVG-документы, SVG-спрайты,](./lekce9.md) | [🏠 В оглавление](./README.md) | [Лекция 11: CSS-методологии ➡](./lekce11.md)