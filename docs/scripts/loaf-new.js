class Loaf {
    constructor(controller) {
        this.controller = controller;
        this.image = "loafturtle.jpg";
        this.pos = {
            'x': 10,
            'y': 10,
            'ox': 10,
            'oy': 10
        }
        this.size = {
            'height': 20,
            'width': 20,
            'oHeight': 20,
            'oWidth': 20
        }
        this.image = document.createElement('img')
    }

    createLoaf() {
        this.image.src = "/Images/" + this.image;
        this.image.width = "" + this.size['width'];
        this.image.height = "" + this.size['height'];
        this.image.style.position = "20px 20px";
    }

    destroyLoaf() {

    }
}