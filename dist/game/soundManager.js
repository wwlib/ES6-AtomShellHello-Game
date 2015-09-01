/**
 * Created by andrew on 3/28/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _audioBufferLoader = require('./audioBufferLoader');

var _audioBufferLoader2 = _interopRequireDefault(_audioBufferLoader);

var SoundManager = (function () {
    function SoundManager() {
        _classCallCheck(this, SoundManager);
    }

    _createClass(SoundManager, null, [{
        key: 'init',
        value: function init(context) {
            SoundManager.audioContext = context;
            SoundManager.audioSources = [];
            SoundManager.buffers = {};
        }
    }, {
        key: 'getAudioContext',
        value: function getAudioContext() {
            return SoundManager.audioContext;
        }
    }, {
        key: 'playSoundWithIdAndTime',
        value: function playSoundWithIdAndTime(id) {
            var time = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            var buffer = SoundManager.buffers[id];

            if (buffer && SoundManager.audioContext) {
                SoundManager.playSound(buffer, time);
            }
        }
    }, {
        key: 'playSound',
        value: function playSound(buffer, time) {
            var source = SoundManager.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(SoundManager.audioContext.destination);
            source[source.start ? 'start' : 'noteOn'](time);
            SoundManager.audioSources.push(source);
        }
    }, {
        key: 'stopAllSounds',
        value: function stopAllSounds() {
            var count = SoundManager.audioSources.length;

            for (var i = 0; i < count; i++) {
                var source = SoundManager.audioSources[i];
                try {
                    source.stop();
                } catch (e) {
                    console.log("error: " + e);
                }
            }
            SoundManager.audioSources = [];
        }
    }, {
        key: 'loadSounds',
        value: function loadSounds(soundMap, callback) {
            // Array-ify
            var names = [];
            var paths = [];

            for (var name in soundMap) {
                var path = soundMap[name];
                names.push(name);
                paths.push(path);
                //console.log("loadSounds: " + name + ", " + path);
            }

            var bufferLoader = new _audioBufferLoader2['default'](SoundManager.audioContext, paths, function (bufferList) {
                for (var i = 0; i < bufferList.length; i++) {
                    var buffer = bufferList[i];
                    var name = names[i];
                    //console.log("Adding buffer: " + name);
                    SoundManager.buffers[name] = buffer;
                }
                if (callback) {
                    callback();
                }
            });

            bufferLoader.load();
        }
    }]);

    return SoundManager;
})();

SoundManager.audioContext = null;
SoundManager.audioSources = null;
SoundManager.buffers = null;

exports['default'] = SoundManager;
module.exports = exports['default'];
//# sourceMappingURL=../game/soundManager.js.map