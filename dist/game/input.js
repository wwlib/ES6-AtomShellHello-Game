'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
    value: true
});
/**
 * Created by andrew on 3/28/15.
 */

var Input = (function () {
    function Input() {
        _classCallCheck(this, Input);

        this.pressedKeys = {};

        var thisInput = this;

        document.addEventListener('keydown', function (e) {
            thisInput.setKey(e, true);
        });

        document.addEventListener('keyup', function (e) {
            thisInput.setKey(e, false);
        });

        window.addEventListener('blur', function () {
            thisInput.pressedKeys = {};
        });
    }

    _createClass(Input, [{
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
    }]);

    return Input;
})();

exports['default'] = Input;
module.exports = exports['default'];
//# sourceMappingURL=../game/input.js.map