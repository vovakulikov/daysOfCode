'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SwipeableTextarea = function () {
    function SwipeableTextarea() {
        _classCallCheck(this, SwipeableTextarea);

        this.container = document.querySelector('.swipe_textarea_container');
        this.textarea = this.container.querySelector('.swipe_textarea');
        this.clearButton = this.container.querySelector('.swipe_textarea_button_clear');

        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.update = this.update.bind(this);
        this.onClickClear = this.ClearBut.bind(this);

        this.storeCounter = 0;
        this.targetBCR = null;
        this.target = null;
        this.startX = 0;
        this.screenX = 0;
        this.currentX = 0;
        this.targetX = 0;
        this.draggingTextarea = false;
        this.duringAnimation = false;
        this.firstStep = true;
        this.state = [];
        this.addEventListener();

        requestAnimationFrame(this.update);
    }

    _createClass(SwipeableTextarea, [{
        key: 'addEventListener',
        value: function addEventListener() {
            this.container.addEventListener('touchstart', this.onStart);
            this.container.addEventListener('touchmove', this.onMove);
            this.container.addEventListener('touchend', this.onEnd);

            this.container.addEventListener('mousedown', this.onStart);
            this.container.addEventListener('mousemove', this.onMove);
            this.container.addEventListener('mouseup', this.onEnd);
            this.clearButton.addEventListener('click', this.onClickClear);
        }
    }, {
        key: 'ClearBut',
        value: function ClearBut(event) {
            this.storeCounter = -1 * this.state.length;
        }
    }, {
        key: 'onStart',
        value: function onStart(event) {
            if (!event.target.classList.contains('swipe_textarea')) return;
            if (this.duringAnimation) return;

            this.target = event.target;
            this.targetBCR = this.target.getBoundingClientRect();
            this.startX = event.pageX || event.touches[0].pageX;
            this.currentX = this.startX;
            this.firstStep = true;
            this.draggingTextarea = true;
            this.duringAnimation = true;

            this.target.style.willChange = 'transform';
        }
    }, {
        key: 'onMove',
        value: function onMove(event) {
            if (this.duringAnimation && !this.draggingTextarea) return;
            if (!this.target) return;

            this.currentX = event.pageX || event.touches[0].pageX;

            this.target.style.background = 'rgba(255, 165, 0, 0.41)';
        }
    }, {
        key: 'onEnd',
        value: function onEnd(event) {
            if (!this.target) return;
            if (this.duringAnimation && !this.draggingTextarea) return;

            this.targetX = 0;
            var screenX = this.currentX - this.startX;
            var tBCRw = this.targetBCR.width * 0.3;
            if (Math.abs(screenX) > tBCRw && this.draggingTextarea) {
                this.targetX = screenX > 0 ? this.targetBCR.width : -this.targetBCR.width;
            }
            var emptyField = this.targetX < 0 && !this.textarea.value;
            var emptyStore = !this.storeCounter && this.targetX > 0;
            if (emptyStore || emptyField) this.targetX = 0;

            this.target.style.background = '';
            this.draggingTextarea = false;
            this.target.removeAttribute('disabled');
        }
    }, {
        key: 'update',
        value: function update() {
            requestAnimationFrame(this.update);

            if (!this.target) return;

            if (this.draggingTextarea) {
                this.screenX = (this.currentX - this.startX) * 0.3;
            } else {
                this.screenX += (this.targetX - this.screenX) / 10;
            }
            var normalize = Math.abs(this.screenX) / this.targetBCR.width * 1.15;
            var opacity = 1 - Math.pow(normalize, 1);

            this.target.style.transform = 'translateX(' + this.screenX + 'px)';

            var NearlyAtZero = Math.abs(this.screenX) < 0.1;
            var NearlyatVisible = opacity < 0.01;

            if (this.draggingTextarea) {
                return;
            }
            this.target.style.opacity = opacity;

            if (NearlyatVisible) {
                if (this.firstStep) {
                    this.textareaHistory(this.targetX);
                    this.firstStep = false;
                }
                this.animateNewTextarea();
            }

            if (NearlyAtZero) {
                this.resetTarget();
            }
        }
    }, {
        key: 'animateNewTextarea',
        value: function animateNewTextarea() {
            var _this = this;

            var onAnimationComplete = function onAnimationComplete(evt) {
                var Newtextarea = evt.target;
                Newtextarea.removeEventListener('transitionend', onAnimationComplete);
                Newtextarea.style.transition = '';
                Newtextarea.style.transform = '';
                Newtextarea.style.opacity = '';
                _this.resetTarget();
                return;
            };
            this.target.style.transform = 'translateX(0px) translateY(50px)';
            this.target.addEventListener('transitionend', onAnimationComplete);

            requestAnimationFrame(function (_) {
                if (!_this.target) return;
                _this.target.style.transition = 'transform 150ms cubic-bezier(0,0,0.31,1), opacity 0.2s';
                _this.target.style.transform = '';
                _this.target.style.opacity = '';
            });
        }
    }, {
        key: 'textareaHistory',
        value: function textareaHistory(targetX) {

            if (targetX > 0) {
                this.storeCounter++;
                var lastElemState = this.state[this.state.length - 1];
                this.target.value = lastElemState ? this.state[Math.abs(this.storeCounter)] : '';
            } else {
                if (!this.target.value) return;
                this.state.push(this.target.value);
                this.storeCounter = -1 * this.state.length;
                this.target.value = '';
            }
        }
    }, {
        key: 'resetTarget',
        value: function resetTarget() {
            if (!this.target) return;

            this.target.style.willChange = 'initial';
            this.target.style.transform = 'none';
            this.target.style.opacity = '';
            this.target = null;
            this.targetX = 0;
            this.draggingTextarea = false;
            this.duringAnimation = false;
        }
    }]);

    return SwipeableTextarea;
}();

window.addEventListener('load', function () {
    return new SwipeableTextarea();
});