// https://learning.oreilly.com/library/view/webgl-programming-guide/9780133364903/ch02.html#ch02lev1sec2
// https://www.youtube.com/watch?v=G7CDmeW7Lso&list=PLbyTU_tFIkcNplHMXN_G4sB0wjjmJuRpz&index=5
// https://www.youtube.com/watch?v=G7CDmeW7Lso&list=PLbyTU_tFIkcNplHMXN_G4sB0wjjmJuRpz&index=5
// https://www.youtube.com/watch?v=G7CDmeW7Lso&list=PLbyTU_tFIkcNplHMXN_G4sB0wjjmJuRpz&index=5
// https://learning.oreilly.com/library/view/webgl-programming-guide/9780133364903/ch02.html#ch02lev1sec2
// https://stackoverflow.com/questions/763745/how-to-get-text-box-value-in-javascript
// https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing

// DrawRectangle.js
function main() {
    // Retrieve <canvas> element                                  <- (1)
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG                          <- (2)
    var ctx = canvas.getContext('2d');

    // Draw a blue rectangle                                       <- (3)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

    // var v1 = new Vector3([2.25, 2.25, 0]);

    // drawVector(v1, "red");
}

function drawVector(v, color) {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    var ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = color;
    
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    
    ctx.lineTo(cx + (20 * (v.elements)[0]), cy - (20 * (v.elements)[1]));
    
    ctx.stroke();
}

function handleDrawEvent() {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    
    var ctx = canvas.getContext('2d');
    
    // Specify the color for clearing <canvas>
    // ctx.clearColor(0, 0, 0, 1.0);

    // Clear <canvas>
    // ctx.clear(ctx.COLOR_BUFFER_BIT);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var xInput = document.getElementById('x-input').value;
    var yInput = document.getElementById('y-input').value;

    var v1 = new Vector3([xInput, yInput, 0]);

    drawVector(v1, "red");
}