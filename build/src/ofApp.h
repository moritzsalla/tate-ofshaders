#pragma once
#define WEBCAM

#include "ofMain.h"
#include "ofxPlotter.h"

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
    bool sphereInUse = false;

    ofVideoGrabber webcam;
    int camWidth;
    int camHeight;
    ofFbo fbo;
    ofFbo frame;
    void setupWebcam();
    bool webcamInUse = false;
    
    int duration = 10; // number of frames a shader is shown. App FPS set in setup greatly affects this.
    int i = 0; // iterator for for-loop
    int dirCount; // number of directories containing shaders
    
    ofxPlotter plotter;
};
