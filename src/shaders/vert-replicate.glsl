
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uProjectionMatrix;
// The size difference between an actual content rect of a DisplayObject and its underlying texture.
// Example: a DisplayObject (682, 438) would have a texture sized (1024, 512). In this case,
// uFitSize = [1024, 512] and uOriginalSize = [682, 438].
uniform vec2 uOriginalSize;
uniform vec2 uFitSize;
uniform bool uFlipX;
uniform bool uFlipY;
//uniform float uZoomFactor;

varying vec2 vTextureCoord;

void main() {
    vec3 newVertexPostion = aVertexPosition;
    vec2 newTextureCoord = aTextureCoord;
    if (uFlipX){
        //newVertexPostion.x -= uSizeDifference.x;
        newTextureCoord.x = 1.0 - newTextureCoord.x;
        newVertexPostion.x -= (uFitSize - uOriginalSize).x;
    }
    if (uFlipY){
        //newVertexPostion.y -= uSizeDifference.y;
        newTextureCoord.y = 1.0 - newTextureCoord.y;
        newVertexPostion.y -= (uFitSize - uOriginalSize).y;
    }
    //newVertexPostion.xy += uSizeDifference;
    // Position transform and color transform is performed by the Primitive Shader
    //newVertexPostion /= uZoomFactor;
    gl_Position = uProjectionMatrix * vec4(newVertexPostion.xyz, 1.0);
    vTextureCoord = newTextureCoord;
}
