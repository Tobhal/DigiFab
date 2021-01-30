class Loaf {
    constructor() {
        console.log("loaf");

        this.defaultX = 10;
        this.defaultY = 70;

        this.x = parseInt(document.styleSheets[0]["rules"][3]["style"]["background-position-x"])
        this.y = parseInt(document.styleSheets[0]["rules"][3]["style"]["background-position-y"])
        
        this.size = document.styleSheets[0]["rules"][3]["style"]["background-size"]
        this.sizeX = this.size.split(" ")[0];
        this.sizeY = this.size.split(" ")[1];

        this.image = "loafturtle.jpg"
    }

    move(key, typeControler, inputType, index) {
        let type = typeControler
        
        let oldX = parseInt(document.styleSheets[0]["rules"][3]["style"]["background-position-x"]);
        let oldY = parseInt(document.styleSheets[0]["rules"][3]["style"]["background-position-y"]);



        if (type == "xinput" && inputType == "buttons") {
            switch (key) {
            // Facebuttons
            case 0: // A
                //console.log("A")
            break;
            case 1: // B
                //console.log("B")
            break;
            case 2: // X
                //console.log("X")
            break;
            case 3: // Y
                //console.log("Y")
            break;

            // Directions
            case 13: // Down
                //console.log("Down")
                oldY += 1;
            break;
            case 15: // Right
                //console.log("Right")
                oldX += 1;
            break;
            case 12: // Up
                //console.log("Up")
                oldY -= 1
            break;
            case 14: // Left
                //console.log("Left")
                oldX -= 1
            break;

            // Bumper / Trigger
            case 5: // RB
                //console.log("RB")
            break;

            case 4: // LB
                //console.log("LB")
            break;

            case 7: // RT
                //console.log("RT")
            break;

            case 6: // LT
                //console.log("LT")
            break;

            // Other
            case 8: // Select
                //console.log("Select")
                oldX = this.defaultX
                oldY = this.defaultY
            break;

            case 9: // Start
                //console.log("Start")
            break;

            default:
                console.log(key)

            }
        } else if (type == "xinput" && inputType == "stick") {
            
        }

        
        
        document.styleSheets[0]["rules"][3]["style"]["background-position-x"] = numToPX(oldX)
        document.styleSheets[0]["rules"][3]["style"]["background-position-y"] = numToPX(oldY)

    }
}

class Baguette {
    constructor() {
        console.log("baguette");

        this.image = "baguette.png"
    }
}

function numToPX(num) {
    return num += "px"
}