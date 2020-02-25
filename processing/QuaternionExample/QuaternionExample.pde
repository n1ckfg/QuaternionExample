Quaternion q;
float rotDelta = 0.05;

void setup() {
  size(800, 800, P3D);
  
  q = new Quaternion();
}

void draw() {
  background(0); 
  fill(0,255,255);
  text("W A S D Q E", 10, 20); 
  lights();

  pushMatrix();
  translate(width/2, height/2, 0);
  
  if (keyPressed) {
    switch(key) {
      case 'w':
        q.rotateAxisX(rotDelta);
        break;
      case 's':
        q.rotateAxisX(-rotDelta);
        break;
      case 'd':
        q.rotateAxisY(rotDelta);
        break;
      case 'a':
        q.rotateAxisY(-rotDelta);
        break;
      case 'e':
        q.rotateAxisZ(rotDelta);
        break;
      case 'q':
        q.rotateAxisZ(-rotDelta);        
        break;
    }
  }
  
  q.run();  

  noStroke();
  fill(255,0,0);
  box(100);
  
  pushMatrix();
  translate(0,50,0);
  fill(255,255,0);
  sphere(30);
  popMatrix();

  pushMatrix();
  translate(0,-50,0);
  fill(0,255,255);
  sphere(30);
  popMatrix();
   
  popMatrix();
}
