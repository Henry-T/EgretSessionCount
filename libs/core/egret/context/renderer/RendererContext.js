/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    /**
     * @class egret.RendererContext
     * @classdesc
     * RenderContext是游戏的渲染上下文。
     * 这是一个抽象基类，制定主要的接口
     * @extends egret.HashObject
     * @private
     */
    var RendererContext = (function (_super) {
        __extends(RendererContext, _super);
        /**
         * @method egret.RendererContext#constructor
         */
        function RendererContext() {
            _super.call(this);
            /**
             * 渲染全部纹理的时间开销
             * @member egret.RendererContext#renderCost
             */
            this.renderCost = 0;
            /**
             * 绘制纹理的缩放比率，默认值为1
             * @member egret.RendererContext#texture_scale_factor
             */
            this._texture_scale_factor = 1;
            this.profiler = egret.Profiler.getInstance();
            if (!RendererContext.blendModesForGL) {
                RendererContext.initBlendMode();
            }
        }
        Object.defineProperty(RendererContext.prototype, "texture_scale_factor", {
            get: function () {
                return this._texture_scale_factor;
            },
            set: function (value) {
                this._setTextureScaleFactor(value);
            },
            enumerable: true,
            configurable: true
        });
        RendererContext.prototype._setTextureScaleFactor = function (value) {
            this._texture_scale_factor = value;
        };
        /**
         * @method egret.RendererContext#clearScreen
         * @private
         */
        RendererContext.prototype.clearScreen = function () {
        };
        /**
         * 清除Context的渲染区域
         * @method egret.RendererContext#clearRect
         * @param x {number}
         * @param y {number}
         * @param w {number}
         * @param h {numbe}
         */
        RendererContext.prototype.clearRect = function (x, y, w, h) {
        };
        /**
         * 绘制图片
         * @method egret.RendererContext#drawImage
         * @param texture {Texture}
         * @param sourceX {any}
         * @param sourceY {any}
         * @param sourceWidth {any}
         * @param sourceHeight {any}
         * @param destX {any}
         * @param destY {any}
         * @param destWidth {any}
         * @param destHeigh {any}
         */
        RendererContext.prototype.drawImage = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, repeat) {
            if (repeat === void 0) { repeat = "no-repeat"; }
            this.profiler.onDrawImage();
        };
        /**
         * 绘制9宫图片
         * @method egret.RendererContext#drawImageScale9
         * @param texture {Texture}
         * @param sourceX {any}
         * @param sourceY {any}
         * @param sourceWidth {any}
         * @param sourceHeight {any}
         * @param destX {any}
         * @param destY {any}
         * @param destWidth {any}
         * @param destHeigh {any}
         */
        RendererContext.prototype.drawImageScale9 = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, offX, offY, destWidth, destHeight, rect) {
            return false;
        };
        RendererContext.prototype._addOneDraw = function () {
            this.profiler.onDrawImage();
        };
        /**
         * 变换Context的当前渲染矩阵
         * @method egret.RendererContext#setTransform
         * @param matrix {egret.Matri}
         */
        RendererContext.prototype.setTransform = function (matrix) {
        };
        /**
         * 设置渲染alpha
         * @method egret.RendererContext#setAlpha
         * @param value {number}
         * @param blendMode {egret.BlendMod}
         */
        RendererContext.prototype.setAlpha = function (value, blendMode) {
        };
        /**
         * 设置渲染文本参数
         * @method egret.RendererContext#setupFont
         * @param textField {TextField}
         */
        RendererContext.prototype.setupFont = function (textField, style) {
            if (style === void 0) { style = null; }
        };
        /**
         * 测量文本
         * @method egret.RendererContext#measureText
         * @param text {string}
         * @returns {number}
         * @stable B 参数很可能会需要调整，和setupFont整合
         */
        RendererContext.prototype.measureText = function (text) {
            return 0;
        };
        /**
         * 绘制文本
         * @method egret.RendererContext#drawText
         * @param textField {egret.TextField}
         * @param text {string}
         * @param x {number}
         * @param y {number}
         * @param maxWidth {numbe}
         */
        RendererContext.prototype.drawText = function (textField, text, x, y, maxWidth, style) {
            if (style === void 0) { style = null; }
            this.profiler.onDrawImage();
        };
        RendererContext.prototype.strokeRect = function (x, y, w, h, color) {
        };
        RendererContext.prototype.pushMask = function (mask) {
        };
        RendererContext.prototype.popMask = function () {
        };
        RendererContext.prototype.onRenderStart = function () {
        };
        RendererContext.prototype.onRenderFinish = function () {
        };
        RendererContext.prototype.setGlobalColorTransform = function (colorTransformMatrix) {
        };
        RendererContext.prototype.setGlobalFilter = function (filterData) {
        };
        RendererContext.createRendererContext = function (canvas) {
            return null;
        };
        RendererContext.deleteTexture = function (texture) {
            var context = egret.MainContext.instance.rendererContext;
            var gl = context["gl"];
            var bitmapData = texture._bitmapData;
            if (bitmapData) {
                var webGLTexture = bitmapData.webGLTexture;
                if (webGLTexture && gl) {
                    for (var key in webGLTexture) {
                        var glTexture = webGLTexture[key];
                        gl.deleteTexture(glTexture);
                    }
                }
                bitmapData.webGLTexture = null;
            }
        };
        RendererContext.initBlendMode = function () {
            RendererContext.blendModesForGL = {};
            RendererContext.blendModesForGL[egret.BlendMode.NORMAL] = [1, 771];
            RendererContext.blendModesForGL[egret.BlendMode.ADD] = [770, 1];
            RendererContext.blendModesForGL[egret.BlendMode.ERASE] = [0, 771];
            RendererContext.blendModesForGL[egret.BlendMode.ERASE_REVERSE] = [0, 770];
        };
        /**
         * 设置 gl 模式下的blendMode，canvas模式下不会生效
         * @method egret.RendererContext#registerBlendModeForGL
         * @param key {string} 键值
         * @param src {number} 源颜色因子
         * @param dst {number} 目标颜色因子
         * @param override {boolean} 是否覆盖
         */
        RendererContext.registerBlendModeForGL = function (key, src, dst, override) {
            if (RendererContext.blendModesForGL[key] && !override) {
                egret.Logger.warningWithErrorId(1005, key);
            }
            else {
                RendererContext.blendModesForGL[key] = [src, dst];
            }
        };
        /**
         * 是否对图像使用平滑处理
         * 该特性目前只支持Canvas
         */
        RendererContext.imageSmoothingEnabled = true;
        RendererContext.blendModesForGL = null;
        return RendererContext;
    })(egret.HashObject);
    egret.RendererContext = RendererContext;
    RendererContext.prototype.__class__ = "egret.RendererContext";
})(egret || (egret = {}));
