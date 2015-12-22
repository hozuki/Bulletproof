
precision mediump float;

attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uProjectionMatrix;
uniform mat4 uTransformMatrix;

varying vec4 vVertexColor;

void main() {
    gl_Position = uProjectionMatrix * uTransformMatrix * vec4(aVertexPosition.xyz, 1.0);
    //gl_Position = vec4(aVertexPosition.xyz, 1.0);
    vVertexColor = aVertexColor;
    //vVertexColor = aVertexColor;
}
