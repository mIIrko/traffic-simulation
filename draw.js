var Drawer = (function () {

    /**
     *
     * @param cells
     * @param cars
     * @return {Element}
     */
    function plot(cells, cars) {

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
            carCell.style.backgroundColor = cars[j].color;
            carCell.innerHTML = cars[j].speed;

            //carCell.style.backgroundColor = getColorFromSpeed(cars[j].speed);
            //carCell.innerHTML = cars[j].id;
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

})();
