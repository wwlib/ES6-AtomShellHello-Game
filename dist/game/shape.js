/**
 * Created by andrew on 4/6/15.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shape = (function () {
    function Shape(x, y, width, height) {
        _classCallCheck(this, Shape);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    _createClass(Shape, [{
        key: "draw",
        value: function draw() {}
    }]);

    return Shape;
})();

exports["default"] = Shape;
module.exports = exports["default"];
//# sourceMappingURL=../game/shape.js.map