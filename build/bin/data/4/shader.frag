// JOSH 1

#version 150

uniform sampler2DRect tex0;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

in vec2 texCoordVarying;

out vec4 outputColor;


void main(){
    vec2 uv = gl_FragCoord.xy / resolution;
    
    vec2 fromMid = uv - vec2(0.5);
    float distFromMid = sqrt(fromMid.x*fromMid.x + fromMid.y*fromMid.y);
    
    vec2 delta = fromMid * (1.0+sin(90.0*distFromMid-15.0*time));
    
    vec3 col = texture(tex0, (uv+delta)*resolution).rgb;// * texture(tex0, uv+delta).rgb;
    outputColor = vec4(col, 1.0);
}
