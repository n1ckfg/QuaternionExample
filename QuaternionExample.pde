float rot = 0;
PVector axis;
float angle;
Quaternion q;

void setup() {
  size(800, 800, P3D);
  
  q = new Quaternion();
}

void draw() {
  background(0);
  lights();
  
  rot += 0.101;


  axis=new PVector(0,1,1);
  q.rotateAxis(rot, axis);
 
  pushMatrix();
  translate(width/2, height/2, 0);

  q.run();
  box(100);
  popMatrix();
}
