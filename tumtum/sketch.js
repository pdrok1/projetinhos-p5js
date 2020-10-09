var grau=0;
var clickSgt=0;
const SEN_COS_45 = 0.707106;
const SEN_COS_REV = 1 - SEN_COS_45;
var pulse = 23;
var pulseDown = false;

function setup() {
  createCanvas(600, 400);
  onda=[];
  velocidade=createVector(3, 0); //NUNCA MUDAR, default (3,0)
  angleMode(DEGREES);
  var greeny = color(20, 255, 0);
  stroke(greeny);
  defaultF=3;
  freq=defaultF;
  heartBeat = 0;
  startLine = width * 0.8;
  heartDesaceleration = 0.0125;
}

function draw() {
  frameRate(60);
  background(0);
  drawGrid();
  drawHeart(550,200, pulse);
  line(startLine,0,startLine,height);
  yPos = height/2 - sin(grau)*100;
  onda.push(createVector(startLine, yPos));
  
  for(var i = 0;i<onda.length;i++){
    onda[i].sub(velocidade);
    if(i>0){
      line(onda[i-1].x,onda[i-1].y,onda[i].x,onda[i].y);
    }
  }
  
  if(onda[0].x < 0){
     onda.shift();
  }
  
  text(onda.length,550,380);
  
  grau+=freq;
  if(grau>=360){
    grau=0;
  }
  
  if(freq>defaultF){
  	   freq-=heartDesaceleration;//desaceleracao do coracao
  }
  
  if(pulseDown){//movimento de crescer e diminuir
    pulse -= heartBeat;
  }else{
    pulse += heartBeat;
  }
  
  if(pulse>23){
    pulseDown = true;//ao max do tamanho, comecar a diminuir
  }else if(pulse<20){
    pulseDown = false;// ao min do tamanho, comecar a crescer
  }
  
  heartBeat = freq/30;//definir a velocidade da pulsacao do coracao pela freq
  //esse cara é o que define a sicronia entre a onda e a pulsacao
}

function drawGrid(){
  var scle = width/12;
  push();
  stroke(20, 250, 0, 50);
  for(var dis = scle;dis<width;dis+=scle){
    line(dis,0,dis,height); //vertical lines
    line(0,dis,width,dis); //horizontal lines
  }  
  pop();
}

function drawHeart(cx, cy, size){
  
  push();
  fill(255,0,0);
  stroke(255,0,0);
  
  ellipse(cx+size, cy-size, size*2);
  ellipse(cx-size, cy-size, size*2);
  triangle(cx-(size+size*SEN_COS_45), cy-(size*SEN_COS_REV),
           cx+(size+size*SEN_COS_45), cy-(size*SEN_COS_REV),
           cx,                        cy+size*1.25);
  triangle(cx-(size+size*SEN_COS_45), cy-(size*SEN_COS_REV),
           cx+(size+size*SEN_COS_45), cy-(size*SEN_COS_REV),
           cx,                        cy-size);
  pop();
}

function mouseClicked(){
  freq+=0.5;
}

function keyPressed(){
  if (keyCode === DOWN_ARROW) {
    freq+=0.5;
  }
}