#version 150

uniform float time;
uniform vec3 cameraSpaceLightPos;

in vec4 vPosition;
in vec3 vNormal;
in vec2 vTexCoord;
// in vec4 vLighting;

out vec4 outputColor;

void main() {
    vec3 colour = vec3(1.0);
    vec3 warm = vec3(0.8, 0.4, 0.1) + colour * 0.45;
    vec3 cool = vec3(0.0, 0.3, 0.8) + colour * 0.45;
    vec3 light = vec3(-100.0, 100.0, 300.0);

    vec3 red = vec3(0.8, 0.2, 0.0);
    vec3 blue = vec3(0.0, 0.2, 0.8);

    float stripes = step(0.5, fract(vTexCoord.x * 8.0 + time * .5));

    float shade = dot(vNormal, normalize(light.xyz));

    vec3 l = normalize(vNormal.xyz - normalize(light));
    vec3 n = normalize(vNormal);
    float diffuse = max(0.0, dot(n,l));

    vec3 colA = mix(cool, warm, diffuse);
    vec3 colB = mix(red, blue, diffuse);

    colour = mix(colA, colB, stripes);

    colour *= smoothstep(-1.0, 1.0, shade*13.0);

    vec4 finalColour = vec4(colour, 1.0);

    outputColor = finalColour;// * vLighting;
}
