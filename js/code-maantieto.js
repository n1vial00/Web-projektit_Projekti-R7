let images = [document.getElementById("Oulu"), document.getElementById("Turku"), document.getElementById("Helsinki"), document.getElementById("Joensuu"), document.getElementById("Tampere"), document.getElementById("palkinto")]
let score = 0

// Funktio tarkistaa oikean kuvan ja napin ja muutta oikean vastauksen taustavärin
function checkAnwser(image, button) {
    if(window.getComputedStyle(image).visibility === "visible") {
        button.classList.add("correct")
        score++
    }
    else {
        //button.classList.add("incorrect")
        alert("Väärä vastaus! Yritä uudelleen!")
        score--
    }
    document.getElementById("score").innerText = "Pisteet : " + score
}

// Funktio uudelle kartalle
function nextMap(map, next) {

    // If lause tarkistaa onko seuraava kartta näkyvissä ja jos ei ole looppaa kaikki kartat
    if (window.getComputedStyle(next).visibility === ("hidden")) {

        // Looppi muuttaa kartat näkyväksi niin kauan että next kartta tulee näkyviin
        for (i = 1; i < images.length; i++) {
            images[i].classList.remove("hidden")
            images[i].classList.add("visible")
            if(window.getComputedStyle(next).visibility === "visible") {

                // Loop joka varmistaa, että kaikki kuvat ovat piilossa ja pelkästään next jää näkyviin
                for(i = 0; i < images.length; i++) {
                    images[i].classList.remove("visible")
                    images[i].classList.add("hidden")
                    next.classList.remove("hidden")
                    next.classList.add("visible")
                }
                break;
            }
        }
    }
}

// Nappien onclick, mitkä ajavat edeltävät funktiot.
// Nappien if lause tarkistaa onko vastaus saatu oikein. Jos ei ole nextMap funktiota ei ajeta
// disableButton poistaa napin käytöstä
document.getElementById("OuluButton").onclick = function() { 
    checkAnwser(document.getElementById("Oulu"), document.getElementById("OuluButton"))
    if (document.getElementById("OuluButton").classList.contains("correct")) {
    nextMap(document.getElementById("Oulu"), document.getElementById("Turku"))
    disableButtons(document.getElementById("OuluButton"))
    }
}

document.getElementById("TurkuButton").onclick = function() { 
    checkAnwser(document.getElementById("Turku"), document.getElementById("TurkuButton"))
    if (document.getElementById("TurkuButton").classList.contains("correct")) {
    nextMap(document.getElementById("Turku"), document.getElementById("Helsinki"))
    disableButtons(document.getElementById("TurkuButton"))
    }
}

document.getElementById("HelsinkiButton").onclick = function() { 
    checkAnwser(document.getElementById("Helsinki"), document.getElementById("HelsinkiButton"))
    if (document.getElementById("HelsinkiButton").classList.contains("correct")) {
    nextMap(document.getElementById("Helsinki"), document.getElementById("Joensuu"))
    disableButtons(document.getElementById("HelsinkiButton"))
    }
}

document.getElementById("JoensuuButton").onclick = function() { 
    checkAnwser(document.getElementById("Joensuu"), document.getElementById("JoensuuButton"))
    if (document.getElementById("JoensuuButton").classList.contains("correct")) {
    nextMap(document.getElementById("Joensuu"), document.getElementById("Tampere"))
    disableButtons(document.getElementById("JoensuuButton"))
    }
}

document.getElementById("TampereButton").onclick = function() { 
    checkAnwser(document.getElementById("Tampere"), document.getElementById("TampereButton"))
    if (document.getElementById("TampereButton").classList.contains("correct")) {
    nextMap(document.getElementById("Tampere"), document.getElementById("palkinto"))
    disableButtons(document.getElementById("TampereButton"))
    document.getElementById("again").classList.add("visible")
    }
}

function disableButtons(button) {
    if (button.classList.contains("correct")) {
        button.disabled = true
    }
}