const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const ctx = canvas.getContext('2d');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');


let size = 10;
let isPressed = false;
let color = "black";
var mouseX, mouseY, mouseDown=0;
var touchX, touchY;
var lastX, lastY=-1;

function canvas_mouseDown() {
    mouseDown=1;
    drawLine(ctx,mouseX,mouseY,size);
}

function canvas_mouseUp() {
    mouseDown=0;

    lastX=-1;
    lastY=-1;
}

function canvas_mouseMove(e) { 
    getMousePos(e);

    if (mouseDown==1) {
        drawLine(ctx,mouseX,mouseY,size);
    }
}

function getMousePos(e) {
    if (!e)
        var e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
 }



function drawCircle(ctx, x, y, size) {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2, true);
      ctx.fillStyle = color;
      ctx.fill();
      
}

function drawLine(ctx, x, y, size) {
    if (lastX==-1) {
        lastX=x;
        lastY=y;
    }
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(x,y);
    ctx.lineWidth = size;
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.closePath();
    lastX=x;
	lastY=y;

}

canvas.addEventListener('mousedown', canvas_mouseDown, false);
canvas.addEventListener('mousemove', canvas_mouseMove, false);
window.addEventListener('mouseup', canvas_mouseUp, false);


increaseBtn.addEventListener('click' , () => {
   size+= 5;

   if(size > 50){
       size = 50;
   }
   updateSizeOnScreen();
});

decreaseBtn.addEventListener('click' , () => {
      size-=5;

      if(size < 5){
          size = 5;
      }
      updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => {
   color = e.target.value;

});

function updateSizeOnScreen() {
       sizeEl.innerText = size;
}

clearEl.addEventListener('click', () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

function canvas_touchStart() {
    getTouchPos();

    drawLine(ctx, touchX, touchY, size);


    event.preventDefault();
}

function canvas_touchMove(){
    //update touch coordinates
    getTouchPos();

    drawLine(ctx, touchX, touchY, size);
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawLine(x1, y1, x2, y2);


    event.preventDefault();
}

function canvas_touchEnd() {
    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    lastX=-1;
    lastY=-1;
}

function getTouchPos(e) {
    if (!e) 
    var e = event;
    

    if (e.touches) {
        if (e.touches.length == 1){ //only one finger
            var touch = e.touches[0]; // get info for finger 1
            touchX = touch.pageX - touch.target.offsetLeft;
            touchY = touch.pageY - touch.target.offsetTop;
        }
    }
}

if (ctx) {
canvas.addEventListener('touchstart', canvas_touchStart, false);
canvas.addEventListener('touchmove', canvas_touchMove, false);
canvas.addEventListener('touchend', canvas_touchEnd, false);
}
