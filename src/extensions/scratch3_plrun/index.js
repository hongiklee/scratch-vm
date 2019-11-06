/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const formatMessage = require('format-message');
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');

// eslint-disable-next-line max-len
// const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHN0eWxlPi5zdDJ7ZmlsbDpyZWR9LnN0M3tmaWxsOiNlMGUwZTB9LnN0NHtmaWxsOm5vbmU7c3Ryb2tlOiM2NjY7c3Ryb2tlLXdpZHRoOi41O3N0cm9rZS1taXRlcmxpbWl0OjEwfTwvc3R5bGU+PHBhdGggZD0iTTM1IDI4SDVhMSAxIDAgMCAxLTEtMVYxMmMwLS42LjQtMSAxLTFoMzBjLjUgMCAxIC40IDEgMXYxNWMwIC41LS41IDEtMSAxeiIgZmlsbD0iI2ZmZiIgaWQ9IkxheWVyXzYiLz48ZyBpZD0iTGF5ZXJfNCI+PHBhdGggY2xhc3M9InN0MiIgZD0iTTQgMjVoMzJ2Mi43SDR6TTEzIDI0aC0yLjJhMSAxIDAgMCAxLTEtMXYtOS43YzAtLjYuNC0xIDEtMUgxM2MuNiAwIDEgLjQgMSAxVjIzYzAgLjYtLjUgMS0xIDF6Ii8+PHBhdGggY2xhc3M9InN0MiIgZD0iTTYuMSAxOS4zdi0yLjJjMC0uNS40LTEgMS0xaDkuN2MuNSAwIDEgLjUgMSAxdjIuMmMwIC41LS41IDEtMSAxSDcuMWExIDEgMCAwIDEtMS0xeiIvPjxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjIyLjgiIGN5PSIxOC4yIiByPSIzLjQiLz48Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIzMC42IiBjeT0iMTguMiIgcj0iMy40Ii8+PHBhdGggY2xhc3M9InN0MiIgZD0iTTQuMiAyN2gzMS45di43SDQuMnoiLz48L2c+PGcgaWQ9IkxheWVyXzUiPjxjaXJjbGUgY2xhc3M9InN0MyIgY3g9IjIyLjgiIGN5PSIxOC4yIiByPSIyLjMiLz48Y2lyY2xlIGNsYXNzPSJzdDMiIGN4PSIzMC42IiBjeT0iMTguMiIgcj0iMi4zIi8+PHBhdGggY2xhc3M9InN0MyIgZD0iTTEyLjUgMjIuOWgtMS4yYy0uMyAwLS41LS4yLS41LS41VjE0YzAtLjMuMi0uNS41LS41aDEuMmMuMyAwIC41LjIuNS41djguNGMwIC4zLS4yLjUtLjUuNXoiLz48cGF0aCBjbGFzcz0ic3QzIiBkPSJNNy4yIDE4Ljd2LTEuMmMwLS4zLjItLjUuNS0uNWg4LjRjLjMgMCAuNS4yLjUuNXYxLjJjMCAuMy0uMi41LS41LjVINy43Yy0uMyAwLS41LS4yLS41LS41ek00IDI2aDMydjJINHoiLz48L2c+PGcgaWQ9IkxheWVyXzMiPjxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0zNS4yIDI3LjlINC44YTEgMSAwIDAgMS0xLTFWMTIuMWMwLS42LjUtMSAxLTFoMzAuNWMuNSAwIDEgLjQgMSAxVjI3YTEgMSAwIDAgMS0xLjEuOXoiLz48cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMzUuMiAyNy45SDQuOGExIDEgMCAwIDEtMS0xVjEyLjFjMC0uNi41LTEgMS0xaDMwLjVjLjUgMCAxIC40IDEgMVYyN2ExIDEgMCAwIDEtMS4xLjl6Ii8+PC9nPjwvc3ZnPg==';

// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgc3R5bGU9IiI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48c3R5bGU+LnN0MntmaWxsOnJlZH0uc3Qze2ZpbGw6I2UwZTBlMH0uc3Q0e2ZpbGw6bm9uZTtzdHJva2U6IzY2NjtzdHJva2Utd2lkdGg6LjU7c3Ryb2tlLW1pdGVybGltaXQ6MTB9PC9zdHlsZT48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTM1IDI4SDVhMSAxIDAgMCAxLTEtMVYxMmMwLS42LjQtMSAxLTFoMzBjLjUgMCAxIC40IDEgMXYxNWMwIC41LS41IDEtMSAxeiIgZmlsbD0iIzZkNmQ2ZCIgaWQ9IkxheWVyXzYiIGNsYXNzPSIiIGZpbGwtb3BhY2l0eT0iMSIvPjxwYXRoIGZpbGw9IiMyNDI0MjQiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSJub25lIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBtYXJrZXItc3RhcnQ9IiIgbWFya2VyLW1pZD0iIiBtYXJrZXItZW5kPSIiIGQ9Ik01LjE4MzY3MzQ0MTQxMDA2NSwxOS4zMzY3MzQ4MzEzMzMxNiBDNS4xODM2NzM0NDE0MTAwNjUsMTYuMDM4NzMwNjM3NDczOTU0IDcuODU1MDU2ODM4NDM2MDIyLDEzLjM2NzM0NzI0MDQ0Nzk5OCAxMS4xNTMwNjEwMzIyOTUyMjcsMTMuMzY3MzQ3MjQwNDQ3OTk4IEMxNC40NTEwNjUyMjYxNTQ0MzQsMTMuMzY3MzQ3MjQwNDQ3OTk4IDE3LjEyMjQ0ODYyMzE4MDM5LDE2LjAzODczMDYzNzQ3Mzk1NCAxNy4xMjI0NDg2MjMxODAzOSwxOS4zMzY3MzQ4MzEzMzMxNiBDMTcuMTIyNDQ4NjIzMTgwMzksMjIuNjM0NzM5MDI1MTkyMzY3IDE0LjQ1MTA2NTIyNjE1NDQzNCwyNS4zMDYxMjI0MjIyMTgzMjMgMTEuMTUzMDYxMDMyMjk1MjI3LDI1LjMwNjEyMjQyMjIxODMyMyBDNy44NTUwNTY4Mzg0MzYwMjIsMjUuMzA2MTIyNDIyMjE4MzIzIDUuMTgzNjczNDQxNDEwMDY1LDIyLjYzNDczOTAyNTE5MjM2NyA1LjE4MzY3MzQ0MTQxMDA2NSwxOS4zMzY3MzQ4MzEzMzMxNiB6IiBpZD0ic3ZnXzEiIGNsYXNzPSIiLz48cGF0aCBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1kYXNob2Zmc2V0PSIiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgbWFya2VyLXN0YXJ0PSIiIG1hcmtlci1taWQ9IiIgbWFya2VyLWVuZD0iIiBkPSJNNi42NzM0NjkzNjQ2NDMwOTcsMTkuMjk1OTE4NTMxNzE1ODcgQzYuNjczNDY5MzY0NjQzMDk3LDE2Ljc5ODQ1NTUyOTMyNjU2NCA4LjY5NjQxNDM5NjU3ODQzNywxNC43NzU1MTA0OTczOTEyMjQgMTEuMTkzODc3Mzk4OTY3NzQzLDE0Ljc3NTUxMDQ5NzM5MTIyNCBDMTMuNjkxMzQwNDAxMzU3MDUsMTQuNzc1NTEwNDk3MzkxMjI0IDE1LjcxNDI4NTQzMzI5MjM4OSwxNi43OTg0NTU1MjkzMjY1NjQgMTUuNzE0Mjg1NDMzMjkyMzg5LDE5LjI5NTkxODUzMTcxNTg3IEMxNS43MTQyODU0MzMyOTIzODksMjEuNzkzMzgxNTM0MTA1MTc2IDEzLjY5MTM0MDQwMTM1NzA1LDIzLjgxNjMyNjU2NjA0MDUxNiAxMS4xOTM4NzczOTg5Njc3NDMsMjMuODE2MzI2NTY2MDQwNTE2IEM4LjY5NjQxNDM5NjU3ODQzNywyMy44MTYzMjY1NjYwNDA1MTYgNi42NzM0NjkzNjQ2NDMwOTcsMjEuNzkzMzgxNTM0MTA1MTc2IDYuNjczNDY5MzY0NjQzMDk3LDE5LjI5NTkxODUzMTcxNTg3IHoiIGlkPSJzdmdfMiIgY2xhc3M9IiIvPjxwYXRoIGZpbGw9IiMxYTFhZWIiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSJub25lIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBtYXJrZXItc3RhcnQ9IiIgbWFya2VyLW1pZD0iIiBtYXJrZXItZW5kPSIiIGQ9Ik0yMy40NDg5Nzk3OTQ5NzkwOTUsMjAuNzk1OTE4NDc5NTYxODA2IEMyMy40NDg5Nzk3OTQ5NzkwOTUsMTkuMDM2OTgyOTA5NTAzNTY0IDI0Ljg3MzcxNzYwNjcyNjI3NCwxNy42MTIyNDUwOTc3NTYzODYgMjYuNjMyNjUzMTc2Nzg0NTE1LDE3LjYxMjI0NTA5Nzc1NjM4NiBDMjguMzkxNTg4NzQ2ODQyNzUzLDE3LjYxMjI0NTA5Nzc1NjM4NiAyOS44MTYzMjY1NTg1ODk5MzUsMTkuMDM2OTgyOTA5NTAzNTY0IDI5LjgxNjMyNjU1ODU4OTkzNSwyMC43OTU5MTg0Nzk1NjE4MDYgQzI5LjgxNjMyNjU1ODU4OTkzNSwyMi41NTQ4NTQwNDk2MjAwNDQgMjguMzkxNTg4NzQ2ODQyNzUzLDIzLjk3OTU5MTg2MTM2NzIyNiAyNi42MzI2NTMxNzY3ODQ1MTUsMjMuOTc5NTkxODYxMzY3MjI2IEMyNC44NzM3MTc2MDY3MjYyNzQsMjMuOTc5NTkxODYxMzY3MjI2IDIzLjQ0ODk3OTc5NDk3OTA5NSwyMi41NTQ4NTQwNDk2MjAwNDQgMjMuNDQ4OTc5Nzk0OTc5MDk1LDIwLjc5NTkxODQ3OTU2MTgwNiB6IiBpZD0ic3ZnXzQiIGNsYXNzPSIiLz48cGF0aCBmaWxsPSIjZWIxYTFhIiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1kYXNob2Zmc2V0PSIiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgbWFya2VyLXN0YXJ0PSIiIG1hcmtlci1taWQ9IiIgbWFya2VyLWVuZD0iIiBkPSJNMjguNzc1NTEwMDcyNzA4MTMsMTYuOTE4MzY3MjY2NjU0OTcgQzI4Ljc3NTUxMDA3MjcwODEzLDE1LjA2OTIyOTc4MTI5ODM0NyAzMC4yNzMzMTE0MzU4NDY5OTIsMTMuNTcxNDI4NDE4MTU5NDg1IDMyLjEyMjQ0ODkyMTIwMzYxLDEzLjU3MTQyODQxODE1OTQ4NSBDMzMuOTcxNTg2NDA2NTYwMjM1LDEzLjU3MTQyODQxODE1OTQ4NSAzNS40NjkzODc3Njk2OTkxLDE1LjA2OTIyOTc4MTI5ODM0NyAzNS40NjkzODc3Njk2OTkxLDE2LjkxODM2NzI2NjY1NDk3IEMzNS40NjkzODc3Njk2OTkxLDE4Ljc2NzUwNDc1MjAxMTU5IDMzLjk3MTU4NjQwNjU2MDIzNSwyMC4yNjUzMDYxMTUxNTA0NSAzMi4xMjI0NDg5MjEyMDM2MSwyMC4yNjUzMDYxMTUxNTA0NSBDMzAuMjczMzExNDM1ODQ2OTkyLDIwLjI2NTMwNjExNTE1MDQ1IDI4Ljc3NTUxMDA3MjcwODEzLDE4Ljc2NzUwNDc1MjAxMTU5IDI4Ljc3NTUxMDA3MjcwODEzLDE2LjkxODM2NzI2NjY1NDk3IHoiIGlkPSJzdmdfMyIgY2xhc3M9IiIvPjxwYXRoIGZpbGw9IiNlOGU4NDEiIGZpbGwtb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSJub25lIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWRhc2hvZmZzZXQ9IiIgZmlsbC1ydWxlPSJub256ZXJvIiBvcGFjaXR5PSIxIiBtYXJrZXItc3RhcnQ9IiIgbWFya2VyLW1pZD0iIiBtYXJrZXItZW5kPSIiIGQ9Ik0xOC41MzA2MTIyODk5MDU1NDgsMjIuNjEyMjQ0OTYzNjQ1OTM1IEMxOC41MzA2MTIyODk5MDU1NDgsMjEuNjMxMzAwMTA2MjMzIDE5LjMyNTE3NzYyNDQxMDAzLDIwLjgzNjczNDc3MTcyODUxNiAyMC4zMDYxMjI0ODE4MjI5NjgsMjAuODM2NzM0NzcxNzI4NTE2IEMyMS4yODcwNjczMzkyMzU5MDQsMjAuODM2NzM0NzcxNzI4NTE2IDIyLjA4MTYzMjY3Mzc0MDM4NywyMS42MzEzMDAxMDYyMzMgMjIuMDgxNjMyNjczNzQwMzg3LDIyLjYxMjI0NDk2MzY0NTkzNSBDMjIuMDgxNjMyNjczNzQwMzg3LDIzLjU5MzE4OTgyMTA1ODg3IDIxLjI4NzA2NzMzOTIzNTkwNCwyNC4zODc3NTUxNTU1NjMzNTQgMjAuMzA2MTIyNDgxODIyOTY4LDI0LjM4Nzc1NTE1NTU2MzM1NCBDMTkuMzI1MTc3NjI0NDEwMDMsMjQuMzg3NzU1MTU1NTYzMzU0IDE4LjUzMDYxMjI4OTkwNTU0OCwyMy41OTMxODk4MjEwNTg4NyAxOC41MzA2MTIyODk5MDU1NDgsMjIuNjEyMjQ0OTYzNjQ1OTM1IHoiIGlkPSJzdmdfNiIgY2xhc3M9IiIvPjwvZz48L3N2Zz4=';

const ACTION = {
    GET: 1,
    SET: 2,
    RESET: 3
};

const DEVICE = {
    ALIVE: 0,
    DIGITAL: 1,
    ANALOG: 2,
    PWM: 3,
    SERVO_PIN: 4,
    TONE: 5,
    PULSEIN: 6,
    ULTRASONIC: 7,
    TIMER: 8,
    LED: 9
};

const TONE_MAP = [
    33, 65, 131, 262, 523, 1046, 2093, 4186,
    35, 69, 139, 277, 554, 1109, 2217, 4435,
    37, 73, 147, 294, 587, 1175, 2349, 4699,
    39, 78, 156, 311, 622, 1245, 2849, 4978,
    41, 82, 165, 330, 659, 1319, 2637, 5274,
    44, 87, 175, 349, 698, 1397, 2794, 5588,
    46, 92, 185, 370, 740, 1480, 2960, 5920,
    49, 98, 196, 392, 784, 1568, 3136, 6272,
    52, 104, 208, 415, 831, 1661, 3322, 6645,
    55, 110, 220, 440, 880, 1760, 3520, 7040,
    58, 117, 233, 466, 932, 1865, 3729, 7459,
    62, 123, 247, 494, 988, 1976, 3951, 7902
];

const DIRECTION = {
    CENTER: 0,
    UP: 1,
    LEFT: 2,
    RIGHT: 3,
    DOWN: 4,
    LEFT_UP: 5,
    LEFT_DOWN: 6,
    RIGHT_UP: 7,
    RIGHT_DOWN: 8
};

const COLOR = {
    RED: [1.0, 0.0, 0.0],
    GREEN: [0.0, 1.0, 0.0],
    BLUE: [0.0, 0.0, 1.0],
    TEAL: [0.0, 0.21, 0.26],
    PINK: [1.0, 0.0, 0.56],
    YELLOW: [1.0, 1.0, 0.0],
    WHITE: [1.0, 1.0, 1.0]
};

const MOVE = {
    FORWARD: [1.0, 1.0],
    BACKWARD: [-1.0, -1.0],
    LEFT: [0.5, 1.0],
    RIGHT: [1.0, 0.5]
};

/**
 * Class for the coding plrun in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3PlRunBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        this.runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));

        this._playNoteForPicker = this._playNoteForPicker.bind(this);
        this.runtime.on('PLAY_NOTE', this._playNoteForPicker);

        this.digitalValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.analogValue = [0, 0, 0, 0, 0, 0];
        this.ultraSonicValue = 0;

        if (window.ipcRenderer) {
            window.ipcRenderer.on('recv-data', (event, arg) => {
                this._handleMessage(arg);
            });
        }
    }

    _handleMessage (msg) {
        const length = msg.length;
        if (length === 4) {
            return;
        }

        const data = new DataView(msg.buffer);
        if (msg[0] === 0xFF && msg[1] === 0x55) {
            const valueType = msg[2];
            const pin = msg[7];
            const device = length === 11 ? msg[8] : msg[9];

            let value = 0;
            if (valueType === 2) {
                value = data.getFloat32(3, true);
            } else if (valueType === 3) {
                value = data.getUint16(3, true);
            }
            
            if (device === DEVICE.DIGITAL) {
                this.digitalValue[pin] = value;
            } else if (device === DEVICE.ANALOG) {
                this.analogValue[pin] = value;
            } else if (device === DEVICE.ULTRASONIC) {
                this.ultraSonicValue = value;
            } else {
                console.log('unknown', value, pin, device);
            }
            
            // console.log(value, pin, device);
        }
    }
    
    _sendMessage (message) {
        if (window.ipcRenderer) {
            message[2] = message.length - 3;
            window.ipcRenderer.send('send-data', message);
        }
    }

    getInfo () {
        return {
            id: 'plrun',
            name: formatMessage({
                id: 'plrun.name',
                default: 'Coding Plrun'
            }),
            color1: '#575757',
            color2: '#171717',
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'setVibrator',
                    text: formatMessage({
                        id: 'plrun.setVibrator',
                        default: 'set vibrator [ARG1]',
                        description: 'set vibrator'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'vibratorValue',
                            defaultValue: 200
                        }
                    }
                },
                '---',
                {
                    opcode: 'setFan',
                    text: formatMessage({
                        id: 'plrun.setFan',
                        default: 'rotating fan at [ARG1] speed',
                        description: 'rotating fan'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'motorSpeed',
                            defaultValue: 0
                        }
                    }
                },
                '---',
                {
                    opcode: 'setServo',
                    text: formatMessage({
                        id: 'plrun.setServo',
                        default: 'set servo motor angle to [ARG1] degrees',
                        description: 'set servo'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 0
                        }
                    }
                },
                /*
                {
                    opcode: 'setMotor',
                    text: formatMessage({
                        id: 'plrun.setMotor',
                        default: 'turn on motor [ARG1] a [ARG2] at speed of [ARG3]',
                        description: 'set motor'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'motorWhich',
                            defaultValue: 0
                        },
                        ARG2: {
                            type: ArgumentType.NUMBER,
                            menu: 'motorSpeed',
                            defaultValue: 0
                        },
                        ARG3: {
                            type: ArgumentType.NUMBER,
                            menu: 'direction',
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'stopMotor',
                    text: formatMessage({
                        id: 'plrun.stopMotor',
                        default: 'turn off motor [ARG1]',
                        description: 'turn off motor'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'motorWhich',
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'setMove',
                    text: formatMessage({
                        id: 'plrun.setMove',
                        default: 'move robot [ARG2] at [ARG1] speed',
                        description: 'move robot'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'motorSpeed',
                            defaultValue: 0
                        },
                        ARG2: {
                            type: ArgumentType.NUMBER,
                            menu: 'robotDirection',
                            defaultValue: 0
                        }
                    }
                },
                {
                    opcode: 'stopMove',
                    text: formatMessage({
                        id: 'plrun.stopMove',
                        default: 'stop robot',
                        description: 'stop robot'
                    }),
                    blockType: BlockType.COMMAND
                },
                */
                '---',
                {
                    opcode: 'setAudioOctave',
                    text: formatMessage({
                        id: 'plrun.setAudioOctave',
                        default: 'play note [ARG1] beat [ARG2]',
                        description: 'play audio'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NOTE,
                            defaultValue: 60
                        },
                        ARG2: {
                            type: ArgumentType.NUMBER,
                            menu: 'audioBeat',
                            defaultValue: 1000
                        }
                    }
                },
                {
                    opcode: 'setAudioFreq',
                    text: formatMessage({
                        id: 'plrun.setAudioFreq',
                        default: 'play note [ARG1]Hz during [ARG2] seconds',
                        description: 'play freqency'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 3000
                        },
                        ARG2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'stopAudio',
                    text: formatMessage({
                        id: 'plrun.stopAudio',
                        default: 'stop audio during [ARG1] seconds',
                        description: 'stop audio'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'audioBeat',
                            defaultValue: 1000
                        }
                    }
                },
                '---',
                {
                    opcode: 'getUltrasonic',
                    text: formatMessage({
                        id: 'plrun.getUltrasonic',
                        default: 'get ultrasonic value',
                        description: 'get ultrasonic value'
                    }),
                    blockType: BlockType.REPORTER
                },
                '---',
                {
                    opcode: 'getJoystick',
                    text: formatMessage({
                        id: 'plrun.getJoystick',
                        default: 'joystick value is [ARG1]',
                        description: 'stop audio'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'joystickDirection',
                            defaultValue: DIRECTION.CENTER
                        }
                    }
                },
                {
                    opcode: 'getJoystickButton',
                    text: formatMessage({
                        id: 'plrun.getJoystickButton',
                        default: 'get joystick button pressed',
                        description: 'get joystick button pressed'
                    }),
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'getButton',
                    text: formatMessage({
                        id: 'plrun.getButton',
                        default: 'get switch [ARG1] preesed',
                        description: 'get switch preesed'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'buttonType',
                            defaultValue: 6
                        }
                    }
                },
                '---',
                /*
                {
                    opcode: 'setLed',
                    text: formatMessage({
                        id: 'plrun.setLed',
                        default: 'turn on LED',
                        description: 'turn on LED'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.COLOR
                        }
                    }
                },
                */
                {
                    opcode: 'setLedColor',
                    text: formatMessage({
                        id: 'plrun.setLedColor',
                        default: 'turn on [ARG1] LED in [ARG2]',
                        description: 'turn on LED'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'ledType',
                            defaultValue: 0
                        },
                        ARG2: {
                            type: ArgumentType.COLOR
                        }
                    }
                },
                {
                    opcode: 'stopLed',
                    text: formatMessage({
                        id: 'plrun.stopLed',
                        default: 'turn off [ARG1] LED',
                        description: 'turn off LED'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'ledType',
                            defaultValue: 0
                        }
                    }
                },
                /*
                '---',
                {
                    opcode: 'getSoil',
                    text: formatMessage({
                        id: 'plrun.getSoil',
                        default: 'get soil sensor value',
                        description: 'get soil sensor value'
                    }),
                    blockType: BlockType.REPORTER
                },
                */
                '---',
                {
                    opcode: 'getSoundSensor',
                    text: formatMessage({
                        id: 'plrun.getSoundSensor',
                        default: 'get sound sensor value',
                        description: 'get sound sensor value'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getLightSensor',
                    text: formatMessage({
                        id: 'plrun.getLightSensor',
                        default: 'get light sensor value',
                        description: 'get light sensor value'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getTempSensor',
                    text: formatMessage({
                        id: 'plrun.getTempSensor',
                        default: 'get temperature sensor value',
                        description: 'get temperature sensor value'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'getShakeSensor',
                    text: formatMessage({
                        id: 'plrun.getShakeSensor',
                        default: 'get shake sensor value',
                        description: 'get shake sensor value'
                    }),
                    blockType: BlockType.BOOLEAN
                },
                '---',
                {
                    opcode: 'getDigital',
                    text: formatMessage({
                        id: 'plrun.getDigital',
                        default: 'read digital port [ARG1]',
                        description: 'read digital port'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'digitalPin',
                            defaultValue: 11
                        }
                    }
                },
                {
                    opcode: 'setDigital',
                    text: formatMessage({
                        id: 'plrun.setDigital',
                        default: 'write digital port [ARG1] to value [ARG2]',
                        description: 'write digital port'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ARG1: {
                            type: ArgumentType.NUMBER,
                            menu: 'digitalPin',
                            defaultValue: 11
                        },
                        ARG2: {
                            type: ArgumentType.NUMBER,
                            menu: 'digitalValue',
                            defaultValue: 1
                        }
                    }
                },
                {
                    opcode: 'getAnalog',
                    text: formatMessage({
                        id: 'plrun.getAnalog',
                        default: 'read analog [ARG1] value',
                        description: 'read analog value'
                    }),
                    blockType: BlockType.REPORTER
                }
                /*
                {
                    opcode: 'getAnalogValue',
                    text: formatMessage({
                        id: 'plrun.getAnalogValue',
                        default: 'read variable resistance',
                        description: 'read variable resistance'
                    }),
                    blockType: BlockType.REPORTER
                }*/
            ],
            menus: {
                motorSpeed: {
                    acceptReporters: true,
                    items: [
                        {text: '0', value: 0},
                        {text: '20', value: 50},
                        {text: '40', value: 100},
                        {text: '60', value: 150},
                        {text: '80', value: 200},
                        {text: '100', value: 250}
                    ]
                },
                motorWhich: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'plrun.left',
                                default: 'left'
                            }),
                            value: 0
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.right',
                                default: 'right'
                            }),
                            value: 1
                        }
                    ]
                },
                direction: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'plrun.forward',
                                default: 'forward'
                            }),
                            value: 0
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.backward',
                                default: 'backward'
                            }),
                            value: 1
                        }
                    ]
                },
                robotDirection: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'plrun.forward',
                                default: 'forward'
                            }),
                            value: 0
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.backward',
                                default: 'backward'
                            }),
                            value: 1
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.left',
                                default: 'left'
                            }),
                            value: 2
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.right',
                                default: 'right'
                            }),
                            value: 3
                        }
                    ]
                },
                audioNote: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'plrun.do_name',
                                default: 'do'
                            }),
                            value: 1
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.do_sharp_name',
                                default: 'do#(re♭)'
                            }),
                            value: 2
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.re_name',
                                default: 're'
                            }),
                            value: 3
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.re_sharp_name',
                                default: 're#(mi♭)'
                            }),
                            value: 4
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.mi_name',
                                default: 'mi'
                            }),
                            value: 5
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.fa_name',
                                default: 'fa'
                            }),
                            value: 6
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.fa_sharp_name',
                                default: 'fa#(sol♭)'
                            }),
                            value: 7
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.sol_name',
                                default: 'sol'
                            }),
                            value: 8
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.sol_sharp_name',
                                default: 'sol#(la♭)'
                            }),
                            value: 9
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.la_name',
                                default: 'la'
                            }),
                            value: 10
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.la_sharp_name',
                                default: 'la#(si♭)'
                            }),
                            value: 11
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.si_name',
                                default: 'si'
                            }),
                            value: 12
                        }
                    ]
                },
                audioOtave: {
                    acceptReporters: true,
                    items: [
                        {text: '1', value: 1},
                        {text: '2', value: 2},
                        {text: '3', value: 3},
                        {text: '4', value: 4},
                        {text: '5', value: 5},
                        {text: '6', value: 6},
                        {text: '7', value: 7}
                    ]
                },
                audioBeat: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'plrun.buzzer_wn',
                                default: 'whole note'
                            }),
                            value: 1000
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.buzzer_hn',
                                default: 'half note'
                            }),
                            value: 500
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.buzzer_qn',
                                default: 'quarter note'
                            }),
                            value: 250
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.buzzer_en',
                                default: 'eighth note'
                            }),
                            value: 125
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.buzzer_sn',
                                default: 'sixteenth note'
                            }),
                            value: 63
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.buzzer_tn',
                                default: 'thirtysecond note'
                            }),
                            value: 31
                        }
                    ]
                },
                colorType: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'plrun.color_red',
                                default: 'red'
                            }),
                            value: 'RED'
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.color_green',
                                default: 'green'
                            }),
                            value: 'GREEN'
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.color_blue',
                                default: 'blue'
                            }),
                            value: 'BLUE'
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.color_red',
                                default: 'red'
                            }),
                            value: 'RED'
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.color_teal',
                                default: 'teal'
                            }),
                            value: 'TEAL'
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.color_pink',
                                default: 'pink'
                            }),
                            value: 'PINK    '
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.color_yellow',
                                default: 'yellow'
                            }),
                            value: 'YELLOW'
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.color_white',
                                default: 'white'
                            }),
                            value: 'WHITE'
                        }
                    ]
                },
                joystickDirection: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'plrun.joystick_center',
                                default: 'center'
                            }),
                            value: DIRECTION.CENTER
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.joystick_up',
                                default: 'up'
                            }),
                            value: DIRECTION.UP
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.joystick_left',
                                default: 'left'
                            }),
                            value: DIRECTION.LEFT
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.joystick_right',
                                default: 'right'
                            }),
                            value: DIRECTION.RIGHT
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.joystick_down',
                                default: 'down'
                            }),
                            value: DIRECTION.DOWN
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.joystick_left_up',
                                default: 'left up'
                            }),
                            value: DIRECTION.LEFT_UP
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.joystick_left_down',
                                default: 'left down'
                            }),
                            value: DIRECTION.LEFT_DOWN
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.joystick_right_up',
                                default: 'right up'
                            }),
                            value: DIRECTION.RIGHT_UP
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.joystick_right_down',
                                default: 'right down'
                            }),
                            value: DIRECTION.RIGHT_DOWN
                        }
                    ]
                },
                buttonType: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'plrun.button_red',
                                default: 'red'
                            }),
                            value: 7
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.button_blue',
                                default: 'blue'
                            }),
                            value: 6
                        }
                    ]
                },
                digitalPin: {
                    acceptReporters: true,
                    items: [
                        {
                            text: '1',
                            value: 11
                        },
                        {
                            text: '2',
                            value: 12
                        }
                    ]
                },
                digitalValue: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'plrun.on',
                                default: 'on'
                            }),
                            value: 1
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.off',
                                default: 'off'
                            }),
                            value: 0
                        }
                    ]
                },
                vibratorValue: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'plrun.power_high',
                                default: 'high'
                            }),
                            value: 200
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.power_middle',
                                default: 'middle'
                            }),
                            value: 150
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.power_low',
                                default: 'low'
                            }),
                            value: 50
                        },
                        {
                            text: formatMessage({
                                id: 'plrun.off',
                                default: 'off'
                            }),
                            value: 0
                        }
                    ]
                },
                ledType: {
                    acceptReporters: true,
                    items: [
                        {
                            text: formatMessage({
                                id: 'plrun.all',
                                default: 'all'
                            }),
                            value: 0
                        },
                        {text: '1', value: 1},
                        {text: '2', value: 2},
                        {text: '3', value: 3},
                        {text: '4', value: 4},
                        {text: '5', value: 5},
                        {text: '6', value: 6},
                        {text: '7', value: 7},
                        {text: '8', value: 8}
                    ]
                }
            }
        };
    }

    stopAll () {
    }

    setVibrator (args) {
        this._sendMessage([0xFF, 0x55, 0, 0, ACTION.SET, DEVICE.PWM, 5, Cast.toNumber(args.ARG1)]);
    }

    setFan (args) {
        this._sendMessage([0xFF, 0x55, 0, 0, ACTION.SET, DEVICE.PWM, 3, args.ARG1]);
    }

    setServo (args) {
        let degrees = args.ARG1;
        degrees = Math.max(0, degrees);
        degrees = Math.min(180, degrees);
        this._sendMessage([0xFF, 0x55, 0, 0, ACTION.SET, DEVICE.SERVO_PIN, 11, degrees]);
    }
    
    setMotor (args) {
    }
    
    stopMotor (args) {
    }
    
    setMove (args) {
    }
    
    stopMove (args) {
    }

    setAudioOctave (args) {
        const note = Math.max(Math.min(args.ARG1, 119), 24);
        const duration = Cast.toNumber(args.ARG2);
        const freq = Math.round(Math.pow(2, ((note - 69 + 12) / 12)) * 440);

        this._playNote(freq, duration);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, duration);
        });
    }
    
    setAudioFreq (args) {
        const hz = args.ARG1;
        const duration = args.ARG2 * 1000;

        this._playNote(hz, duration);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, duration);
        });
    }
    
    stopAudio (args) {
        const duration = Cast.toNumber(args.ARG1);

        this._playNote(0, 0);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, duration);
        });
    }

    _playNoteForPicker (noteNum) {
        const note = Math.max(Math.min(noteNum, 119), 24) - 24;
        const value = TONE_MAP[note];
        
        this._playNote(value, 0.25);
    }

    _playNote (note, duration) {
        const d = [0xFF, 0x55, 0, 0, ACTION.SET, DEVICE.TONE, 8,
            note & 0xFF, (note & 0xFF00) >> 8,
            duration & 0xFF, (duration & 0xFF00) >> 8];
        this._sendMessage(d);
    }
    
    getUltrasonic (args) {
        const d = [0xFF, 0x55, 0, 0, ACTION.GET, DEVICE.ULTRASONIC, 10, 9];
        this._sendMessage(d);
        return parseFloat(this.ultraSonicValue.toFixed(2));
    }
    
    _getValue (port) {
        return this.analogValue[port] === 0 ? 0 : this.analogValue[port] === 1023 ? 2 : 1;
    }

    getJoystick (args) {
        const direction = Cast.toNumber(args.ARG1);
        if (
            direction === DIRECTION.CENTER &&
            this._getValue(0) === 1 &&
            this._getValue(1) === 1
        ) {
            return true;
        } else if (
            direction === DIRECTION.DOWN &&
            this._getValue(0) === 1 &&
            this._getValue(1) === 2
        ) {
            return true;
        } else if (
            direction === DIRECTION.LEFT &&
            this._getValue(0) === 0 &&
            this._getValue(1) === 1
        ) {
            return true;
        } else if (
            direction === DIRECTION.LEFT_DOWN &&
            this._getValue(0) === 0 &&
            this._getValue(1) === 2
        ) {
            return true;
        } else if (
            direction === DIRECTION.LEFT_UP &&
            this._getValue(0) === 0 &&
            this._getValue(1) === 0
        ) {
            return true;
        } else if (
            direction === DIRECTION.RIGHT &&
            this._getValue(0) === 2 &&
            this._getValue(1) === 1
        ) {
            return true;
        } else if (
            direction === DIRECTION.RIGHT_DOWN &&
            this._getValue(0) === 2 &&
            this._getValue(1) === 2
        ) {
            return true;
        } else if (
            direction === DIRECTION.RIGHT_UP &&
            this._getValue(0) === 2 &&
            this._getValue(1) === 0
        ) {
            return true;
        } else if (
            direction === DIRECTION.UP &&
            this._getValue(0) === 1 &&
            this._getValue(1) === 0
        ) {
            return true;
        }

        return false;
    }
    
    getJoystickButton (args) {
        return this.analogValue[1] !== 0 && this.analogValue[2] !== 0;
    }
    
    getButton (args) {
        const which = Cast.toNumber(args.ARG1);

        return this.digitalValue[which] !== 0;
    }
    
    setLed (args) {
    }
    
    setLedColor (args) {
        const type = Cast.toNumber(args.ARG1);
        const rgb = Cast.toRgbColorObject(args.ARG2);
        this._sendMessage([0xFF, 0x55, 0, 0, ACTION.SET, DEVICE.LED, type, rgb.r, rgb.g, rgb.b]);
    }
    
    stopLed (args) {
        const type = Cast.toNumber(args.ARG1);
        this._sendMessage([0xFF, 0x55, 0, 0, ACTION.SET, DEVICE.LED, type, 0, 0, 0]);
    }
    
    getSoil (args) {
        return this.analogValue[3];
    }
    
    getAnalog (args) {
        return this.analogValue[5];
    }
    
    getDigital (args) {
        this._sendMessage([0xFF, 0x55, 0, 0, ACTION.GET, DEVICE.DIGITAL, args.ARG1]);
        return this.digitalValue[args.ARG1] !== 0;
    }
    
    setDigital (args) {
        this._sendMessage([0xFF, 0x55, 0, 0, ACTION.SET, DEVICE.DIGITAL, args.ARG1, args.ARG2]);
    }
    
    getAnalogValue (args) {
        return this.analogValue[4];
    }

    getSoundSensor (args) {
        return this.analogValue[2];
    }

    getLightSensor (args) {
        return this.analogValue[3];
    }

    getTempSensor (args) {
        return this.analogValue[5];
    }

    getShakeSensor (args) {
        return this.digitalValue[1] !== 0;
    }
    
    _formatMenu (menu) {
        const m = [];
        for (let i = 0; i < menu.length; i++) {
            const obj = {};
            obj.text = menu[i];
            m.push(obj);
        }
        return m;
    }
}

module.exports = Scratch3PlRunBlocks;
