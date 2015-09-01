/**
 * Created by andrew on 3/28/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Input = (function () {
    function Input() {
        _classCallCheck(this, Input);

        this.pressedKeys = {};

        this.onKeyDownHandler = this.onKeyDown.bind(this);
        this.onKeyUpHandler = this.onKeyUp.bind(this);
        this.onWindowBlurHandler = this.onWindowBlur.bind(this);

        document.addEventListener('keydown', this.onKeyDownHandler);
        document.addEventListener('keyup', this.onKeyUpHandler);
        window.addEventListener('blur', this.onWindowBlurHandler);
    }

    _createClass(Input, [{
        key: 'onKeyDown',
        value: function onKeyDown(e) {
            this.setKey(e, true);
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(e) {
            this.setKey(e, false);
        }
    }, {
        key: 'onWindowBlur',
        value: function onWindowBlur() {
            this.pressedKeys = {};
        }
    }, {
        key: 'setKey',
        value: function setKey(event, status) {
            var code = event.keyCode;
            var key;

            switch (code) {
                case 32:
                    key = 'SPACE';
                    break;
                case 37:
                    key = 'LEFT';
                    break;
                case 38:
                    key = 'UP';
                    break;
                case 39:
                    key = 'RIGHT';
                    break;
                case 40:
                    key = 'DOWN';
                    break;
                default:
                    // Convert ASCII codes to letters
                    key = String.fromCharCode(code);
            }

            this.pressedKeys[key] = status;
        }
    }, {
        key: 'isDown',
        value: function isDown(key) {
            return this.pressedKeys[key.toUpperCase()];
        }
    }, {
        key: 'removeListeners',
        value: function removeListeners() {
            document.removeEventListener('keydown', this.onKeyDownHandler);
            document.removeEventListener('keyup', this.onKeyUpHandler);
            window.removeEventListener('blur', this.onWindowBlurHandler);
        }
    }]);

    return Input;
})();

exports['default'] = Input;
module.exports = exports['default'];
//# sourceMappingURL=../game/input.js.map