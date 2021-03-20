//import('./loaf.js');
//import('./game.js');
//import('./loaf-new.js');

showLoaf = false;

window.onload = startup;

function startup() {
    let codeElements = document.getElementsByTagName("code");
    var i, j;
    for (i = 0, j = codeElements.length; i < j; i++) {
        hljs.highlightBlock(codeElements[i]);
    }
  
    if (showLoaf) {
        document.styleSheets[0]["rules"][5]["style"]["background-size"] = "auto 65px";
    }
};