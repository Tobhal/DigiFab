#include <Adafruit_NeoPixel.h>

#define LED_PIN 2
#define LED_COUNT 12
#define NUM_BUTTONS 5
#define POT_PIN A0

Adafruit_NeoPixel strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

const int BUTTONS[NUM_BUTTONS] = {13, 12, 11, 10, 9};   // Pin location of the buttons
int buttonStates[NUM_BUTTONS] = {0,0,0,0,0};            // Default state of the buttons
int lastButtonStates[NUM_BUTTONS] = {0,0,0,0,0};        // Last state of the buttons

int lightONCount = 1;       // How many lights should be on
int lightON[LED_COUNT];     // The location of the lights
long buttonColor[LED_COUNT]; // The color of the light

int potVal = 0;             // The value of the potentiometer (pot)

void setup() {
    Serial.begin(9600);         // For printing to the serial port
    strip.begin();              // Initilizes the LED strip
    for (int b : BUTTONS)       // Setts all the buttons in the BUTTONS array to input
        pinMode(b, INPUT);
    pinMode(A0, INPUT);
    
    buttonColor[0] = 16711680;  // Sets the first LED's color to read (Color(255,0,0))
}

void loop() {
    // Reads all buttons and stores theyr value
    for (int i = 0; i < NUM_BUTTONS; i++) {
        buttonStates[i] = digitalRead(BUTTONS[i]);
    }
    
    // Button 1
    buttonFunc(0, [](){
        // Loops thrue all lights defined by lightONCount
        for (int i = 0; i < lightONCount; i++) {
            // Get the light from lightON then add 1 and modulate with LED_COUNT
            lightON[i] = (lightON[i] - 1) % LED_COUNT;
        }
    });

    // Button 2
    buttonFunc(1, [](){
        // Loops thrue all lights defined by lightONCount
        for (int i = 0; i < lightONCount; i++) {
            // Get the light from lightON then add 1 and modulate with LED_COUNT
            lightON[i] = (lightON[i] + 1) % LED_COUNT;
        }
    });

    // Button 3
    buttonFunc(2, [](){
        lightON[lightONCount] = 0;          // Make shure the index of the light is 0
        potVal = analogRead(A0);
        potVal = map(potVal, 0, 1023, 0, 16777215);
        buttonColor[lightONCount] = potVal; // Setts the color of that button to the current pot value
        lightONCount++;

        Serial.println(lightONCount);
    });

    // Button 4
    buttonFunc(3, [](){
        lightON[lightONCount] = 0;      // Make shure the index of the light is 0
        buttonColor[lightONCount] = 0;  // Resett the button color
        lightONCount--;

        Serial.println(lightONCount);
    });

    // Button 5
    buttonFunc(4, [](){
        // Loop true all lights and sett the index to 0
        for (int i = 0; i < LED_COUNT; i++) {
            lightON[i] = 0;
        }
        lightONCount = 0;   // Sett the number of lights to be on to 0
    });

    strip.clear();

    for (int i = 0; i < lightONCount; i++) {
        strip.setPixelColor(lightON[i], buttonColor[i]);
    }

    strip.show();
}

template <typename F>   // Define a template with type name F
void buttonFunc(int index, F&& func) {
    // Checks if the button value has changed
    if (buttonStates[index] != lastButtonStates[index]) {
        // Checks if the buton state is HIGH
        if (buttonStates[index] == HIGH) {
            func(); // Runs the lambda function given in the parameter func
        } else {
            Serial.print(index);
            Serial.println(" off");
        }
        delay(5);   // Wait a little bit to prevent button bounce
    }
    lastButtonStates[index] = buttonStates[index];  // Updates the lastButtonState
}





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