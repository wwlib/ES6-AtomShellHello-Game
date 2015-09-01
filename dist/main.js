/**
 * Created by andrew on 4/6/15.
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gameSprite = require('./game/sprite');

var _gameSprite2 = _interopRequireDefault(_gameSprite);

var _gameInput = require('./game/input');

var _gameInput2 = _interopRequireDefault(_gameInput);

var _gameBouncingObject = require('./game/bouncingObject');

var _gameBouncingObject2 = _interopRequireDefault(_gameBouncingObject);

var _gameSoundManager = require('./game/soundManager');

var _gameSoundManager2 = _interopRequireDefault(_gameSoundManager);

var _gamePlayer = require('./game/player');

var _gamePlayer2 = _interopRequireDefault(_gamePlayer);

var _gameGame = require('./game/game');

var _gameGame2 = _interopRequireDefault(_gameGame);

var input = new _gameInput2['default']();
var keyATriggered = false;
var keyBTriggered = false;
var keySpaceTriggered = false;

// **** CANVAS ****

var canvas = document.getElementById("space-game-canvas");
console.log("New: Canvas: " + canvas);

var canvas_context = canvas.getContext("2d");
console.log("canvas: " + canvas + ", " + canvas_context);

var spriteCount = 4;
var crystal_sprite = new _gameSprite2['default']("crystal", null, 20, 20);
crystal_sprite.load("./images/crystal.png", onSpriteReady);

var player_sprite = new _gameSprite2['default']("player", null, 20, 20);
player_sprite.load("./images/player.png", onSpriteReady);

var debris_sprite = new _gameSprite2['default']("debris", null, 20, 20);
debris_sprite.load("./images/debris.png", onSpriteReady);

var bullet_sprite = new _gameSprite2['default']("bullet", null, 20, 20);
bullet_sprite.load("./images/bullet.png", onSpriteReady);

var spritesLoaded = 0;
var game = null;

// **** MAIN LOOP ****

function step(timestamp) {

    canvas_context.clearRect(0, 0, canvas.width, canvas.height);

    if (!game && spritesLoaded == spriteCount) {
        game = new _gameGame2['default'](canvas_context, player_sprite, debris_sprite, crystal_sprite, bullet_sprite);
    } else if (game) {

        if (!keyATriggered && input.isDown("A")) {
            console.log("A is pressed");
            //player.moveTo(200, 200);
            keyATriggered = true;
            keyBTriggered = false;
            scheduleAudio();
            game.warp();
        }

        if (!keyBTriggered && input.isDown("B")) {
            console.log("B is pressed");
            keyBTriggered = true;
            keyATriggered = false;
            _gameSoundManager2['default'].stopAllSounds();
        }

        if (!keySpaceTriggered && input.isDown("SPACE")) {
            keySpaceTriggered = true;
            game.shoot();
        } else if (!input.isDown("Space")) {
            keySpaceTriggered = false;
        }

        if (input.isDown("LEFT")) {
            game.left();
        }

        if (input.isDown("RIGHT")) {
            game.right();
        }

        game.update(timestamp);
        game.render();
    }

    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

// **** AUDIO ****

var audioContext = new window.AudioContext();
if (!audioContext.createGain) audioContext.createGain = audioContext.createGainNode;
if (!audioContext.createDelay) audioContext.createDelay = audioContext.createDelayNode;
if (!audioContext.createScriptProcessor) audioContext.createScriptProcessor = audioContext.createJavaScriptNode;

_gameSoundManager2['default'].init(audioContext);
_gameSoundManager2['default'].loadSounds({
    kick: './audio/kick.wav',
    snare: './audio/snare.wav',
    hihat: './audio/hihat.wav',
    shoot: './audio/shoot.wav',
    explosion: './audio/explosion.wav'
}, onAudioReady);

function onAudioReady() {
    console.log("onAudioReady: buffers: " + _gameSoundManager2['default'].buffers);
}

// scheduleAudio demonstrates the ability to schedule time-accurate audio events
// by initiating a kick, snare, hihat rhythm for 4 bars
// USe the A and B keys to start and stop the rhythm
function scheduleAudio() {

    var startTime = audioContext.currentTime; // + 0.100;
    var tempo = 160; // BPM (beats per minute)
    var eighthNoteTime = 60 / tempo / 2;

    // Play 2 bars of the following:
    for (var bar = 0; bar < 4; bar++) {
        var time = startTime + bar * 8 * eighthNoteTime;
        // Play the bass (kick) drum on beats 1, 5
        _gameSoundManager2['default'].playSoundWithIdAndTime("kick", time);
        _gameSoundManager2['default'].playSoundWithIdAndTime("kick", time + 4 * eighthNoteTime);

        // Play the snare drum on beats 3, 7
        _gameSoundManager2['default'].playSoundWithIdAndTime("snare", time + 2 * eighthNoteTime);
        _gameSoundManager2['default'].playSoundWithIdAndTime("snare", time + 6 * eighthNoteTime);

        // Play the hi-hat every eighthh note.
        for (var i = 0; i < 8; ++i) {
            _gameSoundManager2['default'].playSoundWithIdAndTime("hihat", time + i * eighthNoteTime);
        }
    }
}

// Counts the # of sprites that have been succesfully loaded
// Poor man's asset manager
function onSpriteReady(sprite) {
    console.log("onSpriteReady: " + sprite.id);
    spritesLoaded++;
}
//# sourceMappingURL=main.js.map