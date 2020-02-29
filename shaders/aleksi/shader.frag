
//modified from "The Book of Shaders" (thebookofshaders.com by Patricio Gonzalez Vivo and Jen Lowe)
#ifdef GL_ES
precision mediump float;
#endif
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
//generate random number
float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        2359246.233468);
}
// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (5.0 - 4.0 * f);
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
#define NUM_OCTAVES 6
float fbm ( in vec2 _st) {
    float v = 0.1;
    float a = 0.5;
    vec2 shift = vec2(10.);
    mat2 rot = mat2(cos(1.0), sin(0.2),
                    -sin(0.1), cos(0.3));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 4.0 + shift;
        a *= 0.5;
    }
    return v;
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy*3.;
    vec3 color = vec3(0.0);
    vec2 q = vec2(0.0);
    q.x = fbm( st + 0.04*u_time);
    q.y = fbm( st + vec2(1.0));
    vec2 r = vec2(0.0);
    r.x = fbm( st + 1.0*q + vec2(1.1,9.2)+ 0.1*u_time );
    r.y = fbm( st + 1.0*q + vec2(2.0,0.8)+ 0.1*u_time);
    float f = fbm(st+r);
    color = mix(vec3(0.01,0.219608,0.066667),
                vec3(1.0,0.0,0.0),
                clamp((f*f)*0.0,0.0,1.0));
    color = mix(color,
                vec3(1.0,0.0,0.0),
                clamp(length(q),0.5,1.0));
    color = mix(color,
                vec3(0.667,0.6,0.9),
                clamp(length(r.x),0.5,1.0));
    
    color = mix(color,
                vec3(0.0,1.,0.2),
                clamp(length(r.x),0.0,0.0));
    gl_FragColor = vec4((f*f*f+.9*f*f+.5*f)*color,1.0);
}
