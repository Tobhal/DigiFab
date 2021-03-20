window.onload = startup;

hideData = {}

function startup() {
    console.log("collaps element loaded")

    let h2Elements = document.getElementsByTagName("h2");
    let sections = document.getElementsByTagName("section");
    let articleNav = document.getElementsByTagName("nav")[1];

    let i = 0;
    for (el of h2Elements) {
        if (el["id"] == "" || el["id"].includes("noCollaps")) {
            i++;
            continue;
        }
        
        let id = el["id"];
        sections[i].className += id;

        // Create hide dots for all elements that should be hidden
        let hideDots = createDots(id);
        el.parentNode.insertBefore(hideDots, el.nextSibling);

        // Add mouse pointer to element
        el.style.cursor = "pointer";
        
        // Add event lisner to that element so it can collaps
        hideData[id] = i;      
        el.addEventListener("click", () => {
            dataHide(id);
        })
        
        // Add id to article nav
        if (articleNav != null) { 
            addToNav(articleNav, id, el["innerText"]);
        }

        i++;
    }
}

function dataHide(elID) {
    let section = document.getElementsByTagName("section")[hideData[elID]];
    let hideDots = document.getElementById(elID + "_Collaps");
    
    if (section.style.display != "none") {
        section.style.display = "none";
        hideDots.style.display = "";
    } else {
        section.style.display = "";
        hideDots.style.display = "none";
    }
}

function createDots(elID) {
    let hideDots = document.createElement("p");

    hideDots.innerHTML = "[...]";
    hideDots.id = elID + "_Collaps";
    hideDots.style.display = "none";

    return hideDots;
}

function addToNav(articleNav, elID , name) {
    let navID = document.createElement("a");
    navID.href = "#" + elID;
    navID.innerHTML = name;

    articleNav.appendChild(navID)
}
