import('./loaf.js');
import('./game.js');

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
  "task10"
];

window.addEventListener('DOMContentLoaded', () => {
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (localStorage.getItem("dark") == null) {
    localStorage.setItem("dark", "false");
  } else if (localStorage.getItem("dark") == "true") {
    document.body.style.backgroundColor == "rgba(28, 28, 30, 1)";
  };

  if (userPrefersDark) {
    localStorage.setItem("dark", "true")
  }

  // Hide the [...] on load
  for (element of hideDataThing) {
    document.getElementById(element + "Collaps").style.display = "none";
  }


});

function startup() {  
  if (localStorage.getItem("dark") == "true") {
    localStorage.setItem("dark", "true");
    document.documentElement.classList.toggle('theme--light');
    document.getElementById('theme').classList.toggle('c-toggle--active');
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

};

function hideData(data) {

  let element = document.getElementsByClassName(data)[0];
  let elementCollaps = data + "Collaps";

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
  if (darkmode == null) {   // checks if there is a defined true/false. If not then flip the color.
    localStorage.getItem("dark") == "true" ? localStorage.setItem("dark", "false") : localStorage.setItem("dark", "true");
    document.documentElement.classList.toggle('theme--light');
    document.getElementById('theme').classList.toggle('c-toggle--active');

  } else if (darkmode == true && localStorage.getItem("dark") == "false") {
    localStorage.setItem("dark", "true");
    document.documentElement.classList.toggle('theme--light');
    document.getElementById('theme').classList.toggle('c-toggle--active');

  } else if (darkmode == false && localStorage.getItem("dark") == "true") {
    localStorage.setItem("dark", "false");
    document.documentElement.classList.toggle('theme--light');
    document.getElementById('theme').classList.toggle('c-toggle--active');
  };
};