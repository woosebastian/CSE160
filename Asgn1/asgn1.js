// // https://rodger.global-linguist.com/webgl/ch02/HelloPoint1.html
// https://rodger.global-linguist.com/webgl/ch02/ColoredPoints.html
// https://www.youtube.com/watch?v=EtWtcbxXvQE&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X&index=5
// https://www.youtube.com/watch?v=uDDkRE2QzOQ&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X&index=6
// https://www.youtube.com/watch?v=vhDvY4AoT-M&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X&index=7
// https://www.youtube.com/watch?v=BysWzPpGzqQ&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X&index=8
// https://www.youtube.com/watch?v=_K1e0jauHc4&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X&index=9
// https://www.youtube.com/watch?v=7Q0uinfSdm4&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X&index=10
// https://www.youtube.com/watch?v=61ez8RPpeD8&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X&index=11
// https://www.youtube.com/watch?v=OnFc7KfIamg&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X&index=12
// https://www.youtube.com/watch?v=_vXKnNi__fo&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X&index=13
// https://www.youtube.com/watch?v=Jg2l8-yHm_8&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X&index=15
// https://www.youtube.com/watch?v=eEvSzFrupqc&list=PLbyTU_tFIkcMK5FiV6btXxHQAy15p0j7X&index=16

// // HelloPoint1.js (c) 2012 matsuda
// // Vertex shader program
// var VSHADER_SOURCE = 
//   'void main() {\n' +
//   '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // Set the vertex coordinates of the point
//   '  gl_PointSize = 10.0;\n' +                    // Set the point size
//   '}\n';

// // Fragment shader program
// var FSHADER_SOURCE =
//   'void main() {\n' +
//   '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
//   '}\n';

// function main() {
//   // Retrieve <canvas> element
//   var canvas = document.getElementById('webgl');

//   // Get the rendering context for WebGL
//   var gl = getWebGLContext(canvas);
//   if (!gl) {
//     console.log('Failed to get the rendering context for WebGL');
//     return;
//   }

//   // Initialize shaders
//   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
//     console.log('Failed to intialize shaders.');
//     return;
//   }

//   // Specify the color for clearing <canvas>
//   gl.clearColor(0.0, 0.0, 0.0, 1.0);

//   // Clear <canvas>
//   gl.clear(gl.COLOR_BUFFER_BIT);

//   // Draw a point
//   gl.drawArrays(gl.POINTS, 0, 1);
// }

// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    //gl_PointSize = 30.0;
    gl_PointSize = u_Size;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`

// Global Variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  // gl = getWebGLContext(canvas);
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_Size
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}

// Constants
const POINT = 0;
const TRIANGLE = 1;

// Globals related UI elements
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;

// Set up actions for the HTML UI elements
function addActionsForHtmlUI() {
    document.getElementById('clearButton').onclick = function() {g_shapesList=[]; renderAllShapes();};
    
    document.getElementById('pointButton').onclick = function() {g_selectedType=POINT};
    document.getElementById('triButton').onclick = function() {g_selectedType=TRIANGLE};

    // Slider Events
    document.getElementById('redSlide').addEventListener('mouseup', function() { g_selectedColor[0] = this.value/100; });
    document.getElementById('greenSlide').addEventListener('mouseup', function() { g_selectedColor[1] = this.value/100; });
    document.getElementById('blueSlide').addEventListener('mouseup', function() { g_selectedColor[2] = this.value/100; });

    // Size Slider Events
    document.getElementById('sizeSlide').addEventListener('mouseup', function() { g_selectedSize = this.value; });
}

function main() {
  // Set up canvas and gl variables
  setupWebGL();
  
  // Set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();
  
  // Set up actions for the HMTL UI elements
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  // canvas.onmousemove = click;
  canvas.onmousemove = function(ev) { if (ev.buttons == 1) { click(ev) } };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_shapesList = [];

// var g_points = [];  // The array for the position of a mouse press
// var g_colors = [];  // The array to store the color of a point
// var g_sizes = [];

// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {
  // Check the time at the start of this function
  var startTime = performance.now();
  
    // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

//   var len = g_points.length;
  var len = g_shapesList.length;
  for(var i = 0; i < len; i++) {
    g_shapesList[i].render();
  }

  // Check the time at the end of the function, and show on web page
  var duration = performance.now() - startTime;
  sendTextToHTML("numdot: " + len + " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration)/10, "numdot");
}

// Set the text of a HTML element
function sendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    if (!htmlElm) {
        console.log("Failed to get " + htmlID + " from HTML");
        return;
    }
    htmlElm.innerHTML = text;
}

function click(ev) {
  // Extract the event click and return it in WebGL coordinates
  let [x,y] = convertCoordinatesEventToGL(ev);

  // Create and store the new point
  let point;
  if (g_selectedType == POINT) {
    point = new Point();
  } else {
    point = new Triangle();
  }
//   let point = new Triangle();
  point.position = [x,y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  g_shapesList.push(point);

//   // Store the coordinates to g_points array
//   g_points.push([x, y]);
  
//   // Store the color to g_colors array
//   // g_colors.push(g_selectedColor.slice());
//   g_colors.push([g_selectedColor[0],g_selectedColor[1],g_selectedColor[2],g_selectedColor[3]]);

//   // Store the size to the g_sizes array
//   g_sizes.push(g_selectedSize);

  // Store the color to g_points array
//   if (x >= 0.0 && y >= 0.0) {      // First quadrant
//     g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
//   } else if (x < 0.0 && y < 0.0) { // Third quadrant
//     g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
//   } else {                         // Others
//     g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
//   }

  // Draw every shape that is supposed to be in the canvas
  renderAllShapes();
}

// Extract the event click and return it in WebGL coordinates
function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();
  
  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  
  return([x,y]);
}