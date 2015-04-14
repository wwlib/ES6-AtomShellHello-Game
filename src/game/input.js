/**
 * Created by andrew on 3/28/15.
 */

class Input {

    constructor() {

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

    setKey(event, status) {
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

    isDown(key) {
        return this.pressedKeys[key.toUpperCase()];
    }
}

export default Input;