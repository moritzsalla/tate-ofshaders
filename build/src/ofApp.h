#pragma once

#include "ofMain.h"

class ofApp : public ofBaseApp{
    public:
        
    void setup();
    void update();
    void draw();
    void setShader();
    
    void keyPressed(int key);
    void keyReleased(int key);
    void mouseMoved(int x, int y);
    void mouseDragged(int x, int y, int button);
    void mousePressed(int x, int y, int button);
    void mouseReleased(int x, int y, int button);
    void windowResized(int w, int h);
    void dragEvent(ofDragInfo dragInfo);
    void gotMessage(ofMessage msg);
    
    ofEasyCam cam;
    ofShader shader;
    ofSpherePrimitive sphere;
    
    int i = 0; // iterator for for loop
    int dirCount = 3; // number of directories containing shaders
};
