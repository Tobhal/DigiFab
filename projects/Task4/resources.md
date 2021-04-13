# ESP 32 task
Make the tix clock, but use the ESP 32. I want to use the bluethoot module, to connect to a iphone app. In the app I will be able to calebrate the clock and change colors. If i feel like i have the time i might also make a web api thing...

## ESP 32
Have some lights araged in a tix clock pattern.

Hours | Minutes | Seconds
:----:|:-------:|:------:
\# ###|  ## ### | ## ###
\# ###|  ## ### | ## ###
\# ###|  ## ### | ## ###

There can also be some buttons to change the clock so you dont need to connect to the app.

## iphone app
Comunicate to the ESP 32 using bluetooth.

### Resourses
- [Bluetooth comunication](https://randomnerdtutorials.com/esp32-bluetooth-classic-arduino-ide/)
- [Some examples](https://www.hackster.io/lemio/create-apps-for-the-esp32-using-ble-through-p5-55292d)
- [A example](http://makerangst.com/ios-ble-part-2-esp32)
- [Ios demo (short)](https://github.com/marcboeker/esp32-ble-ios-demo)
- [Ios demo (long)](https://github.com/NordicSemiconductor/IOS-nRF-Toolbox)
- [Ios bluetooth totorial](https://www.freecodecamp.org/news/ultimate-how-to-bluetooth-swift-with-hardware-in-20-minutes/)

## Web API 
Have a local server comunicationg with the ESP 32 and display the contents on a page

### Resourses
- [General information](https://randomnerdtutorials.com/esp32-useful-wi-fi-functions-arduino/)
- [More information](https://techtutorialsx.com/2017/06/29/esp32-arduino-getting-started-with-wifi/)
- [Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/network/esp_wifi.html)
- [Examples](https://github.com/espressif/arduino-esp32/tree/master/libraries/WiFi)