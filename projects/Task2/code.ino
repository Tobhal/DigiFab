#include <Adafruit_NeoPixel.h>

#define LED_PIN 2
#define LED_COUNT 12
#define NUM_BUTTONS 5

Adafruit_NeoPixel strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

const int BUTTONS[NUM_BUTTONS] = {13, 12, 11, 10, 9};
int buttonStates[NUM_BUTTONS] = {0,0,0,0,0};
int lastButtonStates[NUM_BUTTONS] = {0,0,0,0,0};

int lightONCount = 1;
int lightON[LED_COUNT];

void setup() {
    Serial.begin(9600);
    strip.begin();
    for (int b : BUTTONS)
        pinMode(b, INPUT);
}

void loop() {
    for (int i = 0; i < NUM_BUTTONS; i++) {
        buttonStates[i] = digitalRead(BUTTONS[i]);
    }

    // Button 1
    buttonFunc(0, [](){
        for (int i = 0; i < lightONCount; i++) {
            lightON[i] = (lightON[i] - 1) % LED_COUNT;
        }
    });

    // Button 2
    buttonFunc(1, [](){
        for (int i = 0; i < lightONCount; i++) {
            lightON[i] = (lightON[i] + 1) % LED_COUNT;
        }
    });

    // Button 3
    buttonFunc(2, [](){
        lightON[lightONCount] = 0;
        lightONCount++;

        Serial.println(lightONCount);
    });

    // Button 4
    buttonFunc(3, [](){
        lightON[lightONCount] = 0;
        lightONCount--;

        Serial.println(lightONCount);
    });

    // Button 5
    buttonFunc(4, [](){
        for (int i = 0; i < LED_COUNT; i++) {
            lightON[i] = 0;
        }
        lightONCount = 0;
    });

    strip.clear();

    for (int i = 0; i < lightONCount; i++) {
        strip.setPixelColor(lightON[i], strip.Color(255,0,0));
    }

    strip.show();
}

template <typename F>
void buttonFunc(int index, F&& func) {
    if (buttonStates[index] != lastButtonStates[index]) {
        if (buttonStates[index] == HIGH) {
            func();
        } else {
            Serial.print(index);
            Serial.println(" off");
        }
        delay(5);
    }
    lastButtonStates[index] = buttonStates[index];
}


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