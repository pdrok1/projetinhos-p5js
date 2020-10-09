tool = 0;
refns = 50;
modo =0;
var p1, p2, ip1, ip2, l1, l2, l3, q1, q2, c3, traj, t;
 
function setup() {
  createCanvas(400, 400);
  
  p1 = createVector(0,0);
	p2 = createVector(0,0);
	ip1 = createVector(0,0);
	ip2 = createVector(0,0);
  traj = [];
}

function mousePressed() {
	console.log(modo);
  if(modo==0){
    p1 = createVector(mouseX, mouseY);
  }else if(modo==1){
    
	}else if(modo==2){
  
  }  
}

function mouseDragged() {
	if(modo==0){
    p2 = createVector(mouseX, mouseY);
  }else if(modo==1){
    ip1 = createVector(mouseX, mouseY);
    Curve1();
	}else if(modo==2){
    ip2 = createVector(mouseX, mouseY);
    Curve2();
  }
  console.log("ok");
}

function mouseReleased() {
  if(modo==0){
    p2 = createVector(mouseX, mouseY);
  }else if(modo==1){
    ip1 = createVector(mouseX, mouseY);
	}else if(modo==2){
  	ip2 = createVector(mouseX, mouseY);
  }
	modo++;
}

function lerpo(a, b, t){
	lx = a.x + t * (b.x - a.x); 
	ly = a.y + t * (b.y - a.y);
	
	return createVector(lx, ly);
}

function Curve1(){
  background(220);
  stroke(0);
  t=0;
  for(i=0;i<=refns;i++){ 
    //t = i/refns-1
  	l1 = lerpo(p1, ip1, t);
  	l2 = lerpo(ip1, p2, t);
    q1 = lerpo(l1, l2, t);
    traj[i] = createVector(q1.x,q1.y);
    //point(q1.x, q1.y);
    if(i>0){
       line(traj[i-1].x,traj[i-1].y,traj[i].x,traj[i].y);
    }
    t += 0.02 ;
	}
}

function Curve2(){
  background(220);
  stroke(0);
  t=0;
  for(i=0;i<=refns;i++){ 
    //t = i/refns-1
  	l1 = lerpo(p1, ip1, t);
  	l2 = lerpo(ip1, ip2, t);
    l3 = lerpo(ip2, p2, t);
    q1 = lerpo(l1, l2, t);
    q2 = lerpo(l2, l3, t);
    c1 = lerpo(q1, q2, t);
    
    
    traj[i] = createVector(c1.x,c1.y);
    //point(q1.x, q1.y);
    if(i>0){
       line(traj[i-1].x,traj[i-1].y,traj[i].x,traj[i].y);
    }
    t += 0.02 ;
	}
}

function draw() {
  frameRate(10);
  //text("t",20,350);
  //text(t,20,370);
  if(modo==0){
    background(220);
    line(p1.x, p1.y, p2.x, p2.y);
  }else if(modo==1){
    
	}else if(modo==2){
  
  }else if(modo>3){
  	p1 = createVector(0,0);
    p2 = createVector(0,0);
    modo=0;
  }
  //text(concat(concat("p1 x:", p1.x), concat(" y:", p1.y)), p1.x, p1.y-10);
  //text(concat(concat("p2 x:", p2.x), concat(" y:", p2.y)), p2.x, p2.y-10);
}