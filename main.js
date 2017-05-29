
function startSimulation() {

    var cells = parseInt(document.getElementById("cellsInput").value);
    var density = document.getElementById("densityInput").value;
    var dawdleProbability = document.getElementById("dawdleInput").value;
    var maxSpeed = parseInt(document.getElementById("maxSpeedInput").value);
    var generations = parseInt(document.getElementById("generationsInput").value);
    var amountOfCars = Math.floor(cells * density);
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
    for (var i=tables.length-1; i>=0;i-=1)
        if (tables[i]) tables[i].parentNode.removeChild(tables[i]);


    document.getElementById("canvasWrapper").appendChild(table);
    Drawer.plot(cells, cars);


    for (var j = 0; j < generations; j++) {

        cars = Generator.accelerate(cars, maxSpeed);
        cars = Generator.brake(cars, amountOfCars, cells);
        cars = Generator.dawdle(cars, dawdleProbability);
        cars = Generator.move(cars, cells);

        var newRow = Drawer.plot(cells, cars);
        table.appendChild(newRow);
    }
}


//console.log("event listener is setted up");

