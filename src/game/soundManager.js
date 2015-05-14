/**
 * Created by andrew on 3/28/15.
 */

import AudioBufferLoader from './audioBufferLoader';

class SoundManager {

    constructor() {
    }

    static init(context) {
        SoundManager.audioContext = context;
        SoundManager.audioSources = [];
        SoundManager.buffers = {};
    }

    static getAudioContext() {
        return SoundManager.audioContext;
    }

    static playSoundWithIdAndTime(id, time=0) {
        var buffer = SoundManager.buffers[id];

        if (buffer && SoundManager.audioContext) {
            SoundManager.playSound(buffer, time);
        }
    }

    static playSound(buffer, time) {
        var source = SoundManager.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(SoundManager.audioContext.destination);
        source[source.start ? 'start' : 'noteOn'](time);
        SoundManager.audioSources.push(source);
    }

    static stopAllSounds() {
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

    static loadSounds(soundMap, callback) {
        // Array-ify
        var names = [];
        var paths = [];

        for (var name in soundMap) {
            var path = soundMap[name];
            names.push(name);
            paths.push(path);
            //console.log("loadSounds: " + name + ", " + path);
        }

        var bufferLoader = new AudioBufferLoader(SoundManager.audioContext, paths, function (bufferList) {
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
}

SoundManager.audioContext = null;
SoundManager.audioSources = null;
SoundManager.buffers = null;

export default SoundManager;

