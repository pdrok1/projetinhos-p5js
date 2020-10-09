var matter = [];
mass = 50;

function setup() {
  createCanvas(600, 600);
  p = new player();
  matter[0] = new bot();
  for(var i=0;i<=mass;i++){
  	matter.push(new food());
  }
  console.log("debug");
}

function draw() {
  background(50, 255);
  for(var i=0;i<matter.length;i++){
    text(i,10,10);
  	if(matter[i].alive){
    	matter[i].live();
  	}
  }
  p.move();
  p.grow();
  p.checkCollision();
  matter[0].move();
  matter[0].grow();
  matter[0].checkCollision();
}



///////////////////////////////////////
//// Classe que controla o jogador ////
///////////////////////////////////////
class player{
  
  constructor(){
    this.isAlive = true;
    this.massToEat = 0;
    this.i=0;
  	this.x=width/2;
    this.y=height/2;
    this.accl=100;
    this.size=10;
    this.minSpeed=1;
    this.maxSpeed=5;
    this.colors = color(10,250,120);    
    ellipse(this.x, this.y, this.size);
  }
  
  move(){
    var xMov, yMov;
    xMov = abs(this.x - mouseX)/this.accl;
    yMov = abs(this.y - mouseY)/this.accl;
    
    xMov += xMov;
    yMov += yMov;

    
    if(xMov>this.maxSpeed){xMov=this.maxSpeed;}
    if(yMov>this.maxSpeed){yMov=this.maxSpeed;}
    //if(xMov<this.minSpeed){xMov=this.minSpeed;}
    //if(yMov<this.minSpeed){yMov=this.minSpeed;}
  	
    //console.log(xMov);
    
    if(mouseX>this.x){
      this.x += xMov;
    }else{
    	this.x -= xMov;
    }
    
    if(mouseY>this.y){
      this.y+= yMov;
    }else{
    	this.y-= yMov;
    }    
    noStroke();
    fill(this.colors, 255);
    ellipse(this.x, this.y, this.size);
  }
  
  checkCollision(){
    var i;
  	for(i=0;i<=mass;i++){
    	if((this.x + this.size/2) >= (matter[i].x + matter[i].size/2) && (this.x - this.size/2) <= (matter[i].x - matter[i].size/2)){
      	if((this.y + this.size/2) >= (matter[i].y + matter[i].size/2) && (this.y - this.size/2) <= (matter[i].y - matter[i].size/2)){
      		if(matter[i].alive){
          	matter[i].alive=false;
          	this.massToEat += matter[i].size/2;
          	console.log("comeu");
            this.maxSpeed=200/(this.size);
          }
        }
      }
    }
  }
  
  grow(){
    if(this.massToEat>0){
  		this.size+=0.8;
      this.massToEat-=0.8;
  	}
	}
  
}




///////////////////////////////////////////
//// Classe que controla a ai dos BOTS ////
///////////////////////////////////////////
class bot{
  
  constructor(){
    this.massToEat = 0;
    this.i=0;
  	this.x=width/2;
    this.y=height/2;
    this.accl=100;
    this.size=10;
    this.minSpeed=1;
    this.maxSpeed=5;
    this.colors = color(250,10, 50);    
    ellipse(this.x, this.y, this.size);
  }
  
  move(){
    var xMov, yMov;
    xMov = random(-10, 10)/this.accl;
    yMov = random(-10, 10)/this.accl;
    
    xMov += xMov;
    yMov += yMov;

    
    if(xMov>this.maxSpeed){xMov=this.maxSpeed;}
    if(yMov>this.maxSpeed){yMov=this.maxSpeed;}
    //if(xMov<this.minSpeed){xMov=this.minSpeed;}
    //if(yMov<this.minSpeed){yMov=this.minSpeed;}
  	
    //console.log(xMov);
    
    
    this.x += xMov;
		this.y += yMov;
    
       
    noStroke();
    fill(this.colors, 255);
    ellipse(this.x, this.y, this.size);
  }
  
  checkCollision(){
    var i;
  	for(i=0;i<mass;i++){
    	if((this.x + this.size/2) >= (matter[i].x + matter[i].size/2) && (this.x - this.size/2) <= (matter[i].x - matter[i].size/2)){
      	if((this.y + this.size/2) >= (matter[i].y + matter[i].size/2) && (this.y - this.size/2) <= (matter[i].y - matter[i].size/2)){
      		if(matter[i].alive){
          	matter[i].alive=false;
          	this.massToEat += matter[i].size/2;
          	console.log("comeu");
            this.maxSpeed=200/(this.size);
          }
        }
      }
    }
  }
  
  lookForFood(){
  	
  }
  
  grow(){
    if(this.massToEat>0){
  		this.size+=0.8;
      this.massToEat-=0.8;
  	}
	}
}



///////////////////////////////////////
//// Controla as massinhas comidas ////
///////////////////////////////////////
class food {
	
  constructor(){
    this.size=random(5,15);
    this.alive=true;
  	this.x=random(0, width);
    this.y=random(0, height);
    this.colors=color(random(0,255),random(0,255),random(0,255));
  }
  live(){
  	stroke(this.colors, 230);
    fill(this.colors, 190);
    ellipse(this.x,this.y,this.size);
  }
}

function mouseClicked(){
	mass++;
  matter.push(new food());
}

function lerpo(a, b, t){
	
	lx = a.x + t * (b.x - a.x); 
	ly = a.y + t * (b.y - a.y);
	
	
	lp = createVector(lx, ly);
	
	return lp;
}