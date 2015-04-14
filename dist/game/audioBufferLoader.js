"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by andrew on 3/28/15.
 */

var AudioBufferLoader = (function () {
    function AudioBufferLoader(context, urlList, callback) {
        _classCallCheck(this, AudioBufferLoader);

        this.context = context;
        this.urlList = urlList;
        this.onload = callback;
        this.bufferList = [];
        this.loadCount = 0;
    }

    _createClass(AudioBufferLoader, [{
        key: "loadBuffer",
        value: function loadBuffer(url, index) {
            // Load buffer asynchronously
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            var thisBufferLoader = this;

            request.onload = function () {
                // Asynchronously decode the audio file data in request.response
                //console.log("onLoad: " + index);
                thisBufferLoader.context.decodeAudioData(request.response, function (buffer) {
                    if (!buffer) {
                        console.error("error decoding file data: " + url);
                        return;
                    }
                    thisBufferLoader.bufferList[index] = buffer;
                    if (++thisBufferLoader.loadCount == thisBufferLoader.urlList.length) thisBufferLoader.onload(thisBufferLoader.bufferList);
                }, function (error) {
                    console.error("decodeAudioData error", error);
                });
            };

            request.onerror = function () {
                console.error("BufferLoader: XHR error");
            };

            request.send();
        }
    }, {
        key: "load",
        value: function load() {
            for (var i = 0; i < this.urlList.length; ++i) {
                //console.log("load: " + this.urlList[i]);
                this.loadBuffer(this.urlList[i], i);
            }
        }
    }]);

    return AudioBufferLoader;
})();

exports["default"] = AudioBufferLoader;
module.exports = exports["default"];
//# sourceMappingURL=../game/audioBufferLoader.js.map