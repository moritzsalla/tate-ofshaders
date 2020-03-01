#version 150

uniform vec2 resolution;
uniform float time;

out vec4 outputColor;

void main(){
  vec2 pos=8.*gl_FragCoord.xy/resolution.y;
  pos.x-=3.*resolution.y/resolution.x;
  
  float speed=.5;
  const int iterations=9;
  
  for(int n=1;n<iterations;n++){
    float i=float(n);
    pos+=vec2(sin(i*.8*pos.y),sin(i*.2*pos.x+time*speed));
  }
  
  vec3 color=vec3(pos.x*.3,pos.x*.2,pos.x*.8);
  
  outputColor=vec4(color,1.);
}
