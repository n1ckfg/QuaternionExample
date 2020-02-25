"use strict";

var q;
var rotDelta = 0.05;

function setup() {
    createCanvas(600, 600, WEBGL);
    
    q = new Quaternion(1, 0, 0, 0);
}

function draw() {
    background(0); 
    fill(0,255,255);
    lights();

    push();
    q.rotateAxisY(-rotDelta);
    
    /*
    if (keyIsPressed) {
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
    */
    
    q.run();    

    noStroke();
    fill(255,0,0);
    box(100);
    
    push();
    translate(0,50,0);
    fill(255,255,0);
    sphere(30);
    pop();

    push();
    translate(0,-50,0);
    fill(0,255,255);
    sphere(30);
    pop();

    pop();
}