"use strict";

class Quaternion {
        
    constructor(_w, _x, _y, _z) {
        this.w = _w;
        this.x = _x;
        this.y = _y;
        this.z = _z;
    	this.matrix;
    }
    
    rotateAxisX(angle) {
        this.rotateAxis(angle, createVector(1, 0, 0));
    }
    
    rotateAxisY(angle) {
        this.rotateAxis(angle, createVector(0, 1, 0));
    } 
    
    rotateAxisZ(angle) {
        this.rotateAxis(angle, createVector(0, 0, 1));
    }

    // https://answers.unity.com/questions/1209461/problem-using-quaternionangleaxis-around-transform.html    
    rotateAxis(angle, p) {
        var q = new Quaternion(this.w, this.x, this.y, this.z).mult(this.calculateRotation(angle, p));
        this.w = q.w;
        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
    }    

    // https://stackoverflow.com/questions/4436764/rotating-a-quaternion-on-1-axis
    // https://github.com/jdf/peasycam/blob/master/src/peasy/org/apache/commons/math/geometry/Rotation.java#L20
    calculateRotation(angle, p) {
        var _w, _x, _y, _z;
        
        var omega, s, c;

        s = sqrt(p.x*p.x + p.y*p.y + p.z*p.z);

        if (abs(s) > Number.MIN_VALUE) {
            c = 1.0/s;

            p.x *= c;
            p.y *= c;
            p.z *= c;

            omega = -0.5 * angle;
            s = sin(omega);

            _w = cos(omega);
            _x = s*p.x;
            _y = s*p.y;
            _z = s*p.z;
        } else {
            _w = 1.0;
            _x = _y = 0.0;
            _z = 0.0;
        }
        
        return new Quaternion(_w, _x, _y, _z).normalize();    
    }

    reciprocal() {
        var _w, _x, _y, _z;
        
        var norm = sqrt(w*w + x*x + y*y + z*z);
        if (norm == 0.0) norm = 1.0;

        var recip = 1.0 / norm;

        _w =    this.w * recip;
        _x = -this.x * recip;
        _y = -this.y * recip;
        _z = -this.z * recip;

        return new Quaternion(_w, _x, _y, _z);    
    }
    
    // http://home.apache.org/~luc/commons-math-3.6-RC2-site/jacoco/org.apache.commons.math3.complex/Quaternion.java.html
    normalize() {
        var _w, _x, _y, _z;
        
        var norm = sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
        if (norm == 0.0) {
            _w = 1.0; 
            _x = _y = _z = 0.0;
        } else {
            var recip = 1.0/norm;

            _w = this.w * recip;
            _x = this.x * recip;
            _y = this.y * recip;
            _z = this.z * recip;
        }
        
        return new Quaternion(_w, _x, _y, _z);    
    }

    add(q) {
        var _w, _x, _y, _z;
        
        _w = this.w + q.w;
        _x = this.x + q.x;
        _y = this.y + q.y;
        _z = this.z + q.z;
        
        return new Quaternion(_w, _x, _y, _z);
    }
    
    mult(q) {
        var _w, _x, _y, _z;
        
        _w = this.w * q.w - (this.x * q.x + this.y * q.y + this.z * q.z);
        _x = this.w * q.x + q.w * this.x + this.y * q.z - this.z * q.y;
        _y = this.w * q.y + q.w * this.y + this.z * q.x - this.x * q.z;
        _z = this.w * q.z + q.w * this.z + this.x * q.y - this.y * q.x;
        
        return new Quaternion(_w, _x, _y, _z);    
    }
    
    identity() {    
        return new Quaternion(1, 0, 0, 0);    
    }
    
    conjugate() {
        var _w, _x, _y, _z;
        
        _w = this.w;
        _x = -this.x;
        _y = -this.y;
        _z = -this.z;
        
        return new Quaternion(_w, _x, _y, _z);    
    }
    
    slerp(a, b, t) {
        var _w, _x, _y, _z;

        var omega, cosom, sinom, sclp, sclq;
        cosom = a.x*b.x + a.y*b.y + a.z*b.z + a.w*b.w;

        if ((1.0+cosom) > Float.MIN_VALUE) {
            if ((1.0-cosom) > Float.MIN_VALUE) {
                omega = acos(cosom);
                sinom = sin(omega);
                sclp = sin((1.0-t)*omega) / sinom;
                sclq = sin(t*omega) / sinom;
            } else {
                sclp = 1.0 - t;
                sclq = t;
            }

            _w = sclp*a.w + sclq*b.w;
            _x = sclp*a.x + sclq*b.x;
            _y = sclp*a.y + sclq*b.y;
            _z = sclp*a.z + sclq*b.z;
        } else {
            _w = a.z;
            _x =-a.y;
            _y = a.x;
            _z =-a.w;

            sclp = sin((1.0-t) * PI * 0.5);
            sclq = sin(t * PI * 0.5);

            _x = sclp*a.x + sclq*b.x;
            _y = sclp*a.y + sclq*b.y;
            _z = sclp*a.z + sclq*b.z;
        }

        return new Quaternion(_w, _x, _y, _z);    
    }

    exp() {            
        var _w, _x, _y, _z;
        
        var Mul;
        var Length = sqrt(x*x + y*y + z*z);

        if (Length > 1.0e-4) {
            Mul = sin(Length)/Length;
        } else {
            Mul = 1.0;
        }
        
        _w = cos(Length);

        _x = this.this.x * this.Mul;
        _y = this.this.y * this.Mul;
        _z = this.this.z * this.Mul; 

        return new Quaternion(_w, _x, _y, _z);
    }

    log() {
        var _w, _x, _y, _z;
        
        var Length;
        Length = sqrt(x*x + y*y + z*z);
        Length = atan(Length/w);

        _w = 0.0;
        _x = this.x * Length;
        _y = this.y * Length;
        _z = this.z * Length;

        return new Quaternion(_w, _x, _y, _z);
    }
    
    debug() {
        println("w: " + this.w + ", x: " + this.x + ", y: " + this.y + ", z: " + this.z);
    }

    // https://commons.apache.org/proper/commons-math/javadocs/api-2.2/src-html/org/apache/commons/math/geometry/Rotation.html#line.837    
    calculateMatrix() {
        // products
        var q0q0 = this.w * this.w;
        var q0q1 = this.w * this.x;
        var q0q2 = this.w * this.y;
        var q0q3 = this.w * this.z;
        var q1q1 = this.x * this.x;
        var q1q2 = this.x * this.y;
        var q1q3 = this.x * this.z;
        var q2q2 = this.y * this.y;
        var q2q3 = this.y * this.z;
        var q3q3 = this.z * this.z;
    
        // create the this.matrix
        this.matrix = [3];
        this.matrix[0] = [3];
        this.matrix[1] = [3];
        this.matrix[2] = [3];
    
        this.matrix[0][0] = 2.0 * (q0q0 + q1q1) - 1.0;
        this.matrix[1][0] = 2.0 * (q1q2 - q0q3);
        this.matrix[2][0] = 2.0 * (q1q3 + q0q2);
    
        this.matrix[0][1] = 2.0 * (q1q2 + q0q3);
        this.matrix[1][1] = 2.0 * (q0q0 + q2q2) - 1.0;
        this.matrix[2][1] = 2.0 * (q2q3 - q0q1);
    
        this.matrix[0][2] = 2.0 * (q1q3 - q0q2);
        this.matrix[1][2] = 2.0 * (q2q3 + q0q1);
        this.matrix[2][2] = 2.0 * (q0q0 + q3q3) - 1.0;
    
        return this.matrix;
    }
    
    useMatrix() {
        applyMatrix(this.matrix[0][0], this.matrix[0][1], this.matrix[0][2], 0,
        this.matrix[1][0], this.matrix[1][1], this.matrix[1][2], 0,
        this.matrix[2][0], this.matrix[2][1], this.matrix[2][2], 0,
        0, 0, 0, 1);
    }
    
    run() {
        this.calculateMatrix();
        this.useMatrix();
    }
     
}