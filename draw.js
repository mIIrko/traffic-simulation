var Drawer = (function () {

    /**
     *
     * @param cells
     * @param cars
     * @return {Element}
     */
    function plot(cells, cars, colormode) {

        // create a new row
        var row = document.createElement("tr");

        for (var i = 0; i < cells; i++) {
            var emptyCell = document.createElement("td");
            emptyCell.style.backgroundColor = "white";
            //cell.innerHTML = " ---- ";
            row.appendChild(emptyCell);
        }

        for (var j = 0; j < cars.length; j++) {
            // get the cell from the new row
            var carPosition = cars[j].position;
            var carCell = row.cells[carPosition];
            // paint the cell with the specific color

            if (colormode === "black") {
                carCell.style.backgroundColor = "#98a09c";
                if (cars[j].id === 5) {
                    carCell.style.backgroundColor = "#de0622";
                }
            } else if (colormode === "speed") {
                carCell.style.backgroundColor = getColorFromSpeed(cars[j].speed);
            } else {
                // default is color mode
                carCell.style.backgroundColor = cars[j].color;
            }
            carCell.innerHTML = cars[j].speed;
        }

        return row;
    }

    /**
     * delivers a color depending of the
     * current speed of a car relative to the max speed;
     *
     * value = 0 is green
     * value = 100 is red
     *
     * https://stackoverflow.com/a/17268489
     *
     * @param speed
     * @return {string}
     */
    function getColorFromSpeed(speed) {

        var value = Math.abs((speed / maxSpeed) - 100);
        //value from 0 to 1
        var hue = ((1 - value) * 120).toString(10);
        return ["hsl(", hue, ",100%,50%)"].join("");
    }


    return {
        plot: plot
    };

})
();
