var canvas = document.getElementById('Gameweek');
var v = canvas.getContext('2d');


var paramScreen = {
  w:1000,
  h:600
}
var pers= {
  x:canvas.width/2,
  y:canvas.height/2,
  w:50,
  h:50
};
var left = false;
var right = false;
var jump = false;
var jumpHeight = 0;
var jumpCount = 0;
var jumpLength = 60;
var moveSpeed = {
  x:5,
  platform:10
};
var platform={
  x:0,
  y:canvas.height/2-20,
  h:20,
  w:canvas.width
};
var inversion1 = false;
var inversion2 = true;
var marker = true;
var speedForEnemy = 3;
var heightmarker = 0;
var score = 0;

var heroday = new Image();
var heronight = new Image();
var platformday = new Image();
var enemyday = new Image();
var enemynight = new Image();

heroday.src = "img\\heroday.png";
heronight.src = "img\\heronight.png";
platformday.src = "img\\platformday.png";
enemyday.src = "img\\enemyday.png";
enemynight.src = "img\\enemynight.png";

document.addEventListener("keyup",keyOn,false);
document.addEventListener("keydown",keyDown,false);



function drawPers(){
  v.beginPath();
  v.clearRect(0,0,paramScreen.w,paramScreen.h);
  heightmarker = pers.y-jumpHeight;
  if(inversion2){
  v.drawImage(heroday,pers.x,heightmarker-pers.h-platform.h);
}
else v.drawImage(heronight,pers.x,heightmarker-pers.h-platform.h);
}



var protivnik = [];
protivnik[0] = {
  x:canvas.width,
  y:0,
  pok:Math.floor(Math.random()*10)
};
function drawEnemys() {
  for(var i = 0;i<protivnik.length;i++){
       if(protivnik[i].x == 400){
        protivnik.push({
          x:canvas.width,
          y:0,
          pok:Math.floor(Math.random()*10)
        });
}

  if(protivnik[i].pok>5){
    protivnik[i].y = canvas.height/2;
    v.clearRect(protivnik[i].x,protivnik[i].y,40,150);
    v.drawImage(enemynight,protivnik[i].x,protivnik[i].y);

  }else if(protivnik[i].pok<=5)
  {
    protivnik[i].y = 160-platform.h;
    v.clearRect(protivnik[i].x,protivnik[i].y,40,150);
    v.drawImage(enemyday,protivnik[i].x,protivnik[i].y);
  }
  if(protivnik[i].pok>5){
  if(pers.x+pers.w>=protivnik[i].x && pers.x<+protivnik[i].x+40 && heightmarker>protivnik[i].y && heightmarker-3<530){
    location.reload();
    alert();
  }
}
else if(pers.x+pers.w>=protivnik[i].x && pers.x<=protivnik[i].x+40 && heightmarker+pers.h>215 && heightmarker<360){
    location.reload();
    alert();
  }
if(pers.x+pers.w>=protivnik[i].x && pers.x<=protivnik[i].x+40 && heightmarker+pers.h<215){ score+=50;

  }
  else if(pers.x+pers.w>=protivnik[i].x && pers.x<+protivnik[i].x+40 && heightmarker>480)
  {
    score+=50;
  }
    protivnik[i].x-=speedForEnemy;

}
}

function drawPlatform(){
  v.beginPath();
  v.drawImage(platformday,platform.x,platform.y);
  v.closePath();
}

function keyDown(e) {
  if(e.keyCode==39){
    right = true;
  }
  if(e.keyCode==37){
    left = true;
  }
  if(e.keyCode==32){
    jump = true;
  }
  if(e.keyCode==40){
  inversion1 = true;
  inversion2 = false;
}
  if(e.keyCode==38){
    inversion2 = true;
    inversion1 = false;
  }

}
function keyOn(e) {
  if(e.keyCode==39){
    right = false;
  }
  if(e.keyCode==37){
    left = false;
  }
}

function inversive1() {
  if(marker==true){
  pers.y=pers.y+pers.h+platform.h;
  marker=false;
}
}
function inversive2(){
  if(marker==false){
  pers.y=pers.y-pers.h-platform.h;
  marker = true;
}
}
function moveGame(){
  if(left && pers.x>0){
    pers.x -=moveSpeed.x;
  }
  if(right &&pers.x<paramScreen.w-pers.w){
    pers.x+=moveSpeed.x;
  }
  if(jump){
    jumpCount++;
    if(inversion2==true){
    jumpHeight = 4*jumpLength*Math.sin(Math.PI*jumpCount/jumpLength);
  }else{
     jumpHeight = -(4*jumpLength*Math.sin(Math.PI*jumpCount/jumpLength));
  }
}
  if(jumpCount>jumpLength){
    jumpCount=0;
    jump=false;
    jumpHeight=0;
	}
  if(inversion1){
    inversive1();
  }
  if(inversion2){
    inversive2();
  }
  drawPers();
  drawPlatform();
  drawEnemys();
  score++;
  requestAnimationFrame(moveGame);

  v.fillStyle = "#ddd";
  v.font = "24px Verdana";
  v.fillText("Счет: " + score, 10, canvas.height - 20);
}
requestAnimationFrame(moveGame);
