function startSimulation() {

    // make the variables global
    cells = parseInt(document.getElementById("cellsInput").value);
    density = document.getElementById("densityInput").value;
    dawdleProbability = document.getElementById("dawdleInput").value;
    maxSpeed = parseInt(document.getElementById("maxSpeedInput").value);
    generations = parseInt(document.getElementById("generationsInput").value);
    amountOfCars = Math.floor(cells * density);
    // set the calculted amount of cars
    document.getElementById("carsInput").value = amountOfCars;

    var cars = [];
    var table = document.createElement("table");

    for (var i = 0; i < amountOfCars; i++) {
        //console.log(Math.round(cells * i / amountOfCars));
        var car = new Car(i, Generator.getRandomSpeed(maxSpeed), Math.round(cells * i / amountOfCars), Generator.getRandomColor());
        cars.push(car);
    }

    var tables = document.getElementsByTagName("TABLE");
    for (var i = tables.length - 1; i >= 0; i -= 1)
        if (tables[i]) tables[i].parentNode.removeChild(tables[i]);


    document.getElementById("canvasWrapper").appendChild(table);
    Drawer.plot(cells, cars, maxSpeed);

    var averageSpeed = 0;

    for (var j = 0; j < generations; j++) {

        cars = Generator.accelerate(cars, maxSpeed);
        cars = Generator.brake(cars, amountOfCars, cells);
        cars = Generator.dawdle(cars, dawdleProbability);
        cars = Generator.move(cars, cells);

        var averageSpeedForGeneration = 0;

        for (var k = 0; k < cars.length; k++) {
            averageSpeedForGeneration += cars[k].speed;
        }

        averageSpeedForGeneration = averageSpeedForGeneration / cars.length;
        averageSpeed += averageSpeedForGeneration;

        var newRow = Drawer.plot(cells, cars);
        table.appendChild(newRow);
    }


    averageSpeed = averageSpeed / generations;
    document.getElementById("avgSpeed").value = averageSpeed.toFixed(2);
    document.getElementById("avgSpeedWrapper").style.visibility = "visible";
    document.getElementById("avgSpeedWrapper").style.opacity = 1;
    scrollToResult();

}

/**
 * scrolls the view smoothly
 * to the result table
 */
function scrollToResult() {
    // http://iamdustan.com/smoothscroll/
    document.getElementById("canvasWrapper").scrollIntoView({
        behavior: 'smooth'
    });

}