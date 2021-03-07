//import('./loaf.js');
//import('./game.js');

showLoaf = false;

window.onload = startup;

hideDataThing = [
  "about",
  "exam",
  "task1",
  "task2",
  "task3",
  "task4",
  "task5",
  "task6",
  "task7",
  "task8",
  "task9",
  "task10",

  "T1_fusion",
  "T1_incscape"
];

window.addEventListener('DOMContentLoaded', () => {
  let userPrefersDark

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

  // Hide the [...] on load
  for (element of hideDataThing) {
    if (document.getElementById(element) != null) {
      document.getElementById(element + "Collaps").style.display = "none";
    }
  }

});

function startup() {
  if (localStorage.getItem("dark") == "true") {
    darkmode(true)
  } else {
    darkmode(false)
  }
  
  document.body.classList.add('notransition');
  
  // Setts up the ability to hide a header
  document.addEventListener("click", (event) => {
    for (el of hideDataThing) {
      if (event.target.matches("#" + el)) {
        hideData(el);
      }
    }
  });

  document.getElementById('theme').addEventListener('click', () => {
    darkmode();
  });

  feather.replace();
  
  let element = document.getElementsByClassName("date")
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener("click", () => {
      changeDateInfo(element, i);
    });
    localStorage.setItem("date" + i, "true");
  };

  element = document.getElementsByClassName("course")
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener("click", () => {
      hideCourseElement(element, i)
    })
  }

  for (el of hideDataThing) {
    if ((el.includes("task") || el == "exam") && !(document.getElementById(element) != null)) {
      hideData(el);
    }
  }

  if (showLoaf) {
    document.styleSheets[0]["rules"][5]["style"]["background-size"] = "auto 65px";
  }
};

function hideData(data) {

  let element = document.getElementsByClassName(data)[0];
  let elementCollaps = data + "Collaps";

  if (element == undefined) {
    return null;
  }

  if (element.style.display != "none") {
    // Hide
    for (let i = 0; i < document.getElementsByClassName(data).length; i++) {
      document.getElementsByClassName(data)[i].style.display = "none"
    };
    document.getElementById(elementCollaps).style.display = "";
  } else {
    // Show
    for (let i = 0; i < document.getElementsByClassName(data).length; i++) {
      document.getElementsByClassName(data)[i].style.display = ""
    };
    document.getElementById(elementCollaps).style.display = "none";
  };
};

function hideCourseElement(element, index) {

  let tempElement = element[index].childNodes[1]

  tempElement.style.display = tempElement.style.display === 'block' ? 'none' : 'block';
}

function darkmode(darkmode) {   // Change the site to dark mode or not. you can define a true (dark mode) of false (white mode), if not the it will just change color.
  prefersDark = (localStorage.getItem("dark") == "true");

  codeStyleElement = document.getElementById("codeStyle");
  codeStyleHref = "file:///D:/Github/DigiFab/docs/scripts/highlight/styles/";
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
    codeStyleElement.href = codeStyleHref + codeStyle["dark"] + ".css";
    document.getElementById('theme').classList.remove('c-toggle--active');
    document.documentElement.classList.remove('theme--light');
  } else {
    // Light
    localStorage.setItem("dark", false)
    codeStyleElement.href = codeStyleHref + codeStyle["light"] + ".css";
    document.getElementById('theme').classList.add('c-toggle--active');
    document.documentElement.classList.add('theme--light');
  }
};