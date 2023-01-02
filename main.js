// Выбор случайного места для клада

// Получить случайное число от 0 до size-1

const getRandomNumber = function (size) {
    return Math.floor(Math.random() * size);
};

// Вычисляем расстояние от клика до клада

const getDistance = function (event, target) {
    const diffX = event.offsetX - target.x;
    const diffY = event.offsetY - target.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
};

// Сообщаем игроку, насколько он близок к цели
// Получить для расстояния строку подсказки

const getDistanceHint = function (distance) {
    if (distance < width / 100 * 3) {
        return "Обожжешься!";
    } else if (distance < width / 100 * 5) {
        return "Очень горячо!";
    } else if (distance < width / 100 * 10) {
        return "Горячо";
    } else if (distance < width / 100 * 20) {
        return "Тепло";
    } else if (distance < width / 100 * 40) {
        return "Холодно";
    } else if (distance < width / 100 * 80) {
        return "Очень холодно";
    } else {
        return "Замерзнешь";
    }
};

// Создаем переменные

const map = document.querySelector('#map'),
      restClicks = document.querySelector('#restclicks'),
      finDistance = document.querySelector('#distance'),
      crosshairs = document.querySelector('#crosshairs'),
      heading = document.querySelector('#heading'),
      restart = document.querySelector('button');

const width = map.getAttribute('width'),
      height = map.getAttribute('height'),
      clickAttempt = 25;

// Подсчет кликов

let clicks = 0;

// Выбор случайного места для клада

const target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
};

// Обработчик кликов

map.addEventListener('click', (event) => {
    // Здесь будет код обработчика
    clicks++;

    if (clicks < clickAttempt) {
        // Получаем расстояние от места клика до клада
        let distance = getDistance(event, target);
        // Преобразуем расстояние в подсказку
        let distanceHint = getDistanceHint(distance);
        // Записываем в элемент #distance новую подсказку
        switch (distanceHint) {
            case "Очень холодно":
            case "Замерзнешь":
            case "Холодно":
            case "Тепло":
            case "Горячо":
            case "Очень горячо!":
                restClicks.textContent = `Осталось попыток ${clickAttempt - clicks}`;
                break;
        }
        finDistance.textContent = distanceHint;
    
        // Если клик был достаточно близко, поздравляем с победой
        if (distance < width / 100 * 2) {
            // Перемещение укзателя мышки
            crosshairs.style.left = `${target.x}px`;
            crosshairs.style.top = `${target.y}px`;
         
            heading.textContent = `Клад найден! Сделано попыток: ${clicks}`;
            heading.style.color = 'rgb(255, 127, 80)';
            finDistance.textContent = '';
            // alert("Клад найден! Сделано попыток: " + clicks);  
        }
    } else {
        alert("КОНЕЦ ИГРЫ!");
    }
});

restart.addEventListener('click', () => document.location.reload());