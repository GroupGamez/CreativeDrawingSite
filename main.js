const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 450;
canvas.getContext("2d", { willReadFrequently: true })
let context = canvas.getContext("2d");
let startBackgroundColor = "white";
context.fillStyle = startBackgroundColor;
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;


let restoreArray = [];
let index = -1;

//color buttons

var Colors = document.getElementsByClassName("color-field");
for(var i = 0; i<Colors.length; i++){
    Colors[i].addEventListener("click", change_color);

}

function change_color (event) {
   draw_color = this.style.background;
    
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function start(event){
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    
    event.preventDefault();

}

function draw(event) {
    if(is_drawing){
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();

    }
    event.preventDefault();

}

function stop (event) {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;

    }
    event.preventDefault();

    if(event.type != 'mouseout'){
        restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height));     
        index += 1;
        console.log(restoreArray);
    }

    
}

//clear button

var Clear = document.getElementById("clearButton");
Clear.addEventListener("click", clear_canvas);

function clear_canvas(event){
    context.fillStyle = startBackgroundColor;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    restoreArray = [];
    index = -1;
}


//undo button

var Undo = document.getElementById("undoButton");
Undo.addEventListener("click", undoLast);


function undoLast (event){
    if (index <= 0) {
        clear_canvas();

     }
     else{
        index -= 1;
        restoreArray.pop();
        context.putImageData(restoreArray[index], 0, 0);
     }

}


