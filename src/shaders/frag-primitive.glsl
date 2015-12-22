
precision mediump float;

// When drawing in the original PrimitiveTarget, turn off the alpha to ensure
// only the DisplayO
//uniform bool uSolid;
uniform float uAlpha;

varying vec4 vVertexColor;

void main() {
    //gl_FragColor = vec4(vVertexColor.rgb, (uSolid ? 1.0 : uAlpha) * vVertexColor.a);
    gl_FragColor = vec4(vVertexColor.rgb, uAlpha * vVertexColor.a);
    /*
    if (vVertexColor.a == 0.0) {
        gl_FragColor = vec4(vVertexColor.rgb, 0.0);
    } else {
        gl_FragColor = vec4(vVertexColor.rgb / vVertexColor.a, uAlpha * vVertexColor.a);
    }
    */
    //gl_FragColor = vVertexColor * uAlpha;
}
