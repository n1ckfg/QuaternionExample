class Quaternion {

  float x,y,z,w;
  float[][] matrix;
  
  Quaternion() {
    x = 1;
    y = 0;
    z = 0;
    w = 0;  
  }
  
  Quaternion(float _x, float _y, float _z, float _w) {
    x = _x;
    y = _y;
    z = _z;
    w = _w;
  }
  
  void rotateAxisX(float angle) {
    rotateAxis(angle, new PVector(1, 0, 0));
  }
  
  void rotateAxisY(float angle) {
    rotateAxis(angle, new PVector(0, 1, 0));
  } 
  
  void rotateAxisZ(float angle) {
    rotateAxis(angle, new PVector(0, 0, 1));
  }

  // https://answers.unity.com/questions/1209461/problem-using-quaternionangleaxis-around-transform.html  
  void rotateAxis(float angle, PVector p) {
    Quaternion q = calculateRotation(angle, p).mult(new Quaternion(x, y, z, w));
    x = q.x;
    y = q.y;
    z = q.z;
    w = q.w;
  }  

  // https://stackoverflow.com/questions/4436764/rotating-a-quaternion-on-1-axis
  // https://github.com/jdf/peasycam/blob/master/src/peasy/org/apache/commons/math/geometry/Rotation.java#L20
  Quaternion calculateRotation(float angle, PVector p) {
    float norm = sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
    float halfAngle = -0.5 * angle;
    float coeff = sin(halfAngle) / norm;
    
    float a = cos(halfAngle);
    float b = coeff * p.x;
    float c = coeff * p.y;
    float d = coeff * p.z;
    return new Quaternion(a, b, c, d).normalize();
  }
  
  // http://home.apache.org/~luc/commons-math-3.6-RC2-site/jacoco/org.apache.commons.math3.complex/Quaternion.java.html
  Quaternion normalize() {
    float norm = sqrt(x * x + y * y + z * z + w * w);
    return new Quaternion(x / norm, y / norm, z / norm, w / norm);
  }

  Quaternion add(Quaternion q2) {
    return new Quaternion(x + q2.x, y + q2.y, z + q2.z, w + q2.w);
  }
  
  Quaternion mult(Quaternion q2) {
    float a = x * q2.x - y * q2.y - z * q2.z - w * q2.w;
    float b = x * q2.y + y * q2.x + z * q2.w - w * q2.z;
    float c = x * q2.z - y * q2.w + z * q2.x + w * q2.y;
    float d = x * q2.w + y * q2.z - z * q2.y + w * q2.x;
    
    return new Quaternion(a, b, c, d);
  }
  
  float[][] calculateMatrix() {
    matrix = new float[][] {
      { pow(x, 2) + pow(y, 2) - pow(z, 2) - pow(w, 2),  2 * y * z - 2 * x * w,  2 * y * w + 2 * x * z }, 
      { 2 * y * z + 2 * x * w, pow(x, 2) - pow(y, 2) + pow(z, 2) - pow(w, 2), 2 * z * w - 2 * x * y }, 
      { 2 * y * w - 2 * x * z,  2 * z * w + 2 * x * y,  pow(x, 2) - pow(y, 2) - pow(z, 2) +  - pow(w, 2) }
    };
    
    return matrix;
  }
  
  void useMatrix() {
    applyMatrix(matrix[0][0], matrix[0][1], matrix[0][2], 0,
    matrix[1][0], matrix[1][1], matrix[1][2], 0,
    matrix[2][0], matrix[2][1], matrix[2][2], 0,
    0, 0, 0, 1);
  }
  
  void run() {
    calculateMatrix();
    useMatrix();
  }
   
}
