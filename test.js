var testCycles = 40;

var testParamGenerations = 5000;
var testParamCells = 10000;
var testParamDensity = 0.2;
var testParamdawdleProbability = 0.15;
var testParamMaxSpeed = 5;


var testResultSpeedCumulated = 0;
var testResultFlowCumulated = 0;

var startTime = Date.now();

for (var i = 0; i < testCycles; i++) {
    console.log("RUN " + (i+1) + " FROM " + testCycles);

    var result = testDrive(testParamCells, testParamDensity, testParamdawdleProbability, testParamMaxSpeed, testParamGenerations);
    testResultSpeedCumulated += result.averageSpeed;
    testResultFlowCumulated += result.averageFlow;

}

var endTime = Date.now();
var processingTime = endTime - startTime;

var testResultAvgSpeed = testResultSpeedCumulated / testCycles;
var testResultAvgFlow = testResultFlowCumulated / testCycles;

console.log("Avg speed = " + testResultAvgSpeed.toFixed(2));
console.log("Avg flow = " + testResultAvgFlow.toFixed(2));
console.log("time = " + processingTime + " ms");


/**
 *
 * @param cells {Array}
 * @param density {Number}
 * @param dawdleProbability {Number}
 * @param maxSpeed {Number}
 * @param generations {Number}
 * @return {{cells: *, density: *, dawdleProbability: *, maxSpeed: *, generations: *, amountOfCars: number, averageSpeed: number, averageFlow: number}}
 */
function testDrive(cells, density, dawdleProbability, maxSpeed, generations) {

    var cars = [];
    var amountOfCars = Math.floor(cells * density);

    // create the cars
    for (var i = 0; i < amountOfCars; i++) {
        var car = new Car(i, getRandomSpeed(maxSpeed), Math.round(cells * i / amountOfCars), getRandomColor());
        cars.push(car);
    }

    var averageSpeed = 0;
    var averageFlow = 0;

    for (var j = 0; j < generations; j++) {

        cars = accelerate(cars, maxSpeed);
        cars = brake(cars, amountOfCars, cells);
        cars = dawdle(cars, dawdleProbability);
        cars = move(cars, cells);

        var averageSpeedForGeneration = 0;

        for (var k = 0; k < cars.length; k++) {
            averageSpeedForGeneration += cars[k].speed;
        }

        averageSpeedForGeneration = averageSpeedForGeneration / cars.length;
        var averageFlowForGeneration = Math.round(100 * averageSpeedForGeneration * density) / 100;
        averageSpeed += averageSpeedForGeneration;
        averageFlow += averageFlowForGeneration;

        // console.log("GENERATION " + j + " > avgSpeed = " + averageSpeedForGeneration + " > avgFlow = " + averageFlowForGeneration)

    }

    averageSpeed = averageSpeed / generations;
    averageFlow = averageFlow / generations;

    return {
        cells: cells,
        density: density,
        dawdleProbability: dawdleProbability,
        maxSpeed: maxSpeed,
        generations: generations,
        amountOfCars: amountOfCars,
        averageSpeed: averageSpeed,
        averageFlow: averageFlow
    };
}



/**
 * copy of the car object for the tests
 *
 * @param id
 * @param speed
 * @param position
 * @param color
 * @constructor
 */
function Car(id, speed, position, color) {
    this.id = id;
    this.speed = speed;
    this.position = position;
    this.color = color;
}




/**
 * ####################################
 *
 *  METHODS FROM THE GENERATOR FILE
 *
 *  ###################################
 *
 */


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
        if ((cars[i].speed > 1) && Math.random() < dawdleProbability) {
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

