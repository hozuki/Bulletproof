/**
 * Created by MIC on 2015/10/17.
 */

function injectScript(src) {
    "use strict";
    var script = document.createElement("script");
    document.body.appendChild(script);
    script.src = src;
}

function testRawDraw() {
    "use strict";
    var canvas = document.getElementsByTagName("canvas")[0];
    var glc = canvas.getContext("webgl");
    var gl = WebGLRenderingContext;
    var vertexData = [
        100, 100, 0,
        100, 200, 0,
        200, 100, 0,
        200, 200, 0
    ];
    var colorData = [
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1
    ];
    var indexData = [
        0, 1, 2,
        1, 2, 3
    ];
    var vertexDataTyped = new Float32Array(vertexData);
    var colorDataTyped = new Float32Array(colorData);
    var indexDataTyped = new Uint16Array(indexData);
    var shader = ad._renderer._shaderManager._primitiveShader;
    var vertexBuffer = glc.createBuffer();
    var colorBuffer = glc.createBuffer();
    var indexBuffer = glc.createBuffer();
    var loc;

    shader.useBy(glc);
    shader.syncUniforms();
    glc.bindFramebuffer(gl.FRAMEBUFFER, null);

    glc.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    glc.bufferData(gl.ARRAY_BUFFER, vertexDataTyped, gl.STATIC_DRAW);
    loc = shader.getAttributeLocation("aVertexPosition");
    console.log("aVertexPosition: ", loc);
    glc.vertexAttribPointer(loc, 3, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 3, 0);
    glc.enableVertexAttribArray(loc);
    glc.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    glc.bufferData(gl.ARRAY_BUFFER, colorDataTyped, gl.STATIC_DRAW);
    loc = shader.getAttributeLocation("aVertexColor");
    console.log("aVertexColor: ", loc);
    glc.vertexAttribPointer(loc, 4, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 4, 0);
    glc.enableVertexAttribArray(loc);

    glc.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    glc.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexDataTyped, gl.STATIC_DRAW);

    glc.drawElements(gl.TRIANGLES, indexData.length, gl.UNSIGNED_SHORT, 0);

    glc.deleteBuffer(vertexBuffer);
    glc.deleteBuffer(colorBuffer);
    glc.deleteBuffer(indexBuffer);
}

function injectTT1() {
    "use strict";
    injectScript("scripts/tt-test-case-1.js");
}

function testDrawBuffered() {
    "use strict";
}
