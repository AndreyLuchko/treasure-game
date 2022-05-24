// Выбор случайного места для клада

// Получить случайное число от 0 до size-1

var getRandomNumber = function (size) {
    return Math.floor(Math.random() * size);
};

// Вычисляем расстояние от клика до клада

var getDistance = function (event, target) {
    var diffX = event.offsetX - target.x;
    var diffY = event.offsetY - target.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
};

// Сообщаем игроку, насколько он близок к цели
// Получить для расстояния строку подсказки

var getDistanceHint = function (distance) {
    if (distance < 10) {
        return "Обожжешься!";
    } else if (distance < 20) {
        return "Очень горячо!";
    } else if (distance < 40) {
        return "Горячо";
    } else if (distance < 80) {
        return "Тепло";
    } else if (distance < 160) {
        return "Холодно";
    } else if (distance < 320) {
        return "Очень холодно";
    } else {
        return "Замерзнешь";
    }
};

// Создаем переменные

var width = 400;
var height = 400;

// Подсчет кликов

var clicks = 0;

// Выбор случайного места для клада

var target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
};

var clickAttempt = 25;

// Обработчик кликов

$("#map").click(function (event) {
    // Здесь будет код обработчика
    clicks++;

    if (clicks < clickAttempt) {
        // Получаем расстояние от места клика до клада
        var distance = getDistance(event, target);
        // Преобразуем расстояние в подсказку
        var distanceHint = getDistanceHint(distance);
        // Записываем в элемент #distance новую подсказку
        switch (distanceHint) {
            case "Холодно":
            case "Тепло":
            case "Горячо":
            case "Очень горячо!":
                $("#restclicks").text("Осталось попыток " + (clickAttempt - clicks));
                break;
        };
        $("#distance").text(distanceHint);
    
        // Если клик был достаточно близко, поздравляем с победой
        if (distance < 8) {
            // Перемещение укзателя мышки
            $("#crosshairs").offset({
                        left: target.x,
                        top: target.y
                    });
            $("#heading").text("Клад найден! Сделано попыток: " + clicks);
            // alert("Клад найден! Сделано попыток: " + clicks);
           
        };
    } else {
        alert("КОНЕЦ ИГРЫ!");
    };
});