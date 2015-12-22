
precision mediump float;

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform float uStrength;
uniform mat4 uProjectionMatrix;

varying vec2 vTextureCoord;
varying vec2 vBlurTexCoords[6];

void main()
{
    gl_Position = uProjectionMatrix * vec4(aVertexPosition.xyz, 1.0);
    vTextureCoord = aTextureCoord;

    vBlurTexCoords[0] = aTextureCoord + vec2(-0.012 * uStrength, 0.0);
    vBlurTexCoords[1] = aTextureCoord + vec2(-0.008 * uStrength, 0.0);
    vBlurTexCoords[2] = aTextureCoord + vec2(-0.004 * uStrength, 0.0);
    vBlurTexCoords[3] = aTextureCoord + vec2( 0.004 * uStrength, 0.0);
    vBlurTexCoords[4] = aTextureCoord + vec2( 0.008 * uStrength, 0.0);
    vBlurTexCoords[5] = aTextureCoord + vec2( 0.012 * uStrength, 0.0);
}
