Quaternion q;
PVector rot = new PVector(0,0,0);
float rotDelta = 0.05;

void setup() {
  size(800, 800, P3D);
  
  q = new Quaternion();
}

void draw() {
  background(0); 
  text("W A S D Q E", 10, 20);

  pushMatrix();
  translate(width/2, height/2, 0);

  if (keyPressed) {
    switch(key) {
      case 'q':
        rot.x += rotDelta;
        q.rotateAxisX(rot.x);
        break;
      case 'e':
        rot.x += -rotDelta;
        q.rotateAxisX(rot.x);
        break;
      case 'd':
        rot.y += rotDelta;
        q.rotateAxisY(rot.y);
        break;
      case 'a':
        rot.y += -rotDelta;
        q.rotateAxisY(rot.y);
        break;
      case 's':
        rot.z += rotDelta;
        q.rotateAxisZ(rot.z);
        break;
      case 'w':
        rot.z += -rotDelta;
        q.rotateAxisZ(rot.z);        
        break;
    }
  }
  
  q.run();
  box(100);
  popMatrix();
}
