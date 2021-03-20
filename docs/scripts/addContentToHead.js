window.onload = startup;

window.addEventListener('DOMContentLoaded', () => {
    let scripts = [
        "collapsElement",
        "darkMode",
        "script",
        "loaf-new"
    ]

    let head = document.getElementsByTagName("head")[0];
    
    for (scirpt in scripts) {
        el = document.createElement("script");
        el.type = "text/javascript";
        el.onload = () => {
            startup()
        };
        el.src = "../../scripts/" + scripts[scirpt] + ".js";
        head.appendChild(el);
    }
});

function startup() {
    console.log("add content to head loaded")
}