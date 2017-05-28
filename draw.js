var Drawer = (function () {

    function plot(cells, cars) {

        // create a new row
        var row = document.createElement("tr");

        for (var i = 0; i < cells; i++) {
            var emptyCell = document.createElement("td");
            emptyCell.style.backgroundColor = "grey";
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
        }

        return row;
    }

    return {
      plot: plot
    };

})();
