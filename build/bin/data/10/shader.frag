// YUNHAN 2

# version 150

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
float t = time;

out vec4 outputColor;

void main () {
    
    vec2 p = ( gl_FragCoord.xy * 2.0 - resolution.xy ) /min(resolution.x, resolution.y);
    float c = 0.0;
    
    for(float l = 0.5;l < 3.0;l++){
        for (float i = 0.0;i < 5.0;i++){
            float j = i - 1.0;
            float si = sin( i *time*0.5) / 2.0 ;
            float co = cos( i*time ) / 2.0 + cos(2.-l);
            c += 0.005 / abs(length(p * 0.5*vec2(si,co)/(0.5/abs(cos(4.0)))) - 0.1 );
        }
    }
    
    outputColor += vec4(vec3(abs(c*atan(3.0))- 0.5,c*cos(5.0),abs(c*sin(t))), 1.0 );
    
}
