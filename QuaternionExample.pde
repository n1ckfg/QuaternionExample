Quaternion q;
PVector rot = new PVector(0,0,0);
float rotDelta = 0.03;

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
      case 's':
        rot.x += rotDelta;
        q.rotateAxisX(rot.x);
        break;
      case 'w':
        rot.x += -rotDelta;
        q.rotateAxisX(rot.x);
        break;
      case 'a':
        rot.y += rotDelta;
        q.rotateAxisY(rot.y);
        break;
      case 'd':
        rot.y += -rotDelta;
        q.rotateAxisY(rot.y);
        break;
      case 'q':
        rot.z += rotDelta;
        q.rotateAxisZ(rot.z);
        break;
      case 'e':
        rot.z += -rotDelta;
        q.rotateAxisZ(rot.z);        
        break;
    }
  }
  
  q.run();
  box(100);
  popMatrix();
}
