# version 150

uniform vec2 resolution;
uniform float time;

out vec4 outputColor;

#define PI 3.14159
#define N 5.

float randfm(float x,float freq,float amp){
    return sin((cos(x*freq)*amp));
}

void main(void)
{
    vec2 center=(gl_FragCoord.xy);
    center.x=-100.12*sin(time/200.);
    center.y=-100.12*cos(time/200.);
    
    vec2 v = (gl_FragCoord.xy - resolution/20.) / min(resolution.y, resolution.x) * 5.;
    
    v.x=v.x-10.;
    v.y=v.y-200.;
    float col=0.;
    
    for(float i=0.;i<N;i++)
    {
        float a=i*(PI/3.);
        col+=cos(4.*(v.y*sin(a)+v.x*cos(a)+sin(time*.5)*3.));
    }
    
    col/=4.;
    
    outputColor = vec4(col*2.,col*1.,col*6.,1.);
    
}
