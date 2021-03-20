window.onload = startup

window.addEventListener('DOMContentLoaded', () => {
    let userPrefersDark;

    if (localStorage.getItem("dark") == null) {
        userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
        if (!userPrefersDark) {
            localStorage.setItem("dark", false);
        } else {
            localStorage.setItem("dark", true);
        }
    } else {
        if (localStorage.getItem("dark") == "true") {
            userPrefersDark = true;
        } else {
            userPrefersDark = false;
        }
    }

    addThemeButton();
});

function startup() {
    if (localStorage.getItem("dark") == "true") {
        darkmode(true)
    } else {
        darkmode(false)
    }

    document.body.classList.add('notransition');
  
    document.getElementById('theme').addEventListener('click', () => {
        darkmode();
    });

    feather.replace();
}

function darkmode(darkmode) {   // Change the site to dark mode or not. you can define a true (dark mode) of false (white mode), if not the it will just change color.
    prefersDark = (localStorage.getItem("dark") == "true");
  
    codeStyleElement = document.getElementById("codeStyle");
    codeStyleHref = "../../scripts/highlight/styles/";
    codeStyle = {
        "dark": "atom-one-dark",
        "light": "atom-one-light"
    }
  
    // Change dark mode to the opisit of the stored color, so the color is changed
    if (darkmode == null)
        darkmode = !prefersDark;
  
    if (darkmode) {
    // Dark
    localStorage.setItem("dark", true)
    if (codeStyleElement != null)
        codeStyleElement.href = codeStyleHref + codeStyle["dark"] + ".css";
        document.getElementById('theme').classList.remove('c-toggle--active');
        document.documentElement.classList.remove('theme--light');
    } else {
    // Light
        localStorage.setItem("dark", false)
        if (codeStyleElement != null)
            codeStyleElement.href = codeStyleHref + codeStyle["light"] + ".css";
        document.getElementById('theme').classList.add('c-toggle--active');
        document.documentElement.classList.add('theme--light');
    }
};

function addThemeButton() {
    let body = document.getElementsByTagName("body")[0];
    let el = document.createElement("div");
    el.className = "c-toggle";
    el.id = "theme";
    el.innerHTML = '<div class="c-toggle__body"><i class="c-toggle__icon" data-feather="moon"></i><i class="c-toggle__icon" data-feather="sun"></i></div>';
    
    body.insertBefore(el, body.firstChild);
}