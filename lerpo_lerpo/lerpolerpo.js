function setup() {
  createCanvas(400, 400);

  i = 0;

  p1 = createVector(50, 50);
  p2 = createVector(100, 150);
  p3 = createVector(300, 100);
  p4 = createVector(350, 300);
  p5 = createVector(390, 390);

  l1 = createVector();
  l2 = createVector();
  l3 = createVector();
  l4 = createVector();

  q1 = createVector();
  q2 = createVector();
  q3 = createVector();

  c1 = createVector();
  c2 = createVector();

  qt1 = createVector();

  d = []; // vector array for drawing of the trajectory line
  pcollor = 205; // grey-ish neutral collor for the points
  p = 0; // red point trajectory as a poisition in t, as in t[p]. 0 <= p <= lim
  t = 0; // red point trajectory percentage
  add = 0.005;
  /* how much of the trajectory (in %) it will draw in 1 frame.
   Example: if its 0.005, then it needs 0.005 / 1 = 200 frames to end the trajectory, and since its 60 framerate, the animation will last (200 frames / 60 frames/second) = 3.33 seconds  */
  lim = 1 / add - 1; // constant maximum d[] size
  pointRadius = 10;
  frameRate(60);
}

function draw() {
  slider = document.getElementById("speed").value;
  add = map(slider, 0, 100, 0.001, 0.01);
  t += add;
  fill(pcollor);
  background(50);
  stroke(pcollor);
  strokeWeight(5);

  ellipse(p1.x, p1.y, pointRadius, pointRadius);
  ellipse(p2.x, p2.y, pointRadius, pointRadius);
  ellipse(p3.x, p3.y, pointRadius, pointRadius);
  ellipse(p4.x, p4.y, pointRadius, pointRadius);
  ellipse(p5.x, p5.y, pointRadius, pointRadius);

  strokeWeight(10);

  l1 = lerpo(p1, p2, t);
  l2 = lerpo(p2, p3, t);
  l3 = lerpo(p3, p4, t);
  l4 = lerpo(p4, p5, t);

  q1 = lerpo(l1, l2, t);
  q2 = lerpo(l2, l3, t);
  q3 = lerpo(l3, l4, t);

  c1 = lerpo(q1, q2, t);
  c2 = lerpo(q2, q3, t);

  qt1 = lerpo(c1, c2, t);

  //The secret behind these beautiful curves is on this commented lines
  
  stroke(0, 250, 0);
  point(l1.x, l1.y);
  stroke(0, 0, 250);
  point(l2.x, l2.y);
  stroke(pcollor);
  point(l3.x, l3.y);

  stroke(255,255,0);
  point(q1.x, q1.y);
  stroke(pcollor);
  point(q2.x, q2.y);
  

  stroke(255, 0, 0);
  point(qt1.x, qt1.y);

  d[p] = qt1;
  strokeWeight(5);
  for (i = 1; i < p; i++)
    line(d[i - 1].x, d[i - 1].y, d[i].x, d[i].y); // trajectory line

  text("i", 40, 280);
  text(i, 40, 300);

  if (t >= 1) {
    t = 0;
    p = 0;
  } else {
    p++;
  }
}

function lerpo(a, b, t) {

  lx = a.x + t * (b.x - a.x);
  ly = a.y + t * (b.y - a.y);

  return createVector(lx, ly);
}

var pmoving;

function mousePressed() {
  if (abs(mouseX - p1.x) < pointRadius && abs(mouseY - p1.y) < pointRadius)
    pmoving = p1;
  else if (abs(mouseX - p2.x) < pointRadius && abs(mouseY - p2.y) < pointRadius)
    pmoving = p2;
  else if (abs(mouseX - p3.x) < pointRadius && abs(mouseY - p3.y) < 20)
    pmoving = p3;
  else if (abs(mouseX - p4.x) < pointRadius && abs(mouseY - p4.y) < pointRadius)
    pmoving = p4;
  else if (abs(mouseX - p5.x) < pointRadius && abs(mouseY - p5.y) < pointRadius)
    pmoving = p5;
}

function mouseDragged() {
  if (pmoving)
    pmoving.set(mouseX, mouseY);
}

function mouseReleased() {
  pmoving = null;
}