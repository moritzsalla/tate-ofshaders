# tateShaders

Upload your shaders to the **shaders/** directory. If you made a fragment shader then you don't need to upload any vertex shader.

Add a screenshot if you have one!

### Upload Format

**File Extensions:**

```
Fragment shaders = shader.frag  
Vertex shaders = shader.vert
```

**Syntax:**

```glsl
#version 150

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

out vec4 outputColor;

void main()
{ 
    outputColor = vec4(.2, .5, .6, 1.);
}
```

### Requirements

- [openFrameworks](https://github.com/openframeworks/openFrameworks)
- [ofxShader](https://github.com/patriciogonzalezvivo/ofxShader)
- [ofxPlotter](https://github.com/yeswecan/ofxPlotter)
- [ofxMidi](https://github.com/danomatika/ofxMidi)

### Enable retina resolution
Add **"High Resolution Capable" "YES"** to your **openFrameworks-Info.plist** before you compile
