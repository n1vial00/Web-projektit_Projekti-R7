/**
 * Tekijä: Aleksi Viitanen
 */

let tarkistusLuku = 0;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Tämä funktio lisää sattumanvaraisen numeron laskuihin
function vaihdaMatikka() {
    let allNumbers = document.querySelectorAll(".changingNR");

    for(i = 0; i < allNumbers.length; i++) {
        let randomNumber = getRndInteger(vaihteluMin,vaihteluMax);
        allNumbers[i].textContent = randomNumber;
    }
}

/**
 * Funktio tarkistaa ettei minimi- ylitä maksimilukua.
 * 
 * @param {Number} index Viittaa .vaihtelut luokan alaisiin elementteihin.
 */

function asetusLogiikka(index) {
    let vaihtelut = document.querySelectorAll(".vaihtelut");
    switch(index) {
        case 0:
        case 2:
            vaihtelut[index+1].value = vaihtelut[index].value;
            break;
        case 1: 
        case 3:
            vaihtelut[index-1].value = vaihtelut[index].value;
            break;
    }

    if(Number(vaihtelut[0].value) > Number(vaihtelut[2].value)) {
        vaihtelut[3].value = vaihtelut[0].value;
        vaihtelut[2].value = vaihtelut[0].value;
        asetusLogiikka(index);
    }

}


/**
 * Funktio luo kaikki laskut asetusten mukaisesti
 */
function matikkaToteutus() {

    let kaikkiLaskut = new Array;
    let laskuM = document.querySelector("#laskuM");
    let lukujenM = document.querySelector("#lukujenM");
    let vaihteluMin = Number(document.querySelector("#vaihteluMin").value);
    let vaihteluMax = Number(document.querySelector("#vaihteluMax").value);
    let plus = document.querySelector("#plusBox").checked;
    let miinus = document.querySelector("#miinusBox").checked;
    let kerto = document.querySelector("#kertoBox").checked;
    let jako = document.querySelector("#jakoBox").checked;
    let nega = document.querySelector("#negaBox").checked;
    let vMerkit = [];
    let maxPisteet = 0;

    document.querySelector("#laskut").textContent = "";

    // Tarkistetaan onko lukujen määrä enemmän kuin 2 ja laskujen määrä enemmän kuin 1
    if(lukujenM < 2) {
        lukujenM = 2;
    }
    if(laskuM < 1) {
        laskuM = 1
    }

    // Lisätään välimerkit (vMerkit) taulukkoon, joiden checkbox on rastitettu
    if(plus) {
        vMerkit.push("+");
    }
    if(miinus) {
        vMerkit.push("-");
    }
    if(kerto) {
        vMerkit.push("*");
    }
    if(jako) {
        vMerkit.push("/");
    }
    /**
     * Looppi tekee niin monta laskua, kuin asetuksissa on toivottu (oletus 5) 
     * laskunPituus on sattumanvarainen luku 2:n ja käyttäjän määrittämän luvun välillä. Oletus on 3, minimi 2 ja maximi 10.
     * Laskuun lisätään ensimmäinen luku erikseen, koska alempi looppi lisää aina välimerkin eteen
     */
    
    for(i = 0; i < laskuM.value; i++) {
        let laskunPituus = Number(getRndInteger(1, lukujenM.value -1));
        let lukuJono = Number(getRndInteger(vaihteluMin, vaihteluMax));
        for(j = 0; j < laskunPituus; j++) {
            lukuJono += " " + vMerkit[getRndInteger(0, vMerkit.length - 1)] + " " + getRndInteger(vaihteluMin, vaihteluMax);
        }
        if(nega || eval(lukuJono) > 0) {
        kaikkiLaskut.push(lukuJono);
        maxPisteet++;
        } else {
            i--;
        }
    }
    let row = document.createElement("div");
    row.classList.add("row");

    // Tämä looppi rakentaa laskut sivulle ja antaa niille oikeat luokat
    for(l = 0; l < kaikkiLaskut.length; l++) {
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");
        let span = document.createElement("span");
        let span2 = document.createElement("span");
        let yhtkMerkki = document.createElement("span");
        let numInput = document.createElement("input");
        
        div3.classList.add("col-md-4", "col-lg-3", "col-sm-6", "border")
        span.classList.add("luotuLasku");
        span2.classList.add("oikeaVastaus", "tyhj");
        numInput.classList.add("vastaus");
        numInput.type="number";

        span.textContent = kaikkiLaskut[l];
        span2.textContent = "Hups mitäs kurkit sieltä O_O";
        yhtkMerkki.textContent = " = ";

        div.append(span, yhtkMerkki, numInput);
        div2.append(span2);

        div3.append(div, div2);
        
        row.append(div3);

        
    }
    document.querySelector("#laskut").append(row);
    
    document.querySelector("#maxPisteet").textContent = maxPisteet;
    
    tarkistusLuku = 0;
    document.querySelector("#pisteet").textContent = 0;
}


// Funktio muuttaa laskut tekstistä koodiksi ja tarkistaa niiden oikean vastauksen. Funktio sitten tarkistaa onko käyttäjä saanut saman tuloksen.
function tarkistaLaskut() {
    let kaikkiLaskut = document.querySelectorAll("span.luotuLasku");
    let tarkistuskohta = document.querySelectorAll("span.oikeaVastaus");
    let vastaajanVastaukset = document.querySelectorAll("input.vastaus");
    let pisteet = 0;


    if(tarkistusLuku == 1) {
        return alert("Tehtävät on jo tarkistettu. Tee uusia laskuja painamalla 'Tee laskuja' -painiketta");
    }

    for(i = 0; i < kaikkiLaskut.length; i++) {
        let tulos = eval(kaikkiLaskut[i].textContent);
        if(tulos % 1 !== 0) {
            tulos = Number(tulos).toFixed(2);
        }
        if(vastaajanVastaukset[i].value === ""){
            tarkistuskohta[i].textContent = " Et vastannut! Oikea vastaus on " + tulos;
            tarkistuskohta[i].classList.add("virhe");
        } else if(Number(vastaajanVastaukset[i].value) == tulos) {
            tarkistuskohta[i].textContent = " Oikein! ";
            tarkistuskohta[i].classList.add("oikeinVastattu");
            pisteet++;
        } else {
            tarkistuskohta[i].textContent = " Väärin! Oikea vastaus on " + tulos;
            tarkistuskohta[i].classList.add("virhe");
        }
    }

    document.querySelector("#pisteet").textContent = pisteet;
    tarkistusLuku = 1;
}


// Funktio laajentaa näyttää asetusikkunan
function asetuksetToggle() {
    document.querySelector(".asetukset").classList.toggle("collapse")
}


// Lisään nappeihin funktiot
document.querySelector("#teeLaskut").addEventListener("click", matikkaToteutus);
document.querySelector("#tarkistaLaskutButton").addEventListener("click", tarkistaLaskut);
document.querySelector(".asetuksetToggle").addEventListener("click", asetuksetToggle);

document.querySelectorAll(".vaihtelut").forEach((e, i) => e.onchange = function() {asetusLogiikka(i)});

matikkaToteutus();

