 //var i =0 ;
function setup() {
  raio = 150;
  createCanvas(400, 400);
  C = createVector(width/2,height/2);
  B = createVector(C.x+raio, height/2);
  A = createVector(C.x+raio, height/2);
  adj = 0;
  opo = 0;
  i=0;
  angleMode(DEGREES);
}

inc=0.5;

function draw() {
  frameRate(60);
  background(220);
  stroke(0, 20, 250);
  drawLine(createVector(width/2,0),createVector(width/2,height));
  drawLine(createVector(0,height/2),createVector(width,height/2));
  //
  stroke(0);
  drawTriangle(A, B, C);
  
  drawCircle(C, raio);
  stroke(255,0,0);
  fill(255,0,0);
  ellipse(A.x, A.y,4);
  fill(0);
  stroke(0);
  
  adj = raio * cos(i);
  opo = raio * sin(i);
  B = createVector(C.x+adj,C.y)
  A = createVector(B.x, B.y-opo);
  
  
  text("Ângulo",350, 20);
  text(i,350, 40);
  text("Reta CB",350, 300);
  text(adj,350, 320);
  text("Reta BA",350, 360);
  text(opo,350, 380);
  
  text("reta CB",C.x+adj/2-15,C.y+20);
  text("reta BA",B.x+4,B.y-opo/2+5);
  
  
  
  //
  i+=inc;
  i%=360;
  //
}

function drawCircle(v, r){
	var circun;
  for(var i = 0;i<360;i+=0.2){
  	circun = createVector(v.x + r * cos(i), v.y + r * sin(i));
  	point(circun.x, circun.y);
	}
}
//sin(i)*r=o
//cos(i)*r=a
function drawTriangle(A, B, C){
	drawLine(A, B);
  drawLine(B, C);
  drawLine(C, A);
}

function mouseClicked(){
  if(inc>0)
    inc=0;
  else
    inc=0.5;
}

function drawLine(A, B){
	xDistance = B.x-A.x;
  yDistance = B.y-A.y;
  for(var i=0;i<=1;i+=0.002){
    point(A.x+xDistance*i,A.y+yDistance*i);
  }
}