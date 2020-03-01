#version 150

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform vec3 cameraSpaceLightPos;

uniform float time;

in vec4 position;
in vec4 normal;
in vec2 texcoord;

out vec4 vPosition;
out vec3 vNormal;
out vec2 vTexCoord;
// out vec4 vLighting;

vec3 wobble(vec3 v, vec3 n){
    vec3 newP1 = v + n*abs(sin(v.z*(sin(time*0.01)*180.0)*0.0002))*100.0;
    vec3 newP2 = v + n*abs(cos(v.y*(cos(time*0.02)*130.0)*0.0002))*100.0;
    vec3 ret = (newP1 + newP2) * 0.5;

    return ret;
}

vec4 rotateX(vec4 v, float t){
    mat4 MX = mat4(1, 0, 0, 0, 0, cos(t), sin(t), 0, 0, -sin(t), cos(t), 0, 0, 0, 0, 1);
    return v*MX;
}
vec4 rotateY(vec4 v, float t){
    mat4 MY = mat4(cos(t), -sin(t), 0, 0, sin(t), cos(t), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return v*MY;
}


void main() {
    vec4 newPosition = position;

    newPosition.xyz = wobble(newPosition.xyz, normal.xyz);

    newPosition = rotateX(newPosition, time*0.5);
    newPosition = rotateY(newPosition, time*0.8);

    vNormal = normalize(newPosition.xyz);
    vPosition = newPosition;
    vTexCoord = texcoord;

    // mat3 normalMat = transpose(inverse(mat3(modelViewMatrix)));
    // vec3 vertNorm = normalize(normalMat * vNormal);
    // vec3 cameraSpaceVertexPos = vec3(modelViewMatrix * vPosition);
    // vec3 lightDir = normalize(cameraSpaceLightPos - cameraSpaceVertexPos);
    // float intensity = max(dot(vertNorm, lightDir), 0.2);
    // vLighting = vec4(1,0,1,1) * intensity;
    // vLighting.w = 1.0;

    // vec3 tnorm = normalize(normalMatrix * vNormal.xyz);
    // vec4 eyeCoords = modelViewMatrix * vPosition;
    // vec3 s = normalize(vec3(vec4(50.0) - eyeCoords));
//
    // LightIntensity = vec3(0.3) * vec3(0.3) * max(dot(s, tnorm), 0.0);

    gl_Position = modelViewProjectionMatrix * vPosition;
}
