/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var RES;
(function (RES) {
    /**
     * @class RES.ResourceItem
     * @classdesc
     */
    var ResourceItem = (function () {
        /**
         * 构造函数
         * @method RES.ResourceItem#constructor
         * @param name {string} 加载项名称
         * @param url {string} 要加载的文件地址
         * @param type {string} 加载项文件类型
         */
        function ResourceItem(name, url, type) {
            /**
             * 所属组名
             * @member {string} RES.ResourceItem#groupName
             */
            this.groupName = "";
            /**
             * 被引用的原始数据对象
             * @member {any} RES.ResourceItem#data
             */
            this.data = null;
            this._loaded = false;
            this.name = name;
            this.url = url;
            this.type = type;
        }
        Object.defineProperty(ResourceItem.prototype, "loaded", {
            /**
             * 加载完成的标志
             * @member {boolean} RES.ResourceItem#loaded
             */
            get: function () {
                return this.data ? this.data.loaded : this._loaded;
            },
            set: function (value) {
                if (this.data)
                    this.data.loaded = value;
                this._loaded = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 转成字符串
         * @method RES.ResourceItem#toString
         * @returns {string}
         */
        ResourceItem.prototype.toString = function () {
            return "[ResourceItem name=\"" + this.name + "\" url=\"" + this.url + "\" type=\"" + this.type + "\"]";
        };
        /**
         * XML文件
         * @constant {string} RES.ResourceItem.TYPE_XML
         */
        ResourceItem.TYPE_XML = "xml";
        /**
         * 图片文件
         * @constant {string} RES.ResourceItem.TYPE_IMAGE
         */
        ResourceItem.TYPE_IMAGE = "image";
        /**
         * 二进制流文件
         * @constant {string} RES.ResourceItem.TYPE_BIN
         */
        ResourceItem.TYPE_BIN = "bin";
        /**
         * 文本文件(解析为字符串)
         * @constant {string} RES.ResourceItem.TYPE_TEXT
         */
        ResourceItem.TYPE_TEXT = "text";
        /**
         * JSON文件
         * @constant {string} RES.ResourceItem.TYPE_JSON
         */
        ResourceItem.TYPE_JSON = "json";
        /**
         * SpriteSheet文件
         * @constant {string} RES.ResourceItem.TYPE_SHEET
         */
        ResourceItem.TYPE_SHEET = "sheet";
        /**
         * BitmapTextSpriteSheet文件
         * @constant {string} RES.ResourceItem.TYPE_FONT
         */
        ResourceItem.TYPE_FONT = "font";
        /**
         * 声音文件
         * @constant {string} RES.ResourceItem.TYPE_SOUND
         */
        ResourceItem.TYPE_SOUND = "sound";
        return ResourceItem;
    })();
    RES.ResourceItem = ResourceItem;
    ResourceItem.prototype.__class__ = "RES.ResourceItem";
})(RES || (RES = {}));
