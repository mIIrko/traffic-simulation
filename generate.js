var Generator = (function () {

    function accelerate(cars, maxSpeed) {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].speed < maxSpeed) {
                cars[i].speed = cars[i].speed + 1;
            }
        }
        return cars;
    }

    function brake(cars, amountOfCars, cells) {
        for (var i = 0; i < cars.length; i++) {
            var positionOfNextCar = cars[(i + 1) % amountOfCars].position;
            var distance = ((positionOfNextCar + cells) - cars[i].position) % cells - 1;
            // breaking
            if (distance < parseInt(cars[i].speed)) {
                cars[i].speed = distance;
            }
        }
        return cars;
    }

    function dawdle(cars, dawdleProbability) {
        for (var i = 0; i < cars.length; i++) {
            // (cars[i] > 0 was ist besser?)
            if ((cars[i].speed > 0) && Math.random() < dawdleProbability) {
                cars[i].speed = cars[i].speed - 1;
            }
        }
        return cars;
    }

    function move(cars, cells) {
        for (var i = 0; i < cars.length; i++) {
            cars[i].position = (cars[i].position + cars[i].speed) % cells;
        }
        return cars;
    }

    function getRandomSpeed(maxSpeed) {
        return Math.floor((Math.random() * maxSpeed) + 1);
    }

    // http://stackoverflow.com/a/1484514
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return {
        accelerate: accelerate,
        brake: brake,
        dawdle: dawdle,
        move: move,
        getRandomColor: getRandomColor,
        getRandomSpeed: getRandomSpeed
    };
})();
