#include "ofApp.h"

//--------------------------------------------------------------

void ofApp::setup(){
    ofSetFrameRate(60); // high frame rates greatly impact performance use either 25 or 60
    
    string shaderPath = "./";
    ofDirectory dir(shaderPath);
    dir.listDir();
    dirCount = dir.size();
    
    setupWebcam();
    sphere.set(150, 40); // Radius, Resolution
    
}

//--------------------------------------------------------------
void ofApp::update() {
    
    if(webcamInUse) webcam.update();
    
    // load individual shader. use for testing individual shaders, comment out for production build:
    // shader.load("9/shader");
    
    // cycle all shaders. comment out for testing individual shaders:
    if (ofGetFrameNum()%duration == 0) {
        shader.unload();
        ofLog() << i;
        setShader();
        
        if (!shader.isLoaded()) {
            i = 0;
            setShader();
        }
        if(++i == dirCount) {
            ofLog() << "Resetting i";
            i = 0;
        }
    }
    
    // show fps in window title
    
    std::stringstream strm;
    float fps = floor(ofGetFrameRate());
    strm << "CCi Shaders — FPS: " << fps;
    ofSetWindowTitle(strm.str());
}

//--------------------------------------------------------------
void ofApp::draw(){
    ofSetColor(120);
    
    if(webcamInUse){
        frame.begin();
        ofClear(255);
        frame.end();
        fbo.begin();
        ofClear(0, 0, 0, 255);
    }
    if(sphereInUse){
        ofEnableDepthTest();
        ofBackgroundGradient(ofColor(40), ofColor(0));
        cam.begin();
        ofPushMatrix();
    }
    
    shader.begin();
    shader.setUniform1f("time", ofGetElapsedTimef());
    shader.setUniform2f("mouse", mouseX, mouseY);
    shader.setUniform2f("resolution", ofGetWidth(), ofGetHeight());
    
    if(webcamInUse){
        shader.setUniformTexture("tex0", webcam.getTexture(), 1);
        frame.draw(0, 0);
    } else if(sphereInUse){
        sphere.draw();
        
    } else {
        ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
    }
    
    shader.end();
    
    if(webcamInUse) {
        fbo.end();
        fbo.draw(0,0);
    } else if(sphereInUse){
        ofPopMatrix();
        cam.end();
        ofDisableDepthTest();
    }
}

//--------------------------------------------------------------
void ofApp::setShader () {
    string path = std::to_string(i) + "/shader";
    
    if(i == 4) webcamInUse = true;
    if(i != 4) webcamInUse = false;
    
    if (i == 5) sphereInUse = true;
    if(i != 5) sphereInUse = false;
    
    shader.load(path);
}

//--------------------------------------------------------------
void ofApp::setupWebcam(){
    camWidth = ofGetWidth();
    camHeight = ofGetHeight();
    
    webcam.setVerbose(false);
    webcam.initGrabber(camWidth, camHeight);
    
    fbo.allocate(camWidth, camHeight);
    frame.allocate(camWidth, camHeight);
    
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){
    
}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y){
    
}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){
    camWidth = w;
    camHeight = h;
}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){
    
}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){
    
}

