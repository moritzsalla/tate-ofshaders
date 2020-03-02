#version 150

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

out vec4 outputColor;

void main()
{
    float windowWidth = 1024.0;
    float windowHeight = 768.0;
        
    vec2 p = 1.5 * (2. * gl_FragCoord.xy - resolution) / max(resolution.x, resolution.y);
    
    for(int i = 1; i < 20; i++)
    {
          vec2 newp = p;
          float speed = 5.;// speed control
          newp.x += .6 / float(i) * sin(float(i) * p.y + time / (100./speed) + .3 * float(i))+1.;
          newp.y += .6 / float(i) * sin(float(i) * p.x + time / (100./speed) +.3 * float(i+10)) - 1.4;
          p = newp;
    }
    
    vec3 col = vec3( .3 * sin(3. * p.y) + .7,0., sin(p.x + p.y));
    
    outputColor = vec4(col, 5);
}
