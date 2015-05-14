/**
 * Created by andrew on 3/28/15.
 */

class Input {

    constructor() {

        this.pressedKeys = {};

        this.onKeyDownHandler = this.onKeyDown.bind(this);
        this.onKeyUpHandler = this.onKeyUp.bind(this);
        this.onWindowBlurHandler = this.onWindowBlur.bind(this);

        document.addEventListener('keydown', this.onKeyDownHandler);
        document.addEventListener('keyup', this.onKeyUpHandler);
        window.addEventListener('blur', this.onWindowBlurHandler);
    }

    onKeyDown(e) {
        this.setKey(e, true);
    }

    onKeyUp(e) {
        this.setKey(e, false);
    }

    onWindowBlur() {
        this.pressedKeys = {};
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

    removeListeners() {
        document.removeEventListener('keydown', this.onKeyDownHandler);
        document.removeEventListener('keyup', this.onKeyUpHandler);
        window.removeEventListener('blur', this.onWindowBlurHandler);
    }
}

export default Input;