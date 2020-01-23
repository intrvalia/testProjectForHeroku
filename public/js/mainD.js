window.onload = function(){
console.log("we have launched client for camera script");
//let client = io.connect('https://test-cart351.herokuapp.com:5000');
let client = io();


//
// /* THESE CALLBACKS ARE MESSAGES RECEIVED FROM THE SERVER */
//  // when receives a connect message
client.on('connect', function(data) {
  console.log("I am online");
 client.emit('join', 'Hello World from client');

 runCam();
});

client.on('err', function (data){
  console.log("error no connection");
  client.disconnect();


})

function runCam(){
  let  video = document.getElementById("video");
  let canvas = document.getElementById("testCanvas");
  let context = canvas.getContext('2d');


  let canvasMan = document.getElementById("testCanvasMan");
  let contextMan = canvasMan.getContext('2d');


      navigator.mediaDevices.getUserMedia({video: {
        width:320,
        height:240}})
      .then(
        //stream is what is returned
        (stream) => {
          video.srcObject = stream;

    })
    .catch(function(err) {
    /* handle the error */
    console.log("had an error getting the camera");
    });

/*** instead of using the video object we can use the canvas **/
requestAnimationFrame(runBoth);

function run(){
context.clearRect(0,0,canvas.width, canvas.height);
context.drawImage(video, 0, 0, canvas.width/2, canvas.height);
context.fillStyle = "#FFFFFF";
context.fillRect(canvas.width/2+50, canvas.height/2,50,50);
requestAnimationFrame(run);
}


function runManip(){
context.clearRect(0,0,canvas.width, canvas.height);
context.drawImage(video, 0, 0, canvas.width/2, canvas.height);
context.fillStyle = "#FFFFFF";
context.fillRect(canvas.width/2+50, canvas.height/2,50,50);
 let frame = context.getImageData(0, 0, canvas.width/2, canvas.height);
  // every pixel has an r,g,b,a value ... and so in the array - every 4 values== 1 pixel
    for (let i = 0; i < frame.data.length;i+=4) {
    let r = frame.data[i];
    let g = frame.data[i+1];
    let b = frame.data[i+ 2];
    let a = frame.data[i+ 3];
       frame.data[i] =r;
       frame.data[i+1] =0;
       frame.data[i+2]=0;
       // make every 32nd frame have an alpha of 0/
       if(i%32==0){
          frame.data[i+3]=0;
       }
    }
    context.putImageData(frame, 0, 0);
    //can draw on top ...
    context.fillRect(0, canvas.height/2,50,50);

 requestAnimationFrame(runManip);
}

function runBoth(){
  context.clearRect(0,0,canvas.width, canvas.height);
  context.drawImage(video, 0, 0, canvas.width/2, canvas.height);
  context.fillStyle = "#FFFFFF";
  context.fillRect(canvas.width/2+50, canvas.height/2,50,50);


  contextMan.clearRect(0,0,canvasMan.width, canvasMan.height);
  contextMan.drawImage(video, 0, 0, canvasMan.width/2, canvasMan.height);
  contextMan.fillStyle = "#FFFFFF";
  contextMan.fillRect(canvasMan.width/2+50, canvasMan.height/2,50,50);
   let frame = contextMan.getImageData(0, 0, canvasMan.width/2, canvasMan.height);
    // every pixel has an r,g,b,a value ... and so in the array - every 4 values== 1 pixel
      for (let i = 0; i < frame.data.length;i+=4) {
      let r = frame.data[i];
      let g = frame.data[i+1];
      let b = frame.data[i+ 2];
      let a = frame.data[i+ 3];
         frame.data[i] =r;
         frame.data[i+1] =0;
         frame.data[i+2]=0;
         // make every 32nd frame have an alpha of 0/
         if(i%32==0){
            frame.data[i+3]=0;
         }
      }
      contextMan.putImageData(frame, 0, 0);
      //can draw on top ...
      contextMan.fillRect(0, canvasMan.height/2,50,50);

   requestAnimationFrame(runBoth);


}

}//runCam

}//window load
