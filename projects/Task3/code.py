# GOIO pin support
import RPi.GPIO as GPIO

# LED stip support
import board, neopixel

# Other
import time

NUM_LED = 10

# Store the GPIO pin and function for each button
buttons = {
    23: lambda : moveLED('left'),
    24: lambda : moveLED('right'),
    17: lambda : removeLED(),
    27: lambda : addLED(),
    22: lambda : clearLED()
}

ledsOn = 1
ledIndex = [0 for _ in range(NUM_LED)]

# Setts all the buttosn to not beeing pressed, False
buttonsPressed = [False for _ in buttons]

# Setts up the LED strip
pixels = neopixel.NeoPixel(board.D18, NUM_LED)

def moveLED(direction):
    if direction == 'left':
        for i in range(ledsOn):
            ledIndex[i] = (ledIndex[i] - 1) % NUM_LED
    elif direction == 'right':
        for i in range(ledsOn):
            ledIndex[i] = (ledIndex[i] + 1) % NUM_LED

def addLED():
    global ledsOn
    
    for i in range(ledsOn):
        if ledIndex[i] == 0:
            return
    
    ledsOn += 1
    
def removeLED():
    global ledsOn

    if ledsOn > 0:
        ledsOn -= 1
        ledIndex[ledsOn] = 0

def clearLED():
    global pixels, ledsOn, ledIndex

    pixels.fill((0,0,0))
    ledsOn = 0
    ledIndex = [0 for _ in buttons]

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

# Sett all buttons to input
for i in buttons:
    GPIO.setup(i, GPIO.IN)

while True:
    i = 0
    # Loop thrue all buttons
    for b in buttons:
        # Test if the button is pressed
        if not GPIO.input(b):
            # If button is pressed and not previesly pressed
            if not buttonsPressed[i]:
                buttonsPressed[i] = True
                buttons[b]()    # Run lambda function attached to that button
        # The button is not pressed
        else:
            buttonsPressed[i] = False

        i += 1

    # Clear all pixel colors
    pixels.fill((0,0,0))

    # Loop trhue all indexes, of the loghts that is on, and set their color.
    for l in range(ledsOn):
        pixels[ledIndex[l]] = (100,0,0)
