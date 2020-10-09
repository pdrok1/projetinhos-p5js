function setup(sqres) {
  squareSize = 20; //tamanho em pixels de cada quadrado
  console.log(sqres);
  if (sqres >= 4) {
    squares = sqres;
  } else {
    squares = 20; //dimensao do "tabuleiro" em metros quadrados
  }
  win = squares * squares;
  size = squareSize * squares;
  createCanvas(size, size);
  border = squareSize * 1 / 5;
  snake = [];
  snakeColor = color(0, 255, 0);
  snakeSkinColor = color(0, 240, 67);
  var i;
  for (i = 0; i < squareSize * 4; i += squareSize) {
    snake.push(createVector(floor(squares / 2) * squareSize - 2 * squareSize + i, floor(squares / 2) * squareSize));
  }
  var food = spawnFood();
  frameRate(12);
  movement = createVector(squareSize, 0);
  game = true;
  textAlign(CENTER);
  head = createVector();
  strokeWeight(0);
  console.clear();
  bgColor = color(100);
  background(bgColor);
  fill(snakeColor);
  i = 0;
  partSelector('t', 3, i++);
  partSelector('b', 1, i++);
  partSelector('b', 1, i++);
  partSelector('h', 1, i);
  //rect(snake[i].x, snake[i].y, squareSize, squareSize); 
}

function draw() {
  head = snake[snake.length - 1].copy(); //pegar a cabeca para testes
  head.add(movement); //projetar o proximo movimento

  //testar se saiu do limite da tela
  if (head.x < 0) {
    head.x = size - squareSize;
  } else if (head.x >= size) {
    head.x = 0;
  } else if (head.y < 0) {
    head.y = size - squareSize;
  } else if (head.y >= size) {
    head.y = 0;
  }

  snake.push(head);
  if (movement.y < 0) {
    direction = 1;
  } else if (movement.x > 0) {
    direction = 2;
  } else if (movement.y > 0) {
    direction = 3;
  } else {
    direction = 4;
  }



  if (head.x == food.x && head.y == food.y) { //testar se comeu
    if (snake.length >= win) { //ganhou?
      stopGame(1); //chama o draw() mais uma vez na vitoria
    } else { //senao, desenha a proxima comida
      food = spawnFood();
    }
  } else {
    fill(bgColor);
    rect(snake[0].x, snake[0].y, squareSize, squareSize); //pintar a cauda da cor do background
    snake.shift(); //remover a "cauda"
    //partSelector('t', 1, 0);
  }
  fill(255, 0, 0);
  rect(food.x, food.y, squareSize, squareSize); //desenhar a comida
  if (checkCollision()) { //testar se colidiu com ela mesma
    stopGame(0);
  } else {
    fill(snakeColor);
    partSelector('h', 1, snake.length - 1); //desenhar a cabeça
  }

}

function spawnFood() {
  this.food = createVector();
  this.food.x = floor(random(squares)) * squareSize;
  this.food.y = floor(random(squares)) * squareSize;
  for (i = 0; i < snake.length; i++) {
    if (this.food.x == snake[i].x) {
      if (this.food.y == snake[i].y) {
        this.food.x = floor(random(squares)) * squareSize;
        this.food.y = floor(random(squares)) * squareSize;
        i = -1;
      }
    }
  }
  return this.food;
}

function stopGame(r) {
  fill(255);
  push();
  textSize(30);
  if (r == 0) {
    text("GAME OVER", size / 2, size / 2 - 5);
    textSize(10);
    text("Sua pontuação: " + (snake.length - 4), size / 2, size / 2 + 10);
  } else if (r == 1) {
    console.log("win");
    text("WIN!!!", size / 2, size / 2 - 5);
  }
  pop();
  text("Pressione 'r' para jogar novamente", size / 2, height - 10);
  fill(0, 200, 0);
  game = false;
  noLoop();
}

function checkCollision() {
  //if(snake.length == win){
  //  stopGame(1);
  //  return;
  //}
  for (i = 0; i < snake.length - 1; i++) {
    if (snake[i].x == head.x) {
      if (snake[i].y == head.y) {
        return true;
      }
    }
  }
  return false;
}

function partSelector(part, rotation, i) {
  push();
  rect(snake[i].x, snake[i].y, squareSize, squareSize); //
  rotate(HALF_PI * rotation);
  fill(snakeSkinColor);
  switch (part) {
    case 'c': //corner
      rect(0, 0, border, squareSize);
      rect(0, 0, squareSize, -border);
      rect(0, 0, border, squareSize);
      break;
    case 'b': //body
      drawBody();
      break;
    case 't': //tail
      drawTail();
      break;
    case 'h': //head
      drawTail();
      haa = squareSize / 2;
      circle(haa, haa, 2);
      break;
  }
  if (rotation == 1) {
    translate(squareSize, 0);
  } else if (rotation == 2) {
    translate(squareSize, squareSize);
  } else if (rotation == 3) {
    translate(0, squareSize);
  }
  translate(snake[i].x, snake[i].y);
  //rect(snake[i].x, snake[i].y, squareSize, squareSize);
  pop();
}

function drawBody() {
  rect(0, 0, border, squareSize);
  rect(squareSize, 0, -border, squareSize);
}

function drawTail() {
  drawBody(border);
  rect(0, 0, squareSize, border);
}

function keyPressed() {
  switch (keyCode) {
    case 87:
      if (direction == 3) {
        return;
      }
      movement = createVector(0, -squareSize);
      break;
    case 68:
      if (direction == 4) {
        return;
      }
      movement = createVector(squareSize, 0);
      break;
    case 83:
      if (direction == 1) {
        return;
      }
      movement = createVector(0, squareSize);
      break;
    case 65:
      if (direction == 2) {
        return;
      }
      movement = createVector(-squareSize, 0);
      break;
    case 82:
      if (!game) {
        setNstart();
      }
      break;
  }
}

function setNstart() {
  const sqres = document.getElementById("tam").innerHTML;
  document.getElementById("teste").innerHTML = sqres;
  console.log("HHHHHHHHHHHHHH");
  console.log("H "+sqres+" H");
  console.log("HHHHHHHHHHHHHH");
  setup(sqres);
  loop();
}