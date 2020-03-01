#version 150

uniform vec2 resolution;
uniform float time;

out vec4 outputColor;

float gen(vec2 pos){
  vec2 center=vec2(.5/resolution.y*resolution.x,.5);
  float speed=.3;
  return
  .5*fract(tan(sin(pos.x*10.)))+
  .5*tan(sin(speed*time-distance(pos,center)*1.)*10.);
}

void main() {
  vec2 pos = gl_FragCoord.xy / resolution.y;
  vec3 color = vec3(gen(pos), .1, .35);
  outputColor = vec4(color, 1.);
}
