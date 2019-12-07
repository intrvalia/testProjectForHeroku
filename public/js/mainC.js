window.onload = function(){
console.log("we have launched client script");
//let client = io.connect('https://test-cart351.herokuapp.com:5000');
//let client = io();
let shapesAddedToDrawingBoard = [];

  let diffVector =null;


/*** DRAGGING FUNCTIONS ***/
let diffX = 0, diffY = 0, previousX = 0, previousY = 0;
let onBox = false;

/* function to be triggered when mouse is down */
let handleDown = function (event)
{
event.preventDefault();
//if we are down & have not been down then update the prevX,Y vars
// otherwise they will contain mouse positions from a while back
if(onBox ==false) {
  previousX = event.pageX;
  previousY = event.pageY;
}
console.log("down");
//make boolean true
onBox =true;

};
/* function to be triggered when mouse is up */
let handleUp = function (event){
event.preventDefault();
console.log("up");
//make boolean true
  onBox =false;

  let centerCirclePos = new p5.Vector(250,250);

  let theElement = document.getElementById("testDragger");
//  console.log(theElement);
  // let rect = theElement.getBoundingClientRect();
  //console.log(rect);
//  let shapePos = new p5.Vector(rect.x,rect.y);


let x = $(theElement).css("left");
let y = $(theElement).css("top");

//  console.log(x);
let xPos = parseInt(x.substr(0,x.length-2));
let yPos = parseInt(y.substr(0,y.length-2));

let shapePos = new p5.Vector(xPos,yPos);
 diffVector = p5.Vector.sub(centerCirclePos,shapePos);
 diffVector.normalize();
 diffVector.mult(2.5);
requestAnimationFrame(go);

 // we will now move the object in that direction ...

//  console.log(diffVector);
// if(diffVector.y<0){
//              //dataToInsert["directiony"] = -1+diffVector.y;
//              };
//              if(diffVector.y>0){
//             // dataToInsert["directiony"] = 1+diffVector.y;
//              };
//              if(diffVector.x<0){
//             // dataToInsert["directionx"] = -1+diffVector.x;
//              };
//              if(diffVector.x>0){
//              //dataToInsert["directionx"] = 1+diffVector.x;
//              };
//
//
//              diffVector.x*=10;
//              diffVector.y*=10;
//
//
//
//              console.log(diffVector);
};


function go(){
  console.log("in go");

  let theElement = document.getElementById("testDragger");
//  console.log(theElement);
  // let rect = theElement.getBoundingClientRect();
  //console.log(rect);
//  let shapePos = new p5.Vector(rect.x,rect.y);


let x = $(theElement).css("left");
let y = $(theElement).css("top");

//  console.log(x);
let xPos = parseInt(x.substr(0,x.length-2));
let yPos = parseInt(y.substr(0,y.length-2));

let shapePos = new p5.Vector(xPos,yPos);

 shapePos.add(diffVector);
 ///console.log(shapePos)

 let newPosX = shapePos.x.toString()+"px";
 let newPosY = shapePos.y.toString()+"px";

 $(theElement).css({"left":newPosX,"top":newPosY});

requestAnimationFrame(go);
}
/* function to be triggered for move */
let handleMove = function (event)
{
event.preventDefault();
if(onBox ==true)
{
  console.log("move");

  // who is moving??
  let theElement = document.getElementById(event.target.id);
  //console.log(theElement);
  // calculate difference between previous mouseX and current mouseX pos
  let diffX = event.pageX-previousX;
  // calculate difference between previous mouseY and current mouseY pos
  let diffY =  event.pageY-previousY;
  //store in previous the current mouse pos
  previousX = event.pageX;
  previousY = event.pageY;
  // set the element's new position:
/*https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect*/
 let rect = theElement.getBoundingClientRect();
 //console.log(rect);
// set the new left/top to the old+diff...
 theElement.style.left = ((rect.left+diffX)+"px");
 theElement.style.top = ((rect.top+diffY)+"px");
}

};

/** TEST FOR DRAGGING ***/
let boxDrag = document.getElementById("testDragger");
boxDrag.addEventListener('mousedown', handleDown);
boxDrag.addEventListener('touchstart', handleDown);




window.addEventListener('mouseup', handleUp);
window.addEventListener('touchend', handleUp);
//window.addEventListener('mousemove', handleMove);
$(boxDrag).on('move',handleMove);






function Shape(e){
  this.directionX = 1;
  this.directionY = 1;
  this.speedX = Math.floor(Math.random()*4)+1;
  this.speedY = Math.floor(Math.random()*4)+1;
  this.shape = e;
}


function runClientInConnect(){
//let canvas = $("#paper");
//let context = canvas.getContext('2d');
$("#a").on("click", function(){
//  console.log("a clicked");
 let nRect = $("<div>");
 $(nRect).addClass("rectA");
 $(nRect).appendTo("#paper");
 shapesAddedToDrawingBoard.push(new Shape(nRect));

 let obj = {
   theClass: "rectA",

 }
  client.emit("newRectA",obj);


})

$("#b").on("click", function(){
//  console.log("b clicked");
 let nRect = $("<div>");
 $(nRect).addClass("rectB");
 $(nRect).appendTo("#paper");
 shapesAddedToDrawingBoard.push(new Shape(nRect));
 let obj = {
   theClass: "rectB"
 }
  client.emit("newRectB",obj);



})

$("#c").on("click", function(){
  //console.log("c clicked");
 let nRect = $("<div>");
 $(nRect).addClass("rectC");
 $(nRect).appendTo("#paper");
 shapesAddedToDrawingBoard.push(new Shape(nRect));
 let obj = {
   theClass: "rectC"
 }
  client.emit("newRectC",obj);



})

$("#d").on("click", function(){
//  console.log("d clicked");
 let nRect = $("<div>");
 $(nRect).addClass("rectD");
 $(nRect).appendTo("#paper");
 shapesAddedToDrawingBoard.push(new Shape(nRect));
 let obj = {
   theClass: "rectD"
 }
  client.emit("newRectD",obj);
})

window.requestAnimationFrame(animate);

function animate(){
  for(let i =0; i<shapesAddedToDrawingBoard.length; i++ ){
//    console.log(shapesAddedToDrawingBoard[i]);
    let x = $(shapesAddedToDrawingBoard[i].shape).css("left");
    let y = $(shapesAddedToDrawingBoard[i].shape).css("top");

  //  console.log(x);
    let xPos = parseInt(x.substr(0,x.length-2));
    let yPos = parseInt(y.substr(0,y.length-2));

 if (xPos> 400 ||xPos<0){
   shapesAddedToDrawingBoard[i].directionX *=-1;
  }

  if (yPos> 400 ||yPos<0){
    shapesAddedToDrawingBoard[i].directionY *=-1;
   }
    xPos= xPos+(shapesAddedToDrawingBoard[i].speedX)*shapesAddedToDrawingBoard[i].directionX;
    yPos= yPos+(shapesAddedToDrawingBoard[i].speedY)*shapesAddedToDrawingBoard[i].directionY;
    //yPos= xPos+.01;

    let newPosX = xPos.toString()+"px";
    let newPosY = yPos.toString()+"px";


    $(shapesAddedToDrawingBoard[i].shape).css({"left":newPosX,"top":newPosY});
}
  window.requestAnimationFrame(animate);
}

}
 //client in connect


//
// /* THESE CALLBACKS ARE MESSAGES RECEIVED FROM THE SERVER */
//  // when receives a connect message
client.on('connect', function(data) {
  console.log("I am online");
 client.emit('join', 'Hello World from client');
 runClientInConnect();
});

client.on('err', function (data){
  console.log("error no connection");
  client.disconnect();


})

client.on('movingFromServer', function(data) {
  console.log("got data");
  console.log(data);
  let sRect = $("<div>");
  sRect.addClass(data.theClass);

  shapesAddedToDrawingBoard.push(new Shape(sRect));
   $(sRect).appendTo("#paper");
});

// /* check if the color has changed */
// document.getElementById("cPicker").onchange=function(){
//   console.log(document.getElementById('cPicker').value);
//   drawingColor = "#"+document.getElementById('cPicker').value ;
// }
// /* check if reset has been pressed - clear canvas */
// document.getElementById("reset").onclick = function(){
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   document.getElementById('cPicker').value = "FF0000";
//   document.getElementById('wPicker').value = "1";
//   // force a key up event in order to reset values ...
//   document.getElementById('cPicker').dispatchEvent(new KeyboardEvent('keyup'));
//
// }
//
// /* check if stroke weight has been changed */
// document.getElementById("wPicker").onchange= function(){
//   strokeWeight = Number(document.getElementById('wPicker').value);
//   console.log(strokeWeight);
// }
//
//
// /* reveive message from server that mouse moved (mousemove) */
// client.on('movingFromServer', function(data) {
// context.lineTo(Number(data.x), Number(data.y));
// context.strokeStyle= data.dCol;
// //set strokeWidth ...
// context.lineWidth=data.lWidth;
// context.stroke();
// });
// /* reveive message from server that mouse stopped moving (UP) */
// client.on('receiveStopFromServer', function(data){
// console.log("receivedStop");
// tool.started = false;
// });
// /* reveive message from server that mouse started moving (DOWN) */
// client.on('receiveDownFromServer', function(data){
// console.log("receivedDown");
// context.beginPath();
// tool.started = true;
// });
//
// /************** CANVAS DRAWING ************/
// //set default drawing color
// let drawingColor = "red";
// // setDefault stroke Weight
// let strokeWeight =1;
// let canvas = document.getElementById("paper");
// context = canvas.getContext('2d');
// tool = new tool_pencil();
//
// // make a class for a pencil - to track mouse :::
// // This painting tool works like a drawing
// // pencil which tracks the mouse movements
//
// function tool_pencil () {
//
// 	this.started = false;
//  // eventOnCanvas is the callback function ... when we use mouse on the canvas
// 	canvas.addEventListener('mousedown',  eventOnCanvas, false);
// 	canvas.addEventListener('mousemove',  eventOnCanvas, false);
// 	canvas.addEventListener('mouseup',	  eventOnCanvas, false);
//
// 	// This is called when you start holding down the mouse button
// 	// This starts the pencil drawing
// 	this.mousedown = function (ev) {
//     // SEND MESSAGE TO SERVER
//      client.emit('receiveDown', {'messageD':'go'});
// 			context.beginPath();
// 			context.moveTo(ev._x, ev._y);
// 			this.started = true;
// 	};
//
// 	// This function is called every time you move the mouse. Obviously, it only
// 	// draws if the tool.started state is set to true (when you are holding down
// 	// the mouse button)
// 	this.mousemove = function (ev) {
// 		if (this.started) {
//         // SEND MESSAGE TO SERVER
// 			client.emit('receiveMove',
//                 {
//                 'x': ev._x,
//                 'y': ev._y,
//                 'dCol': drawingColor,
//                 'lWidth':strokeWeight
//                });
// 			context.lineTo(ev._x, ev._y);
// 			context.strokeStyle= drawingColor;
//       context.lineWidth = strokeWeight;
// 			context.stroke();
// 		}
// 	};
//
// 	// This is called when you release the mouse button
// 	this.mouseup = function (ev) {
// 		if (this.started) {
// 			//tool.mousemove(ev);
//       client.emit('receiveStop', {'messageS':'stop'});
// 			this.started = false;
// 		}
// 	};
//
// }
// // The general-purpose event handler. This function just determines
// // the mouse position relative to the <canvas> element
// // ev is the event arg (what event occured)
// function eventOnCanvas (ev) {
// 	// Firefox and chrome
// 	if (ev.layerX || ev.layerX == 0) {
//   // get the absolute pos of the element (canvas)
// 	 var domRect = document.getElementById("paper").getBoundingClientRect();
//    // note drawing coordinates start at 0,0 in the canvas - so we need the diff
//    // between the mouse and where the canvas starts  ...
//    var diffX =  ev.clientX-domRect.x;
//    var diffY =  ev.clientY-domRect.y;
//    ev._x = diffX;
// 	 ev._y =diffY;
//  }
// /*
// 	 Call the event handler of the within the pencilTool class
//    could be mousedown, mouseup, mousemove...
// */
//   if(ev.type ==="mousedown"){
//     tool.mousedown(ev);
//   }
//   if(ev.type ==="mouseup"){
//     tool.mouseup(ev);
//   }
//   if(ev.type ==="mousemove"){
//     tool.mousemove(ev);
//   }
// }
//socket on connect
//});

// window has loaded
}
