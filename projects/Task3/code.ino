#include <Adafruit_NeoPixel.h>
#include <tuple>

#define LED_PIN 2
#define LED_COUNT 12
#define NUM_BUTTONS 5

Adafruit_NeoPixel strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

const int BUTTONS[NUM_BUTTONS] = {13, 12, 8, 7, 4};
int buttonStates[NUM_BUTTONS] = {0,0,0,0,0};
int lastButtonStates[NUM_BUTTONS] = {0,0,0,0,0};

int lightONCount = 1;
int lightON[LED_COUNT];

auto buttonFunc = std::make_tuple(
    []() {
        for (int i = 0; i < lightONCount; i++) {
            lightON[i] = (lightON[i] - 1) % LED_COUNT;
        }
    },
    []() {
        for (int i = 0; i < lightONCount; i++) {
            lightON[i] = (lightON[i] + 1) % LED_COUNT;
        }
    },
    []() {
        lightON[lightONCount] = 0;
        lightONCount++;
        Serial.println(lightONCount);
    },
    []() {
        lightON[lightONCount] = 0;
        lightONCount++;
        Serial.println(lightONCount);
    },
    []() {
        for (int i = 0; i < LED_COUNT; i++) {
            lightON[i] = 0;
        }

        lightONCount = 0;
    }
);

void setup() {
    Serial.begin(9600);
    strip.begin();
    for (int b : BUTTONS)
        pinMode(b, INPUT);
}

void loopOldOld() {
    for (int i = 0; i < NUM_BUTTONS; i++) {
        buttonStates[i] = digitalRead(BUTTONS[i]);
    }

    // Button 1
    if (buttonStates[0] != lastButtonStates[0]) {
        if (buttonStates[0] == HIGH) {
            std::get<0>(buttonFunc);
        } else {
            Serial.println("0 off");
        }
        delay(5);
    }
    lastButtonStates[0] = buttonStates[0];

    // Button 2
    if (buttonStates[1] != lastButtonStates[1]) {
        if (buttonStates[1] == HIGH) {
            std::get<1>(buttonFunc);
        } else {
            Serial.println("1 off");
        }
        delay(5);
    }
    lastButtonStates[1] = buttonStates[1];

    // Button 3
    if (buttonStates[2] != lastButtonStates[2]) {
        if (buttonStates[2] == HIGH) {
            
        } else {
            Serial.println("2 off");
        }
        delay(5);
    }
    lastButtonStates[2] = buttonStates[2];

    // Button 4
    if (buttonStates[3] != lastButtonStates[2]) {
        if (buttonStates[3] == HIGH) {            
            std::get<3>(buttonFunc);
        } else {
            Serial.println("3 off");
        }
        delay(5);
    }
    lastButtonStates[3] = buttonStates[3];

    // Button 5
    if (buttonStates[4] != lastButtonStates[4]) {
        if (buttonStates[4] == HIGH) {
            std::get<4>(buttonFunc);
        } else {
            Serial.println("4 off");
        }
        delay(5);
    }
    lastButtonStates[4] = buttonStates[4];


    strip.clear();

    for (int i = 0; i < lightONCount; i++) {
        strip.setPixelColor(lightON[i], strip.Color(255,0,0));
    }

    strip.show();
}


/*
void loopOldOld() {
    for (int i = 0; i < NUM_BUTTONS; i++) {
        buttonStates[i] = digitalRead(BUTTONS[i]);
    }

    // Button 1
    if (buttonStates[0] != lastButtonStates[0]) {
        if (buttonStates[0] == HIGH) {
            for (int i = 0; i < lightONCount; i++) {
                lightON[i] = (lightON[i] - 1) % LED_COUNT;
            }
        } else {
            Serial.println("0 off");
        }
        delay(5);
    }
    lastButtonStates[0] = buttonStates[0];

    // Button 2
    if (buttonStates[1] != lastButtonStates[1]) {
        if (buttonStates[1] == HIGH) {
            for (int i = 0; i < lightONCount; i++) {
                lightON[i] = (lightON[i] + 1) % LED_COUNT;
            }
        } else {
            Serial.println("1 off");
        }
        delay(5);
    }
    lastButtonStates[1] = buttonStates[1];

    // Button 3
    if (buttonStates[2] != lastButtonStates[2]) {
        if (buttonStates[2] == HIGH) {
            
            lightON[lightONCount] = 0;
            lightONCount++;

            Serial.println(lightONCount);

        } else {
            Serial.println("2 off");
        }
        delay(5);
    }
    lastButtonStates[2] = buttonStates[2];

    // Button 4
    if (buttonStates[3] != lastButtonStates[2]) {
        if (buttonStates[3] == HIGH) {
            
            lightON[lightONCount] = 0;
            lightONCount--;

            Serial.println(lightONCount);

        } else {
            Serial.println("3 off");
        }
        delay(5);
    }
    lastButtonStates[3] = buttonStates[3];

    // Button 5
    if (buttonStates[4] != lastButtonStates[4]) {
        if (buttonStates[4] == HIGH) {
            
            for (int i = 0; i < LED_COUNT; i++) {
                lightON[i] = 0;
            }

            lightONCount = 0;

        } else {
            Serial.println("4 off");
        }
        delay(5);
    }
    lastButtonStates[4] = buttonStates[4];


    strip.clear();

    for (int i = 0; i < lightONCount; i++) {
        strip.setPixelColor(lightON[i], strip.Color(255,0,0));
    }

    strip.show();
}
*/



// TODO: Make lambda function for button?

/*
void loopOLD() {
    buttonState = digitalRead(BUTTONS[0]);

    if (buttonState != lastButtonState) {
        if (buttonState == HIGH) {
            lightIndex = (lightIndex + 1) % LED_COUNT;
            Serial.println(lightIndex);
            strip.clear();
        } else {
            Serial.println("off");
        }
        delay(5);
    }

    lastButtonState = buttonState;

    strip.setPixelColor(lightIndex, strip.Color(255,0,0));
    strip.show();
}
*/