import('./loaf.js')

console.log("game")

var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;

let loaf = new Loaf()

let key = {
    "a": false,
    "A": false,
    "s": false,
    "S": false,
    "d": false,
    "D": false,
    "w": false,
    "W": false
}

window.addEventListener("keydown", e => {
    key[e.key] = true
    Object.keys(key).forEach(keyP => {
        if (key[keyP]) {
            loaf.move(keyP, "keyboard", "key")
        }
    })
})

window.addEventListener("keyup", e => {
    key[e.key] = false
})

/*
window.addEventListener("keydown", e => {
    loaf.move(e.key, "keyboard", "key")
})
*/
function connecthandler(e) {
    addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;

    console.log("Connected gamepad");
    console.log(gamepad)

    rAF(updateStatus);
}


function disconnecthandler(e) {
    removegamepad(e.gamepad);
}
    
function removegamepad(gamepad) {
    var d = document.getElementById("controller" + gamepad.index);
    document.body.removeChild(d);
    delete controllers[gamepad.index];
}


function updateStatus() {
    scangamepads();

    let i
    for (i in controllers) {
        let controllerType = controllers[i].id;
        let controller = controllers[i]

        // TODO: Make the indexes of the pressed buttons / axis be stored here, so I can detect multiple button presses and axis movement. Mabye
        let buttonsPressed = []
        let axisMoved = []

        for (let j = 0; j < controller.buttons.length; j++) {            
            let button = controller.buttons[j];
            let pressed = button.pressed;
            let touched = button.touched;
            let value = button.value;

            if (pressed) {
                loaf.move(j, controllerType, "buttons")
            }
        }

        for (let j = 0; j < controller.axes.length; j++) {
            if (controller.axes[j] >= 0.1 || controller.axes[j] <= -0.1) {
                loaf.move(controller.axes[j], controllerType, "stick", j)
            }

        }
    }

    rAF(updateStatus);
}

function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i] && (gamepads[i].index in controllers)) {
        controllers[gamepads[i].index] = gamepads[i];
        }
    }
}

if (haveEvents) {
    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);
} else if (haveWebkitEvents) {
    window.addEventListener("webkitgamepadconnected", connecthandler);
    window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
} else {
    setInterval(scangamepads, 500);
}