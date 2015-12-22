
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uColorMatrix[25];

void main(void)
{

    vec4 c = texture2D(uSampler, vTextureCoord);

    gl_FragColor.r = (uColorMatrix[0] * c.r);
    gl_FragColor.r += (uColorMatrix[1] * c.g);
    gl_FragColor.r += (uColorMatrix[2] * c.b);
    gl_FragColor.r += (uColorMatrix[3] * c.a);
    gl_FragColor.r += uColorMatrix[4];

    gl_FragColor.g = (uColorMatrix[5] * c.r);
    gl_FragColor.g += (uColorMatrix[6] * c.g);
    gl_FragColor.g += (uColorMatrix[7] * c.b);
    gl_FragColor.g += (uColorMatrix[8] * c.a);
    gl_FragColor.g += uColorMatrix[9];

    gl_FragColor.b = (uColorMatrix[10] * c.r);
    gl_FragColor.b += (uColorMatrix[11] * c.g);
    gl_FragColor.b += (uColorMatrix[12] * c.b);
    gl_FragColor.b += (uColorMatrix[13] * c.a);
    gl_FragColor.b += uColorMatrix[14];

    gl_FragColor.a = (uColorMatrix[15] * c.r);
    gl_FragColor.a += (uColorMatrix[16] * c.g);
    gl_FragColor.a += (uColorMatrix[17] * c.b);
    gl_FragColor.a += (uColorMatrix[18] * c.a);
    gl_FragColor.a += uColorMatrix[19];

}
