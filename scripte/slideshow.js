let indikatoren = document.getElementsByClassName("indikator");
indikatoren[0].classList.add("aktiv");

let slides = document.getElementsByClassName("slide");
slides[0].classList.add("aktiv");

let aktuellerIndex = 0;
let letzteAktualisierung = new Date();

function umschalten(anzahl){
    let neuerIndex = aktuellerIndex + anzahl;

    if(neuerIndex < 0){
        neuerIndex = slides.length -1;
    }

    if(neuerIndex > slides.length -1){
        neuerIndex = 0;
    }

    springeZuEintrag(neuerIndex);
}

function springeZuEintrag(neuerIndex){
    indikatoren[aktuellerIndex].classList.remove("aktiv");
    slides[aktuellerIndex].classList.remove("aktiv");

    indikatoren[neuerIndex].classList.add("aktiv");
    slides[neuerIndex].classList.add("aktiv");

    aktuellerIndex = neuerIndex;
    letzteAktualisierung = new Date();
}

function automatischWeiterschalten(){
    let vergangeneZeit = new Date() - letzteAktualisierung;

    if(vergangeneZeit >= 5000){
        umschalten(1);
    }
}

setInterval(automatischWeiterschalten, 500);