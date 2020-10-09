function setup() {
  dimensoes = 400;
  createCanvas(dimensoes, dimensoes);//tem que ser quadrado, se nao teria que ter uma variavel da proporcao x e outra pra proporcao y, sendo quadrado as duas sao iguais (propReal)
  
  // o proposito desse programa é provar computacionalmente as teorias matemáticas aprendidas na aula de cálculo da faculdade
  
  // variaveis alteraveis
  
  tamanho = 7;//proporcao visivel do plano cartesiano
  x1 = -2;//primeiro ponto de encontro das funcoes
  x2 = 2;//segundo ponto de encontro das funcoes
  precisao = 0.1;//variavel responsavel pela resolucao das funcoes
  dx = 0.01;//precisao do projetor da integral (e velocidade)
  frameRate(20);
  
  //fim das variaveis alteraveis
  
  soma = 0;
  l=0;
  tIntegral = 0;
  cx = width/2;
  cy = height/2;
  propReal = dimensoes/((tamanho+1)*2);
}

function draw() {
  background(220);
  if(keyIsDown(keyCode)){
    switch(keyCode){ // apertar setinhas do mouse pra mover o gráfico
      case 37:cx++; break;
      case 38:cy++; break;
      case 39:cx--; break;
      case 40:cy--; break;
    }
  }
  
  text(keyCode, width-40, 20);
  text("tamanho = "+tamanho, 20, 380);
  
  push();
  stroke(255, 0, 0, 50);
  line(0,mouseY, width,mouseY);
  line(mouseX, 0, mouseX, height);
  pop();
  
  drawCross();
  drawFunc1(); // desenha imagem da função 1 f(x)
  drawFunc2(); // desenha imagem da função 2 g(x)
  
  drawFunc2Der(); // desenha reta da derivada da função 2 => g'(x) = x^2 + 1
  
  soma += dx * drawNextIntegralLine(l, x1, x2); // "scan" da integral
  
  l+=dx;
  if(l>1){
    tIntegral = soma * abs(x1 - x2);
    soma = l = 0;
  }
  
}

function drawCross(){
  line(0, cy, width, cy);
  line(cx, 0, cx, height);
  
  startingPointX = (cx / propReal);
  startingPointRealX = -floor(startingPointX);
  startingPointX = (startingPointX + startingPointRealX)*propReal;
  
  startingPointY = (cy / propReal);
  startingPointRealY = -floor(startingPointY);
  startingPointY = (startingPointY + startingPointRealY)*propReal;
  
  for(i = startingPointX; i<width; i+=propReal){
    line(i, cy, i, cy + 2);//tracinhos x
    text(startingPointRealX++, i-5, cy+12);//label x
  }
  for(i = startingPointY; i<width; i+=propReal){
    line(cx, i, cx + 2, i);//tracinhos y
    text(startingPointRealY++, cx+2, i+6);//label y
  }
}

function drawFunc1(){
  push();
  stroke(0, 50, 170);
  for(i=0;i<width;i+=precisao){
    point(i, setNtoY(func1(i)) );
  }
  pop();
}

function drawFunc2(){
  push();
  stroke(0, 170, 50);
  for(i=0;i<width;i+=precisao){
    point(i, setNtoY(func2(i)) );
  }
  pop();
}

function func1(xG){//x em proporcao grafica
  x = setXtoN(xG);
  return 5;//retorno em proporcao numerica
  //-2x² + 2x + 10
}

function func2(xG){//x em proporcao grafica
  x = setXtoN(xG);
  return x*x+1;//retorno em proporcao numerica
  //4x² + 12x + 9
}

function setXtoN(x){
  return (x - cx)/propReal;
}

function setNtoX(N){
  return cx - N * propReal;
}

function setNtoY(N){
  return cy - N * propReal;
}

function drawNextIntegralLine(l, fstEnc, sndEnc){
  posx = (cx + fstEnc*propReal)+(l*(sndEnc-fstEnc)*propReal);// comecando do primeiro encontro da funcao, percorrer a distancia (sndEnd-fstEnc) ate o segundo encontro
  line(posx, setNtoY(func2(posx)), posx, setNtoY(func1(posx)));
  //no mesmo x (posx), desenharuma linha da imagem da primeira funcao ateh a imagem da 2 funcao com o mesmo x (posx)
  text("integral: ", 20, 20)
  text(tIntegral, 65, 20);//debug
  return abs(func1(posx)-func2(posx));
  //retornar o cumprimento da linha da integral projetada
}

function drawFunc2Der(){
    imagem = func2(mouseX);
    mouseNPos = setXtoN(mouseX);
    fatorder = 2 * mouseNPos;//setXtoN(mouseX) = posicao do mouse em numero do grafico

    line
    ( 
mouseX-75,
setNtoY(fatorder *(setXtoN(mouseX-75) -mouseNPos) +imagem), 
mouseX+75,
setNtoY(fatorder *(setXtoN(mouseX+75) -mouseNPos) +imagem)
    );
    //fator == derivada
    //setXtoN(mouseX-75) ao setXtoN(mouseX+75), fazer uma linha entre os dois
    //+ imagem para subir ou descer o ponto em que a reta cruza o y até a mesma altura do PONTO
    // -mouseNPos para shiftar para os lados e tangenciar o ponto
    text("derivada: ", 20, 40);
    text(fatorder + "x", 72, 40);
    push();
    noFill();
    circle(mouseX, setNtoY(imagem), 4);
    fill(0);
    circle(mouseX, setNtoY(imagem), 1);
    pop();
}

function mouseDragged(){ // mover o gráfico ao arrastar o mouse
  cx+= mouseX - pmouseX;
  cy+= mouseY - pmouseY;
}

function keyPressed(){
  if(keyCode==72){
    cx = cy = dimensoes/2;
  }
  if(keyCode==61){
    if(tamanho > 0){
      tamanho--;
      propReal = dimensoes/((tamanho+1)*2);
    }
  }
  if(keyCode==173){
    tamanho++;
    propReal = dimensoes/((tamanho+1)*2);
  }
}