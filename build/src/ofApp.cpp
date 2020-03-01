#include "ofApp.h"

//--------------------------------------------------------------

void ofApp::setup(){
    ofSetFrameRate(24);
    setupWebcam();
}

//--------------------------------------------------------------
void ofApp::update() {
    //    shader.load("3/shader");

    if(webcamInUse) webcam.update();


    if (ofGetFrameNum()%100 == 0) {
        shader.unload();
        ofLog() << i;
        setShader();

        if (!shader.isLoaded()) {
            i = 0;
            setShader();
        }
        i++;
    }
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

    shader.begin();
    shader.setUniform1f("time", ofGetElapsedTimef());
    shader.setUniform2f("mouse", mouseX, mouseY);
    shader.setUniform2f("resolution", ofGetWidth(), ofGetHeight());

    if(webcamInUse){
        shader.setUniformTexture("tex0", webcam.getTexture(), 1);
        frame.draw(0, 0);
    } else {
        ofDrawRectangle(0, 0, ofGetWidth(), ofGetHeight());
    }

    shader.end();

    if(webcamInUse) {
        fbo.end();
        fbo.draw(0,0);
    }
}
  
//--------------------------------------------------------------
void ofApp::setShader () {
    string path = std::to_string(i) + "/shader";
    if(i == 4) webcamInUse = true;
    else webcamInUse = false;
    shader.load(path);
}

//--------------------------------------------------------------
void ofApp::setupWebcam(){
    int camWidth = ofGetWidth();
    int camHeight = ofGetHeight();

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

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){

}

