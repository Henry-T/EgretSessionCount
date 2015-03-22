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
     * @class egret.ScrollView
     * @classdesc
     * ScrollView 是用于滑动的辅助类，将一个显示对象传入构造函数即可。可以在指定的尺寸范围内显示超过该范围的显示对象。并可以在此范围内随意拖动。
     * @extends egret.DisplayObjectContainer
     */
    var ScrollView = (function (_super) {
        __extends(ScrollView, _super);
        /**
         * 创建一个 egret.ScrollView 对象
         * @method egret.ScrollView#constructor
         * @param content {egret.DisplayObject} 需要滚动的对象
         */
        function ScrollView(content) {
            if (content === void 0) { content = null; }
            _super.call(this);
            this._lastTouchPosition = new egret.Point(0, 0);
            this._touchStartPosition = new egret.Point(0, 0);
            this._scrollStarted = false;
            this._lastTouchTime = 0;
            this._lastTouchEvent = null;
            this._velocitys = [];
            this._isHTweenPlaying = false;
            this._isVTweenPlaying = false;
            this._hScrollTween = null;
            this._vScrollTween = null;
            /**
             * 开始滚动的阈值，当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动
             * @member {number} egret.ScrollView#scrollBeginThreshold
             */
            this.scrollBeginThreshold = 10;
            /**
             * 滚动速度，这个值为需要的速度与默认速度的比值。
             * 取值范围为 scrollSpeed > 0 赋值为 2 时，速度是默认速度的 2 倍
             * @member {number} egret.ScrollView#scrollSpeed
             */
            this.scrollSpeed = 1;
            this._content = null;
            this._verticalScrollPolicy = "auto";
            this._horizontalScrollPolicy = "auto";
            this._scrollLeft = 0;
            this._scrollTop = 0;
            this._hCanScroll = false;
            this._vCanScroll = false;
            this.delayTouchBeginEvent = null;
            this.touchBeginTimer = null;
            this.touchEnabled = true;
            if (content) {
                this.setContent(content);
            }
        }
        /**
         * 设置需要滚动的对象
         * @method egret.ScrollView#setContent
         * @param content {egret.DisplayObject} 需要滚动的对象
         */
        ScrollView.prototype.setContent = function (content) {
            if (this._content === content)
                return;
            this.removeContent();
            if (content) {
                this._content = content;
                _super.prototype.addChild.call(this, content);
                this._addEvents();
            }
        };
        /**
         * 移除滚动的对象
         * @method egret.ScrollView#removeContent
         */
        ScrollView.prototype.removeContent = function () {
            if (this._content) {
                this._removeEvents();
                _super.prototype.removeChildAt.call(this, 0);
            }
            this._content = null;
        };
        Object.defineProperty(ScrollView.prototype, "verticalScrollPolicy", {
            /**
             * 垂直滚动条显示策略，on/off/auto。
             * @member egret.ScrollView#verticalScrollPolicy
             */
            get: function () {
                return this._verticalScrollPolicy;
            },
            set: function (value) {
                if (value == this._verticalScrollPolicy)
                    return;
                this._verticalScrollPolicy = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollView.prototype, "horizontalScrollPolicy", {
            /**
             * 水平滚动条显示策略，on/off/auto。
             * @member egret.ScrollView#horizontalScrollPolicy
             */
            get: function () {
                return this._horizontalScrollPolicy;
            },
            set: function (value) {
                if (value == this._horizontalScrollPolicy)
                    return;
                this._horizontalScrollPolicy = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollView.prototype, "scrollLeft", {
            /**
             * 获取或设置水平滚动位置,
             * @member {number} egret.ScrollView#scrollLeft
             * @returns {number}
             */
            get: function () {
                return this._scrollLeft;
            },
            set: function (value) {
                if (value == this._scrollLeft)
                    return;
                this._scrollLeft = value;
                this._validatePosition(false, true);
                this._updateContentPosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollView.prototype, "scrollTop", {
            /**
             * 获取或设置垂直滚动位置,
             * @member {number} egret.ScrollView#scrollTop
             * @returns {number}
             */
            get: function () {
                return this._scrollTop;
            },
            set: function (value) {
                if (value == this._scrollTop)
                    return;
                this._scrollTop = value;
                this._validatePosition(true, false);
                this._updateContentPosition();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置滚动位置
         * @method egret.ScrollView#setScrollPosition
         * @param top {number} 垂直滚动位置
         * @param left {number} 水平滚动位置
         * @param isOffset {boolean} 可选参数，默认是false，是否是滚动增加量，如 top=1 代表往上滚动1像素
         */
        ScrollView.prototype.setScrollPosition = function (top, left, isOffset) {
            if (isOffset === void 0) { isOffset = false; }
            if (isOffset && top == 0 && left == 0)
                return;
            if (!isOffset && this._scrollTop == top && this._scrollLeft == left)
                return;
            if (isOffset) {
                var isEdgeV = this._isOnTheEdge(true);
                var isEdgeH = this._isOnTheEdge(false);
                this._scrollTop += isEdgeV ? top / 2 : top;
                this._scrollLeft += isEdgeH ? left / 2 : left;
            }
            else {
                this._scrollTop = top;
                this._scrollLeft = left;
            }
            this._validatePosition(true, true);
            this._updateContentPosition();
        };
        ScrollView.prototype._isOnTheEdge = function (isVertical) {
            if (isVertical === void 0) { isVertical = true; }
            var top = this._scrollTop, left = this._scrollLeft;
            if (isVertical)
                return top < 0 || top > this.getMaxScrollTop();
            else
                return left < 0 || left > this.getMaxScrollLeft();
        };
        ScrollView.prototype._validatePosition = function (top, left) {
            if (top === void 0) { top = false; }
            if (left === void 0) { left = false; }
            if (top) {
                var height = this.height;
                var contentHeight = this._getContentHeight();
                this._scrollTop = Math.max(this._scrollTop, (0 - height) / 2);
                this._scrollTop = Math.min(this._scrollTop, contentHeight > height ? (contentHeight - height / 2) : height / 2);
            }
            if (left) {
                var width = this.width;
                var contentWidth = this._getContentWidth();
                this._scrollLeft = Math.max(this._scrollLeft, (0 - width) / 2);
                this._scrollLeft = Math.min(this._scrollLeft, contentWidth > width ? (contentWidth - width / 2) : width / 2);
            }
        };
        /**
         * @inheritDoc
         */
        ScrollView.prototype._setWidth = function (value) {
            if (this._explicitWidth == value)
                return;
            _super.prototype._setWidth.call(this, value);
            this._updateContentPosition();
        };
        /**
         * @inheritDoc
         */
        ScrollView.prototype._setHeight = function (value) {
            if (this._explicitHeight == value)
                return;
            _super.prototype._setHeight.call(this, value);
            this._updateContentPosition();
        };
        ScrollView.prototype._updateContentPosition = function () {
            var size = this.getBounds(egret.Rectangle.identity);
            var height = size.height;
            var width = size.width;
            this.scrollRect = new egret.Rectangle(this._scrollLeft, this._scrollTop, width, height);
            this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
        };
        ScrollView.prototype._checkScrollPolicy = function () {
            var hpolicy = this._horizontalScrollPolicy;
            var hCanScroll = this.__checkScrollPolicy(hpolicy, this._getContentWidth(), this.width);
            this._hCanScroll = hCanScroll;
            var vpolicy = this._verticalScrollPolicy;
            var vCanScroll = this.__checkScrollPolicy(vpolicy, this._getContentHeight(), this.height);
            this._vCanScroll = vCanScroll;
            return hCanScroll || vCanScroll;
        };
        ScrollView.prototype.__checkScrollPolicy = function (policy, contentLength, viewLength) {
            if (policy == "on")
                return true;
            if (policy == "off")
                return false;
            return contentLength > viewLength;
        };
        ScrollView.prototype._addEvents = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, true);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, true);
        };
        ScrollView.prototype._removeEvents = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, true);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, true);
        };
        ScrollView.prototype._onTouchBegin = function (e) {
            if (e._isDefaultPrevented)
                return;
            var canScroll = this._checkScrollPolicy();
            if (!canScroll) {
                return;
            }
            this._touchStartPosition.x = e.stageX;
            this._touchStartPosition.y = e.stageY;
            if (this._isHTweenPlaying || this._isVTweenPlaying) {
                this._onScrollFinished();
            }
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onTouchMove, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEnd, this);
            this.stage.addEventListener(egret.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
            this._logTouchEvent(e);
            e.preventDefault();
        };
        ScrollView.prototype._onTouchBeginCapture = function (event) {
            var canScroll = this._checkScrollPolicy();
            if (!canScroll) {
                return;
            }
            var target = event.target;
            while (target != this) {
                if ("_checkScrollPolicy" in target) {
                    canScroll = target._checkScrollPolicy();
                    if (canScroll) {
                        return;
                    }
                }
                target = target.parent;
            }
            event.stopPropagation();
            var evt = this.cloneTouchEvent(event);
            this.delayTouchBeginEvent = evt;
            if (!this.touchBeginTimer) {
                this.touchBeginTimer = new egret.Timer(100, 1);
                this.touchBeginTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this._onTouchBeginTimer, this);
            }
            this.touchBeginTimer.start();
            this._onTouchBegin(event);
        };
        ScrollView.prototype._onTouchEndCapture = function (event) {
            if (!this.delayTouchBeginEvent) {
                return;
            }
            this._onTouchBeginTimer();
        };
        ScrollView.prototype._onTouchBeginTimer = function () {
            this.touchBeginTimer.stop();
            var event = this.delayTouchBeginEvent;
            this.delayTouchBeginEvent = null;
            //Dispatch event only if the scroll view is still on the stage
            if (this.stage)
                this.dispatchPropagationEvent(event);
        };
        ScrollView.prototype.dispatchPropagationEvent = function (event) {
            var list = [];
            var target = event._target;
            var scrollerIndex = 0;
            while (target) {
                if (target == this)
                    scrollerIndex = list.length;
                list.push(target);
                target = target.parent;
            }
            var captureList = list.slice(0, scrollerIndex);
            captureList = captureList.reverse();
            list = captureList.concat(list);
            var targetIndex = scrollerIndex;
            this._dispatchPropagationEvent(event, list, targetIndex);
        };
        ScrollView.prototype._dispatchPropagationEvent = function (event, list, targetIndex) {
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var currentTarget = list[i];
                event._currentTarget = currentTarget;
                if (i < targetIndex)
                    event._eventPhase = 1;
                else if (i == targetIndex)
                    event._eventPhase = 2;
                else
                    event._eventPhase = 3;
                currentTarget._notifyListener(event);
                if (event._isPropagationStopped || event._isPropagationImmediateStopped) {
                    break;
                }
            }
        };
        ScrollView.prototype._onTouchMove = function (event) {
            if (this._lastTouchPosition.x == event.stageX && this._lastTouchPosition.y == event.stageY)
                return;
            if (!this._scrollStarted) {
                var x = event.stageX - this._touchStartPosition.x, y = event.stageY - this._touchStartPosition.y;
                var distance = Math.sqrt(x * x + y * y);
                if (distance < this.scrollBeginThreshold) {
                    this._logTouchEvent(event);
                    return;
                }
            }
            this._scrollStarted = true;
            if (this.delayTouchBeginEvent) {
                this.delayTouchBeginEvent = null;
                this.touchBeginTimer.stop();
            }
            this.touchChildren = false;
            var offset = this._getPointChange(event);
            this.setScrollPosition(offset.y, offset.x, true);
            this._calcVelocitys(event);
            this._logTouchEvent(event);
        };
        ScrollView.prototype._onTouchEnd = function (event) {
            this.touchChildren = true;
            this._scrollStarted = false;
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onTouchMove, this);
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEnd, this);
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
            this._moveAfterTouchEnd();
        };
        ScrollView.prototype._onEnterFrame = function (event) {
            var time = egret.getTimer();
            if (time - this._lastTouchTime > 100 && time - this._lastTouchTime < 300) {
                this._calcVelocitys(this._lastTouchEvent);
            }
        };
        ScrollView.prototype._logTouchEvent = function (e) {
            this._lastTouchPosition.x = e.stageX;
            this._lastTouchPosition.y = e.stageY;
            this._lastTouchEvent = this.cloneTouchEvent(e);
            this._lastTouchTime = egret.getTimer();
        };
        ScrollView.prototype._getPointChange = function (e) {
            return {
                x: this._hCanScroll === false ? 0 : (this._lastTouchPosition.x - e.stageX),
                y: this._vCanScroll === false ? 0 : (this._lastTouchPosition.y - e.stageY)
            };
        };
        ScrollView.prototype._calcVelocitys = function (e) {
            var time = egret.getTimer();
            if (this._lastTouchTime == 0) {
                this._lastTouchTime = time;
                return;
            }
            var change = this._getPointChange(e);
            var timeoffset = time - this._lastTouchTime;
            change.x /= timeoffset;
            change.y /= timeoffset;
            this._velocitys.push(change);
            if (this._velocitys.length > 5)
                this._velocitys.shift();
            this._lastTouchPosition.x = e.stageX;
            this._lastTouchPosition.y = e.stageY;
        };
        ScrollView.prototype._getContentWidth = function () {
            return this._content.explicitWidth || this._content.width;
        };
        ScrollView.prototype._getContentHeight = function () {
            return this._content.explicitHeight || this._content.height;
        };
        ScrollView.prototype.getMaxScrollLeft = function () {
            var max = this._getContentWidth() - this.width;
            return Math.max(0, max);
        };
        ScrollView.prototype.getMaxScrollTop = function () {
            var max = this._getContentHeight() - this.height;
            return Math.max(0, max);
        };
        ScrollView.prototype._moveAfterTouchEnd = function () {
            if (this._velocitys.length == 0)
                return;
            var sum = { x: 0, y: 0 }, totalW = 0;
            for (var i = 0; i < this._velocitys.length; i++) {
                var v = this._velocitys[i];
                var w = ScrollView.weight[i];
                sum.x += v.x * w;
                sum.y += v.y * w;
                totalW += w;
            }
            this._velocitys.length = 0;
            if (this.scrollSpeed <= 0)
                this.scrollSpeed = 1;
            var x = sum.x / totalW * this.scrollSpeed, y = sum.y / totalW * this.scrollSpeed;
            var pixelsPerMSX = Math.abs(x), pixelsPerMSY = Math.abs(y);
            var maxLeft = this.getMaxScrollLeft();
            var maxTop = this.getMaxScrollTop();
            var datax = pixelsPerMSX > 0.02 ? this.getAnimationDatas(x, this._scrollLeft, maxLeft) : { position: this._scrollLeft, duration: 1 };
            var datay = pixelsPerMSY > 0.02 ? this.getAnimationDatas(y, this._scrollTop, maxTop) : { position: this._scrollTop, duration: 1 };
            this.setScrollLeft(datax.position, datax.duration);
            this.setScrollTop(datay.position, datay.duration);
        };
        ScrollView.prototype._onTweenFinished = function (tw) {
            if (tw == this._vScrollTween)
                this._isVTweenPlaying = false;
            if (tw == this._hScrollTween)
                this._isHTweenPlaying = false;
            if (this._isHTweenPlaying == false && this._isVTweenPlaying == false) {
                this._onScrollFinished();
            }
        };
        ScrollView.prototype._onScrollStarted = function () {
        };
        ScrollView.prototype._onScrollFinished = function () {
            egret.Tween.removeTweens(this);
            this._hScrollTween = null;
            this._vScrollTween = null;
            this._isHTweenPlaying = false;
            this._isVTweenPlaying = false;
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        };
        ScrollView.prototype.setScrollTop = function (scrollTop, duration) {
            if (duration === void 0) { duration = 0; }
            var finalPosition = Math.min(this.getMaxScrollTop(), Math.max(scrollTop, 0));
            if (duration == 0) {
                this.scrollTop = finalPosition;
                return null;
            }
            var vtween = egret.Tween.get(this).to({ scrollTop: scrollTop }, duration, egret.Ease.quartOut);
            if (finalPosition != scrollTop) {
                vtween.to({ scrollTop: finalPosition }, 300, egret.Ease.quintOut);
            }
            this._isVTweenPlaying = true;
            this._vScrollTween = vtween;
            vtween.call(this._onTweenFinished, this, [vtween]);
            if (!this._isHTweenPlaying)
                this._onScrollStarted();
            return vtween;
        };
        ScrollView.prototype.setScrollLeft = function (scrollLeft, duration) {
            if (duration === void 0) { duration = 0; }
            var finalPosition = Math.min(this.getMaxScrollLeft(), Math.max(scrollLeft, 0));
            if (duration == 0) {
                this.scrollLeft = finalPosition;
                return null;
            }
            var htween = egret.Tween.get(this).to({ scrollLeft: scrollLeft }, duration, egret.Ease.quartOut);
            if (finalPosition != scrollLeft) {
                htween.to({ scrollLeft: finalPosition }, 300, egret.Ease.quintOut);
            }
            this._isHTweenPlaying = true;
            this._hScrollTween = htween;
            htween.call(this._onTweenFinished, this, [htween]);
            if (!this._isVTweenPlaying)
                this._onScrollStarted();
            return htween;
        };
        ScrollView.prototype.getAnimationDatas = function (pixelsPerMS, curPos, maxPos) {
            var absPixelsPerMS = Math.abs(pixelsPerMS);
            var extraFricition = 0.95;
            var duration = 0;
            var friction = 0.998;
            var minVelocity = 0.02;
            var posTo = curPos + pixelsPerMS * 500;
            if (posTo < 0 || posTo > maxPos) {
                posTo = curPos;
                while (Math.abs(pixelsPerMS) != Infinity && Math.abs(pixelsPerMS) > minVelocity) {
                    posTo += pixelsPerMS;
                    if (posTo < 0 || posTo > maxPos) {
                        pixelsPerMS *= friction * extraFricition;
                    }
                    else {
                        pixelsPerMS *= friction;
                    }
                    duration++;
                }
            }
            else {
                duration = -Math.log(minVelocity / absPixelsPerMS) * 500;
            }
            var result = {
                position: Math.min(maxPos + 50, Math.max(posTo, -50)),
                duration: duration
            };
            return result;
        };
        ScrollView.prototype.cloneTouchEvent = function (event) {
            var evt = new egret.TouchEvent(event._type, event._bubbles, event.cancelable);
            evt.touchPointID = event.touchPointID;
            evt._stageX = event._stageX;
            evt._stageY = event._stageY;
            evt.ctrlKey = event.ctrlKey;
            evt.altKey = event.altKey;
            evt.shiftKey = event.shiftKey;
            evt.touchDown = event.touchDown;
            evt._isDefaultPrevented = false;
            evt._target = event._target;
            return evt;
        };
        ScrollView.prototype.throwNotSupportedError = function () {
            throw new Error(egret.getString(1023));
        };
        /**
         * @method egret.ScrollView#addChild
         * @deprecated
         * @param child {DisplayObject}
         * @returns {DisplayObject}
         */
        ScrollView.prototype.addChild = function (child) {
            this.throwNotSupportedError();
            return null;
        };
        /**
         * @method egret.ScrollView#addChildAt
         * @deprecated
         * @param child {DisplayObject}
         * @param index {number}
         * @returns {DisplayObject}
         */
        ScrollView.prototype.addChildAt = function (child, index) {
            this.throwNotSupportedError();
            return null;
        };
        /**
         * @method egret.ScrollView#removeChild
         * @deprecated
         * @param child {DisplayObject}
         * @returns {DisplayObject}
         */
        ScrollView.prototype.removeChild = function (child) {
            this.throwNotSupportedError();
            return null;
        };
        /**
         * @method egret.ScrollView#removeChildAt
         * @deprecated
         * @param index {number}
         * @returns {DisplayObject}
         */
        ScrollView.prototype.removeChildAt = function (index) {
            this.throwNotSupportedError();
            return null;
        };
        /**
         * @method egret.ScrollView#setChildIndex
         * @deprecated
         * @param child {DisplayObject}
         * @param index {number}
         */
        ScrollView.prototype.setChildIndex = function (child, index) {
            this.throwNotSupportedError();
        };
        /**
         * @method egret.ScrollView#swapChildren
         * @deprecated
         * @param child1 {DisplayObject}
         * @param child2 {DisplayObject}
         */
        ScrollView.prototype.swapChildren = function (child1, child2) {
            this.throwNotSupportedError();
        };
        /**
         * @method egret.ScrollView#swapChildrenAt
         * @deprecated
         * @param index1 {number}
         * @param index2 {number}
         */
        ScrollView.prototype.swapChildrenAt = function (index1, index2) {
            this.throwNotSupportedError();
        };
        ScrollView.prototype.hitTest = function (x, y, ignoreTouchEnabled) {
            if (ignoreTouchEnabled === void 0) { ignoreTouchEnabled = false; }
            var childTouched = _super.prototype.hitTest.call(this, x, y, ignoreTouchEnabled);
            if (childTouched)
                return childTouched;
            return egret.DisplayObject.prototype.hitTest.call(this, x, y, ignoreTouchEnabled);
        };
        ScrollView.weight = [1, 1.33, 1.66, 2, 2.33];
        return ScrollView;
    })(egret.DisplayObjectContainer);
    egret.ScrollView = ScrollView;
    ScrollView.prototype.__class__ = "egret.ScrollView";
})(egret || (egret = {}));
