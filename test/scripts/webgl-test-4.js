/**
 * Created by MIC on 2015/10/6.
 */

// Use udlr to move the triangle.

"use strict";

/**
 * @type {HTMLCanvasElement}
 */
var canvas = document.getElementById("canvas");
/**
 * @type {WebGLRenderingContext}
 */
//var glc = canvas.getContext("webgl", {antialias: 1, alpha: 1, depth: 1});
// from webgl-utils.js
var glc = WebGLUtils.create3DContext(canvas, {antialias: 1, alpha: 1, depth: 1});
var gl = WebGLRenderingContext;

/**
 * @type {{x: Number, y: Number, width: Number, height: Number}}
 */
var ORIGINAL_VIEWPORT = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
};

/**
 * @param {WebGLRenderingContext} glc
 * @param {WebGLBuffer} buffer
 * @param {Number} elementSize
 * @param {Number} elementType
 * @param {Number} bufferType
 * @constructor
 */
function WebGLArrayBufferEx(glc, buffer, elementSize, elementType, bufferType) {
    /**
     * @type {WebGLRenderingContext}
     * @private
     */
    this._glc = glc;
    /**
     * @type {WebGLBuffer}
     */
    this.buffer = buffer;
    /**
     * @type {Number}
     */
    this.elementSize = elementSize;
    /**
     * @type {Number}
     */
    this.elementType = elementType;
    /**
     * @type {Number}
     */
    this.bufferType = bufferType;
}

WebGLArrayBufferEx.prototype.dispose = function () {
    this._glc.deleteBuffer(this.buffer);
    this._glc = null;
    this.buffer = null;
};

/***
 * @param {WebGLRenderingContext} glc
 * @param {Shader} shader
 * @param {HTMLImageElement|HTMLVideoElement|ImageData} [img]
 * @param {Boolean} [isRoot]
 * @constructor
 */
function RenderTarget(glc, shader, img, isRoot) {
    if (isRoot === undefined) {
        isRoot = false;
    }
    if (img === undefined) {
        img = null;
    }
    // 用于创建的基准尺寸为 canvas 的尺寸，保证缓冲区大小大于等于画面尺寸，而且左下角一直锚定在 (0,0) 处
    // 在绘制的时候，缓冲用的 render target 内部完成位移（看变换矩阵），这样不管绘制在什么偏移上都能让滤镜正确处理；
    // 显示用的 render target 超出 canvas 的部分会被截断，留在内部的是期望的结果
    this.__init(glc, glc.canvas.width, glc.canvas.height, img, isRoot);
    /**
     * @type {Shader}
     */
    this.shader = shader;
}

/**
 * @param {Number} number
 * @returns {Boolean}
 */
RenderTarget.isPowerOfTwo = function (number) {
    return number > 0 && (number & (number - 1)) === 0;
};

/**
 * http://stackoverflow.com/questions/364985/algorithm-for-finding-the-smallest-power-of-two-thats-greater-or-equal-to-a-giv
 * @param {Number} number
 * @returns {Number}
 */
RenderTarget.pow2Roundup = function (number) {
    if (number < 0)
        return 0;
    --number;
    number |= number >>> 1;
    number |= number >>> 2;
    number |= number >>> 4;
    number |= number >>> 8;
    number |= number >>> 16;
    return number + 1;
};

/***
 * @param {WebGLRenderingContext} glc
 * @param {Number} width
 * @param {Number} height
 * @param {HTMLImageElement|HTMLVideoElement|ImageData} img
 * @param {Boolean} isRoot
 * @private
 */
RenderTarget.prototype.__init = function (glc, width, height, img, isRoot) {
    width |= 0;
    height |= 0;
    /**
     * @type {Number}
     */
    this.originalWidth = width;
    /**
     * @type {Number}
     */
    this.originalHeight = height;
    if (!RenderTarget.isPowerOfTwo(width)) {
        width = RenderTarget.pow2Roundup(width);
    }
    if (!RenderTarget.isPowerOfTwo(height)) {
        height = RenderTarget.pow2Roundup(height);
    }
    /**
     * @type {WebGLRenderingContext}
     * @private
     */
    this._glc = glc;
    /**
     * @type {WebGLFramebuffer}
     */
    this.frameBuffer = null;
    /**
     * @type {WebGLRenderbuffer}
     */
    this.depthBuffer = null;
    /**
     * @type {WebGLTexture}
     */
    this.texture = null;
    /**
     * @type {Number}
     */
    this.width = width;
    /**
     * @type {Number}
     */
    this.height = height;

    // Now action!

    var _this = this;

    /**
     * @param {String} message
     * @returns {null}
     */
    function error(message) {
        glc.deleteFramebuffer(_this.frameBuffer);
        glc.deleteRenderbuffer(_this.depthBuffer);
        glc.deleteTexture(_this.texture);
        console.warn(message);
        return null;
    }

    if (!isRoot) {
        this.frameBuffer = glc.createFramebuffer();
        if (!this.frameBuffer) {
            return error("Failed to create the frame buffer.");
        }
        this.depthBuffer = glc.createRenderbuffer();
        if (!this.depthBuffer) {
            return error("Failed to create the depth buffer.");
        }
    }
    this.texture = glc.createTexture();
    if (!this.texture) {
        return error("Failed to create the texture.");
    }
    glc.bindTexture(gl.TEXTURE_2D, this.texture);
    glc.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, img);
    glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    if (!isRoot) {
        glc.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);
        glc.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
        glc.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        glc.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        glc.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);
        /**
         * @type {Number}
         */
        var status = glc.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (status !== gl.FRAMEBUFFER_COMPLETE) {
            return error("Frame buffer is not complete. Code: 0x" + status.toString(16));
        }
    }
    glc.bindFramebuffer(gl.FRAMEBUFFER, null);
    glc.bindTexture(gl.TEXTURE_2D, null);
    glc.bindRenderbuffer(gl.RENDERBUFFER, null);
};

/**
 * @param {WebGLRenderingContext} glc
 * @param {Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} data
 * @param {Number} elementSize
 * @param {Number} elementType
 * @param {Number} bufferType
 * @returns {WebGLArrayBufferEx}
 */
RenderTarget.initArrayBufferEx = function (glc, data, elementSize, elementType, bufferType) {
    var buffer = glc.createBuffer();
    if (!buffer) {
        console.warn("Failed to create the buffer.");
        return null;
    }
    glc.bindBuffer(bufferType, buffer);
    glc.bufferData(bufferType, data, gl.STATIC_DRAW);
    /**
     * @type {WebGLArrayBufferEx}
     */
    return new WebGLArrayBufferEx(glc, buffer, elementSize, elementType, bufferType);
};

RenderTarget.prototype.use = function () {
    /**
     * @type {WebGLRenderingContext}
     */
    var glc = this._glc;
    // We did not provide a image as the input, so there is no need to flip vertically.
    glc.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    glc.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
};

/**
 * @param {Number[]} vertices
 * @param {Number[]} colors
 * @param {Number[]} indices
 * @param {Boolean} [clear]
 */
RenderTarget.prototype.renderElements = function (vertices, colors, indices, clear) {
    if (clear === undefined) {
        clear = true;
    }

    /**
     * @type {WebGLRenderingContext}
     */
    var glc = this._glc;
    /**
     * @type {Shader}
     */
    var shader = this.shader;
    /**
     * @type {Float32Array}
     */
    var verticesTyped = new Float32Array(vertices);
    /**
     * @type {WebGLBuffer}
     */
    var verticesBuffer = glc.createBuffer();
    /**
     * @type {Uint16Array}
     */
    var indicesTyped = new Uint16Array(indices);
    /**
     * @type {WebGLBuffer}
     */
    var indicesBuffer = glc.createBuffer();
    /**
     * @type {Float32Array}
     */
    var colorsTyped = new Float32Array(colors);
    /**
     * @type {WebGLBuffer}
     */
    var colorsBuffer = glc.createBuffer();
    this.use();
    shader.use();
    // 如果本身绘制的东西有位移，要在 shader 中指定并更新，否则负坐标就不会被画出来
    shader.updateUniforms();
    glc.viewport(0, 0, this.width, this.height);

    /**
     * @type {Number}
     */
    var FSIZE = Float32Array.BYTES_PER_ELEMENT;
    // 假设有统一命名
    // attributes: aColor, aVertexPosition
    glc.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    glc.bufferData(gl.ARRAY_BUFFER, verticesTyped, gl.STATIC_DRAW);
    glc.vertexAttribPointer(shader.getAttributeLocation("aVertexPosition"), 3, gl.FLOAT, false, FSIZE * 3, 0);
    glc.enableVertexAttribArray(shader.getAttributeLocation("aVertexPosition"));
    glc.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    glc.bufferData(gl.ARRAY_BUFFER, colorsTyped, gl.STATIC_DRAW);
    glc.vertexAttribPointer(shader.getAttributeLocation("aColor"), 4, gl.FLOAT, false, FSIZE * 4, 0);
    glc.enableVertexAttribArray(shader.getAttributeLocation("aColor"));

    glc.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    glc.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesTyped, gl.STATIC_DRAW);

    if (clear) {
        glc.clearColor(0, 0, 0, 0);
        glc.clearDepth(0);
        glc.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    glc.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    glc.deleteBuffer(colorsBuffer);
    glc.deleteBuffer(verticesBuffer);
    glc.deleteBuffer(indicesBuffer);
};

/**
 * @param {RenderTarget} renderTarget
 * @param {Boolean} [clear]
 */
RenderTarget.prototype.renderRenderTarget = function (renderTarget, clear) {
    if (!renderTarget.texture) {
        console.error("Target has no texture.");
        return;
    }
    if (clear === undefined) {
        clear = true;
    }

    /**
     * @type {WebGLRenderingContext}
     */
    var glc = this._glc;
    /**
     * @type {Shader}
     */
    var shader = this.shader;
    /**
     * @type {Number[]}
     */
    var vertexPositions = [
        0, renderTarget.height, 0,
        renderTarget.width, renderTarget.height, 0,
        renderTarget.width, 0, 0,
        0, 0, 0
    ];
    /**
     * @type {Number[]}
     */
    var textureCoords = [
        0, 1,
        1, 1,
        1, 0,
        0, 0
    ];
    /**
     * @type {Number[]}
     */
    var textureIndices = [
        0, 1, 2,
        0, 2, 3
    ];
    /**
     * @type {Float32Array}
     */
    var vertexPositionsTyped = new Float32Array(vertexPositions);
    /**
     * @type {Float32Array}
     */
    var textureCoordsTyped = new Float32Array(textureCoords);
    /**
     * @type {Uint16Array}
     */
    var textureIndicesTyped = new Uint16Array(textureIndices);
    /**
     * @type {WebGLArrayBufferEx}
     */
    var glVertexPositionBuffer = RenderTarget.initArrayBufferEx(glc, vertexPositionsTyped, Float32Array.BYTES_PER_ELEMENT, gl.FLOAT, gl.ARRAY_BUFFER);
    /**
     * @type {WebGLArrayBufferEx}
     */
    var glTextureCoordBuffer = RenderTarget.initArrayBufferEx(glc, textureCoordsTyped, Float32Array.BYTES_PER_ELEMENT, gl.FLOAT, gl.ARRAY_BUFFER);
    /**
     * @type {WebGLArrayBufferEx}
     */
    var glTextureIndexBuffer = RenderTarget.initArrayBufferEx(glc, textureIndicesTyped, Uint16Array.BYTES_PER_ELEMENT, gl.UNSIGNED_SHORT, gl.ELEMENT_ARRAY_BUFFER);

    this.use();
    shader.use();
    shader.updateUniforms();
    glc.viewport(0, 0, renderTarget.originalWidth, renderTarget.originalHeight);
    // 由于缓冲区大小可能大于 canvas 大小，要把不用的地方裁剪掉
    glc.enable(gl.SCISSOR_TEST);
    glc.scissor(0, 0, renderTarget.originalWidth, renderTarget.originalHeight);

    /**
     * @type {Number}
     */
    var FSIZE = Float32Array.BYTES_PER_ELEMENT;

    // Bind target texture to current content
    glc.activeTexture(gl.TEXTURE0);
    glc.bindTexture(gl.TEXTURE_2D, renderTarget.texture);

    glc.bindBuffer(gl.ARRAY_BUFFER, glVertexPositionBuffer.buffer);
    glc.bufferData(gl.ARRAY_BUFFER, vertexPositionsTyped, gl.STATIC_DRAW);
    glc.vertexAttribPointer(shader.getAttributeLocation("aVertexPosition"), 3, gl.FLOAT, false, FSIZE * 3, 0);
    glc.enableVertexAttribArray(shader.getAttributeLocation("aVertexPosition"));
    glc.bindBuffer(gl.ARRAY_BUFFER, glTextureCoordBuffer.buffer);
    glc.bufferData(gl.ARRAY_BUFFER, textureCoordsTyped, gl.STATIC_DRAW);
    glc.vertexAttribPointer(shader.getAttributeLocation("aTextureCoord"), 2, gl.FLOAT, false, FSIZE * 2, 0);
    glc.enableVertexAttribArray(shader.getAttributeLocation("aTextureCoord"));

    glc.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glTextureIndexBuffer.buffer);
    glc.bufferData(gl.ELEMENT_ARRAY_BUFFER, textureIndicesTyped, gl.STATIC_DRAW);

    if (clear) {
        glc.clearColor(0, 0, 0, 0);
        glc.clearDepth(0);
        glc.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    glc.drawElements(gl.TRIANGLES, textureIndices.length, gl.UNSIGNED_SHORT, 0);

    glVertexPositionBuffer.dispose();
    glTextureCoordBuffer.dispose();
    glTextureIndexBuffer.dispose();
    glc.bindTexture(gl.TEXTURE_2D, null);
    // 别忘了恢复默认的禁止状态
    glc.disable(gl.SCISSOR_TEST);
};

RenderTarget.prototype.dispose = function () {
    this._glc.deleteTexture(this.texture);
    this._glc.deleteFramebuffer(this.frameBuffer);
    this._glc.deleteRenderbuffer(this.depthBuffer);
};

/**
 * @param {Number} type
 * @param {*} value
 * @constructor
 */
function WebGLUniform(type, value) {
    /**
     * @type {Number}
     */
    this.type = type;
    /**
     * @type {*}
     */
    this.value = value;
    /**
     * @type {WebGLUniformLocation}
     */
    this.location = null;
}

/**
 * @param {Number} [location]
 * @constructor
 */
function WebGLAttribute(location) {
    /**
     * @type {Number}
     */
    this.location = location === undefined ? 0 : location;
}

/**
 * @type {{VEC2: Number, VEC4: Number, SAMPLER2D: Number, MAT4: Number}}
 */
var UniformType = {
    VEC2: 2,
    VEC4: 4,
    SAMPLER2D: 5,
    MAT4: 10
};

/**
 * @param {WebGLRenderingContext} glc
 * @param {String} vshader
 * @param {String} fshader
 * @param {Object} uniforms
 * @param {String[]} attributeNames
 * @constructor
 */
function Shader(glc, vshader, fshader, uniforms, attributeNames) {
    /**
     * @type {WebGLProgram}
     */
    this.program = null;
    /**
     * @type {WebGLShader}
     */
    this.vertexShader = null;
    /**
     * @type {WebGLShader}
     */
    this.fragmentShader = null;
    /**
     * @type {WebGLRenderingContext}
     * @private
     */
    this._glc = glc;
    this.__init(glc, vshader, fshader);
    /**
     * @type {Object}
     */
    this.uniforms = uniforms;
    /**
     * @type {String[]}
     */
    this.attributeNames = attributeNames.slice();
    this.__cacheAttributes();
    this.__cacheUniforms();
    this.updateUniforms();
    this.use();
}

/**
 * @param {WebGLRenderingContext} glc
 * @param {String} source
 * @param {Number} type
 * @returns {WebGLShader}
 */
Shader.loadShader = function (glc, source, type) {
    /**
     * @type {WebGLShader}
     */
    var shader = glc.createShader(type);
    if (shader === null) {
        console.warn("Cannot create shader.");
        return null;
    }
    glc.shaderSource(shader, source);
    glc.compileShader(shader);
    /**
     * @type {Boolean}
     */
    var isCompiled = glc.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!isCompiled) {
        var error = glc.getShaderInfoLog(shader);
        console.warn("Failed to load shader: " + error);
        glc.deleteShader(shader);
        return null;
    }
    return shader;
};

/**
 * @param {WebGLRenderingContext} glc
 * @param {String} vshader
 * @param {String} fshader
 * @private
 */
Shader.prototype.__init = function (glc, vshader, fshader) {
    this.vertexShader = Shader.loadShader(glc, vshader, gl.VERTEX_SHADER);
    this.fragmentShader = Shader.loadShader(glc, fshader, gl.FRAGMENT_SHADER);
    if (!this.vertexShader || !this.fragmentShader) {
        return;
    }
    this.program = glc.createProgram();
    if (!this.program) {
        console.warn("Failed to create program.");
        return;
    }
    glc.attachShader(this.program, this.vertexShader);
    glc.attachShader(this.program, this.fragmentShader);
    glc.linkProgram(this.program);
    /**
     * @type {Boolean}
     */
    var isLinked = glc.getProgramParameter(this.program, gl.LINK_STATUS);
    if (!isLinked) {
        var error = glc.getProgramInfoLog(this.program);
        console.warn("Failed to link program: " + error);
        glc.deleteProgram(this.program);
        glc.deleteShader(this.vertexShader);
        glc.deleteShader(this.fragmentShader);
    }
};

Shader.prototype.__cacheUniforms = function () {
    if (this.uniforms) {
        for (var key in this.uniforms) {
            if (this.uniforms.hasOwnProperty(key)) {
                this.uniforms[key].location = this.getUniformLocation(key);
            }
        }
    }
};

Shader.prototype.__cacheAttributes = function () {
    /**
     * @type {Object}
     */
    this.attributes = Object.create(null);
    if (this.attributeNames) {
        for (var i = 0; i < this.attributeNames.length; ++i) {
            var name = this.attributeNames[i];
            this.attributes[name] = new WebGLAttribute(this.getAttributeLocation(name));
        }
    }
};

Shader.prototype.updateUniforms = function () {
    if (this.uniforms) {
        /**
         * @type {WebGLRenderingContext}
         */
        var glc = this._glc;
        glc.useProgram(this.program);
        for (var key in this.uniforms) {
            if (this.uniforms.hasOwnProperty(key)) {
                /**
                 * @type {WebGLUniform}
                 */
                var uniform = this.uniforms[key];
                switch (uniform.type) {
                    case UniformType.VEC2:
                        glc.uniform2f(uniform.location, uniform.value[0], uniform.value[1]);
                        break;
                    case UniformType.VEC4:
                        glc.uniform4f(uniform.location, uniform.value[0], uniform.value[1], uniform.value[2], uniform.value[3]);
                        break;
                    case UniformType.SAMPLER2D:
                        glc.uniform1i(uniform.location, uniform.value);
                        break;
                    case UniformType.MAT4:
                        glc.uniformMatrix4fv(uniform.location, false, uniform.value);
                        break;
                    default:
                        console.warn("Unknown uniform type: " + uniform.type);
                        break;
                }
            }
        }
    }
};

/**
 * @param {WebGLRenderingContext} glc
 */
Shader.prototype.useBy = function (glc) {
    glc.useProgram(this.program);
};

Shader.prototype.use = function () {
    this.useBy(this._glc);
};

/**
 * @param {String} name
 * @returns {WebGLUniformLocation}
 */
Shader.prototype.getUniformLocation = function (name) {
    return this._glc.getUniformLocation(this.program, name);
};

/**
 * @param {String} name
 * @return {Number}
 */
Shader.prototype.getAttributeLocation = function (name) {
    return this._glc.getAttribLocation(this.program, name);
};

/**
 * @param {HTMLElement} element
 * @returns {String}
 */
Shader.getShaderSourceFromElement = function (element) {
    return element.textContent;
};

/**
 * @param {String} name
 * @param {*} value
 */
Shader.prototype.setUniformValue = function (name, value) {
    if (this.uniforms && this.uniforms.hasOwnProperty(name)) {
        this.uniforms[name].value = value;
        this.updateUniforms();
    }
};

/** Main Logic **/

/**
 * @type {RenderTarget}
 */
var screenTarget;
/**
 * @type {RenderTarget}
 */
var pixelateTarget;
/**
 * @type {RenderTarget}
 */
var rawTarget;
/**
 * @type {RenderTarget}
 */
var rawScreenTarget;

/**
 * @type {Shader}
 */
var g_pixelateShader;

function initRenderTargets() {
    //glc.disable(gl.DEPTH_TEST);
    glc.enable(gl.BLEND);
    glc.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    var mat4 = new Matrix4();
    mat4.setOrtho(0, canvas.width, 0, canvas.height, -1000, 0);
    /**
     * @type {Shader}
     */
    var rawShader = new Shader(glc,
        Shader.getShaderSourceFromElement(document.getElementById("vshader-raw")),
        Shader.getShaderSourceFromElement(document.getElementById("fshader-raw")),
        {
            "uProjMatrix": {type: UniformType.MAT4, value: mat4.elements}
        },
        ["aVertexPosition", "aColor"]
    );
    /**
     * @type {Shader}
     */
    var screenShader = new Shader(glc,
        Shader.getShaderSourceFromElement(document.getElementById("vshader-screen")),
        Shader.getShaderSourceFromElement(document.getElementById("fshader-screen")),
        {
            "uProjMatrix": {type: UniformType.MAT4, value: mat4.elements},
            "uSampler": {type: UniformType.SAMPLER2D, value: 0}
        },
        ["aVertexPosition", "aTextureCoord"]
    );
    /**
     * @type {Shader}
     */
    var pixelateShader = new Shader(glc,
        Shader.getShaderSourceFromElement(document.getElementById("vshader-pixelate")),
        Shader.getShaderSourceFromElement(document.getElementById("fshader-pixelate")),
        {
            "uProjMatrix": {type: UniformType.MAT4, value: mat4.elements},
            "dimensions": {type: UniformType.VEC4, value: [canvas.width, canvas.height, 0, 1]},
            "pixelSize": {type: UniformType.VEC2, value: [60, 60]},
            "uSampler": {type: UniformType.SAMPLER2D, value: 0}
        },
        ["aVertexPosition", "aTextureCoord", "aColor"]
    );
    rawTarget = new RenderTarget(glc, rawShader);
    pixelateTarget = new RenderTarget(glc, pixelateShader);
    screenTarget = new RenderTarget(glc, screenShader, null, true);
    rawScreenTarget = new RenderTarget(glc, rawShader, null, true);
    g_pixelateShader = pixelateShader;
}

var $_rect_vertices = [
    0, 500, 0,
    500, 500, 0,
    500, 0, 0,
    0, 0, 0
];
var $_rect_colors = [
    1, 0, 0, 1,
    0, 1, 0, 1,
    0, 0, 1, 1,
    0, 1, 1, 1
];
var $_rect_indices = [
    0, 1, 2,
    0, 2, 3
];
var $_tri_vertices = [
    50, 200, 0,
    50, 400, 0,
    200, 350, 0
];
var $_tri_colors = [
    1, 1, 0, 1,
    0, 1, 0, 1,
    1, 0, 1, 1
];
var $_tri_indices = [
    0, 1, 2
];

/**
 * @param {Boolean} [pixelate]
 */
function render(pixelate) {
    if (pixelate === undefined) {
        pixelate = true;
    }
    if (pixelate) {
        //rawTarget.use();
        rawTarget.renderElements($_rect_vertices, $_rect_colors, $_rect_indices);
        //pixelateTarget.use();
        pixelateTarget.renderRenderTarget(rawTarget);
        //screenTarget.use();
        screenTarget.renderRenderTarget(pixelateTarget);
    } else {
        //rawScreenTarget.use();
        rawScreenTarget.renderElements($_rect_vertices, $_rect_colors, $_rect_indices);
    }
    //rawScreenTarget.use();
    //rawScreenTarget.renderElements($_tri_vertices, $_tri_colors, $_tri_indices, false);
    rawTarget.renderElements($_tri_vertices, $_tri_colors, $_tri_indices, false);
    screenTarget.renderRenderTarget(rawTarget);
}

function main() {
    initRenderTargets();
    render();
}

main();

document.getElementById("btnShowOriginal").addEventListener("click", function () {
    render(false);
});
document.getElementById("btnShowPixelate").addEventListener("click", function () {
    render();
});
document.getElementById("btnAnimate").addEventListener("click", function () {
    /**
     * @type {HTMLButtonElement}
     */
    var btn;
    btn = document.getElementById("btnShowOriginal");
    btn.disabled = true;
    btn = document.getElementById("btnShowPixelate");
    btn.disabled = true;
    btn = document.getElementById("btnAnimate");
    btn.disabled = true;

    var PIXEL_MIN = 1;
    var PIXEL_MAX = 50;
    var currentPixelSize = PIXEL_MIN;
    var STEP = 0.2;
    var up = true;

    function pixelAnim() {
        if (up) {
            currentPixelSize += STEP;
            if (currentPixelSize >= PIXEL_MAX) {
                up = false;
            }
        } else {
            currentPixelSize -= STEP;
            if (currentPixelSize <= PIXEL_MIN) {
                up = true;
            }
        }

        g_pixelateShader.setUniformValue("pixelSize", [currentPixelSize, currentPixelSize]);

        render();
    }

    addToAnimationLoop(pixelAnim, this);
});

canvas.style.backgroundColor = "black";
