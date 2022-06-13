/* JS Datei zu entfernungsberechnungen.html*/

//console.log(document.title);
//document.body.style.backgroundColor = 'green';

/**
 * berechnet die Entfernung zwischen zwei in lat und lon übergebenen Punkten
 * @param {number} lat 
 * @param {number} lon 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns d Entfernung zwischen den beiden Punkten
 */
function berechneEntfernung(lat, lon, lat2, lon2) {
    const R = 6371e3; // Erdradius in Metern
    var b1 = lat * Math.PI / 180; // Breitengrad von der Eingabe in rad umrechnen
    var b2 = lat2 * Math.PI / 180; // Breitengrad der Haltestelle in rad umrechnen
    var diffB = (lat2 - lat) * Math.PI / 180; // Differenz der Breitengrade
    var diffL = (lon2 - lon) * Math.PI / 180; // Differenz der Längengrade

    // Entfernung mit mit Erdrundung verrechnen
    var a = Math.sin(diffB / 2) * Math.sin(diffB / 2) +
        Math.cos(b1) * Math.cos(b2) *
        Math.sin(diffL / 2) * Math.sin(diffL / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d;
    let multipliziere = (a, b) => a * b // Arrow-Function
    d = multipliziere(R, c); // finale Entfernung in Metern
    return d;
}

//------------------------- Aufgabe 1 (nicht bewerten) ---------------------------------------------------

const R = 6371e3; // Erdradius in Metern
const lat1 = point[1]; // Breitengrad vom Geo
const lon1 = point[0]; // Längengrad vom Geo

var entfernungen = []; // Array, in dem die Entfernungen gesammelt werden
var ergebnis = []; // Array, in dem die Städte mit den dazugehörigen Entfernungen gesammelt werden
var staedte = ["Köln", "Amsterdam", "Kassel", "Barcelona", "Tunis", "Kyoto", "Bucharest", "Graz", "Kairo", "Dublin", "Oslo"];


/* Mathematische Funktion zur Berechnung der Entfernung zwischen 'point' und 'cities'
nach https://www.movable-type.co.uk/scripts/latlong.html */

for (var i = 0; i < cities.length; i++) {

    var lat2 = cities[i][1]; // Breitengrad der Stadt
    var lon2 = cities[i][0]; // Längengrad der Stadt

    var d = berechneEntfernung(lat1, lon1, lat2, lon2); // finale Entfernung in Metern
    entfernungen.push(d);
}
/* Felder von Entfernungen und Städten zusammenfügen */

for (var i = 0; i < staedte.length; i++) {
    ergebnis.push(' ' + staedte[i] + ': ' + entfernungen[i] + ' Meter')
}



/* Funktion zum Sortieren des Feldes mit Bubblesort */

function bubblesort(feld) {
    for (var i = 0; i < feld.length; i++) { // über das Feld iterieren
        for (var j = 0; j < (feld.length - i - 1); j++) { // zweidimensionale Iteration
            if (feld[j] > feld[j + 1]) { // wenn die Entfernung größer als die Nachfolgende ist
                // vertausche die beiden Städte mit zugehörigen Entfernungen im Feld 'ergebnis'
                var temp = ergebnis[j];
                ergebnis[j] = ergebnis[j + 1];
                ergebnis[j + 1] = temp;

                // vertausche die beiden Entfernungen im Feld 'entfernungen'
                var temp = feld[j];
                feld[j] = feld[j + 1];
                feld[j + 1] = temp;
            }
        }
    }
}


// Ausgaben in der Console vor der Sortierung
//console.log("unsortierte Entfernungen:  " + entfernungen);
//console.log("unsortierte Städte:  " + ergebnis);

bubblesort(entfernungen); // Sortieren des Feldes

// Ausgaben in der Console nach der Sortierung
//console.log("sortierte Entfernungen:  " + entfernungen);
//console.log("sortierte Städte:  " + ergebnis);

document.getElementById("Entfernungen").innerHTML = ergebnis;

// ------------------------------------------------------------------------------------------------

// --------------------- Aufgabe 2 (nicht bewerten) -----------------------------------------------------

// DOM Manipulation
document.title = "Mein Entfernungsrechner zu den POI";
console.log(document.title);

// Die beiden meta Tags anfügen
var newMeta1 = document.createElement('meta');
newMeta1.name = "author";
newMeta1.content = "Erika Mustermann";
document.head.appendChild(newMeta1);
var newMeta2 = document.createElement('meta');
newMeta2.name = "description";
newMeta2.content = "This is my cool website";
document.head.appendChild(newMeta2);



var x = document.getElementById("demo");

/**
 * Returns the Geolocation of the browser
 * @returns {coordinates}
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

/**
 * shows the position of the browser 
 * @param {coordinates} position 
 */
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;

    // GeoJSON "Rahmenelement"
    let geojson = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": []
        },
        "id": "1f1c1e76-de1e-4bf5-b927-0a0bdb59a10e"
    }

    geojson.geometry.coordinates = [position.coords.longitude, position.coords.latitude]
    document.getElementById("textfeld").value = JSON.stringify(geojson);
}

/**
 * Returns the distances to the points of interest
 * @return {array[number]}
 */
element.addEventListener("click", function () {
    let eingabe = JSON.parse(document.getElementById("textfeld").value);
    var lat = eingabe.geometry.coordinates[1]; // Breitengrad der Eingabe
    var lon = eingabe.geometry.coordinates[0]; // Längengrad der Eingabe

    const R = 6371e3; // Erdradius in Metern
    var entfernungen2 = []; // Array, in dem die Entfernungen gesammelt werden

    for (var i = 0; i < poi.features.length; i++) {

        var lat2 = poi.features[i].geometry.coordinates[1]; // Breitengrad der poi
        var lon2 = poi.features[i].geometry.coordinates[0]; // Längengrad der poi

        d = berechneEntfernung(lat, lon, lat2, lon2); // finale Entfernung in Metern
        entfernungen2.push(d);
    }
    // console.log(entfernungen2);
    document.getElementById("Entfernungen2").innerHTML = "Entfernungen zu den POI in Metern: " + entfernungen2;
})

// ----------------------------------------------------------------------------------------------------


// ------------------------ Aufgabe 3 ------------------------------------------------------

/**
 * Klasse zur Modellierung einer Bushaltestelle
 */
class Bushaltestelle {

    /**
     * Konstruktor zum Erstellen einer Bushaltestelle
     * @class
     * @param {number} nummer Haltestellennummer
     * @param {string} name Haltestellenname
     * @param {string} richtung Haltestellenrichtung
     * @param {object} koordinaten Haltestellenkoordinaten
     * @property {number} koordinaten[0] Längengrad der Koordinaten
     * @property {number} koordinaten[1] Breitengrad der Koordinaten
     */
    constructor(nummer, name, richtung, koordinaten) {
        this.nummer = nummer;
        this.richtung = richtung;
        this.koordinaten = koordinaten;
    }

    /**
     * Auslesen der Nummer
     * @returns {number} nummer
     */
    getNummer() {
        return this.nummer;
    }

    /**
     * Auslesen des Namens
     * @returns {string} name
     */
    getName() {
        return this.name;
    }

    /**
     * Auslesen der Richtung
     * @returns {string} richtung
     */
    getRichtung() {
        return this.richtung;
    }

    /**
     * Auslesen der Koordinaten
     * @returns {object} koordinaten
     * @property {number} koordinaten[0] Längengrad der Koordinaten
     * @property {number} koordinaten[1] Breitengrad der Koordinaten
     */
    getKoordinaten() {
        return this.koordinaten;
    }

    /**
     * Funktion zur Berechnung der Entfernungen des Eingabestandorts zu der Haltestelle
     * @returns {number} entfernung
     * @param {object} koordinaten
     * @property {number} koordinaten[0] Längengrad der Koordinaten
     * @property {number} koordinaten[1] Breitengrad der Koordinaten
     */
    berechneEntfernungZuHaltestelle(koordinaten) {

        let eingabe = JSON.parse(document.getElementById("textfeld").value);
        var lat = eingabe.geometry.coordinates[1]; // Breitengrad der Eingabe
        var lon = eingabe.geometry.coordinates[0]; // Längengrad der Eingabe

        const R = 6371e3; // Erdradius in Metern

        var lat2 = koordinaten[1]; // Breitengrad der Haltestelle
        var lon2 = koordinaten[0]; // Längengrad der Haltestelle

        d = berechneEntfernung(lat, lon, lat2, lon2); // finale Entfernung in Metern

        return d;
    }
}

// Erstellen eines XHR-Objektes für die Anfrage der Bushaltestellen Muensters
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = "statechangecallback";
xhr.open("GET", "https://rest.busradar.conterra.de/prod/haltestellen", true);
xhr.send();
//console.log(xhr);

let res;
var haltestellenentfernungen = [];

/**
 * Callback Funktion zum Erstellen der Bushaltestellen-Objekte und der Berechnung der Entfernungen dorthin
 */
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        //console.log(this.responseText);
        res = JSON.parse(this.responseText);
        //console.log(res);

        res.features.forEach(element => {
            var h = new Bushaltestelle(element.properties.nr, element.properties.lbez, element.properties.richtung, element.geometry.coordinates);
            haltestellenentfernungen.push(h.berechneEntfernungZuHaltestelle(element.geometry.coordinates));
        })
    };
}

/**
 * Berechnung der Entfernung zur naechstgelegenen Bushaltestelle und Ausgabe 
 * deren Name, Richtung und Linien sowie Abfahrten in den naechsten 5 Minuten
 * @returns {string} name
 * @returns {string} richtung
 * @returns {object} linien
 * @returns {object} abfahrten
 */
element.addEventListener("click", function () {
    let eingabe = JSON.parse(document.getElementById("textfeld").value);
    var lat = eingabe.geometry.coordinates[1]; // Breitengrad der Eingabe
    var lon = eingabe.geometry.coordinates[0]; // Längengrad der Eingabe

    const R = 6371e3; // Erdradius in Metern
    var entfernungen3 = []; // Array, in dem die Entfernungen gesammelt werden
    var namen3 = []; // Array, in dem die zugehörigen Namen gesammelt werden
    var ergebnis2 = []; // Array, in dem die Namen mit den dazugehörigen Nummern und Entfernungen gesammelt werden
    var nummern = []; // Array, in denen die Haltestellennummern gesammelt werden
    var richtungen = []; // Array, in dem die Richtungen gesammelt werden

    for (var i = 0; i < res.features.length; i++) {

        var lat2 = res.features[i].geometry.coordinates[1]; // Breitengrad der 
        var lon2 = res.features[i].geometry.coordinates[0]; // Längengrad der 

        d = berechneEntfernung(lat, lon, lat2, lon2); // finale Entfernung in Metern

        // Felder von Entfernungen, Nummern, Namen und Richtungen füllen
        entfernungen3.push(d);
        nummern.push(res.features[i].properties.nr);
        namen3.push(res.features[i].properties.lbez);
        richtungen.push(res.features[i].properties.richtung);
    }

    // console.log(richtungen);

    /* Felder von Entfernungen, Richtungen und Namen zusammenfügen */
    for (var i = 0; i < entfernungen3.length; i++) {
        ergebnis2.push(' ' + namen3[i] + ' ' + richtungen[i] + ': ' + entfernungen3[i] + ' Meter')
    }

    //console.log(ergebnis2);

    /**  
     * Funktion zum Sortieren des Feldes mit Bubblesort
     * @param {array} feld zu sortierendes Feld
     * @returns {array} sortiertes Feld
     */
    function bubblesort2(feld) {
        for (var i = 0; i < feld.length; i++) { // über das Feld iterieren
            for (var j = 0; j < (feld.length - i - 1); j++) { // zweidimensionale Iteration
                if (feld[j] > feld[j + 1]) { // wenn die Entfernung größer als die Nachfolgende ist
                    // vertausche die beiden Städte mit zugehörigen Entfernungen im Feld 'ergebnis'
                    var temp = ergebnis2[j];
                    ergebnis2[j] = ergebnis2[j + 1];
                    ergebnis2[j + 1] = temp;

                    // vertausche die beiden Entfernungen im Feld 'entfernungen'
                    var temp = feld[j];
                    feld[j] = feld[j + 1];
                    feld[j + 1] = temp;

                    // vertausche die beiden Entfernungen im Feld 'nummern'
                    var temp = nummern[j];
                    nummern[j] = nummern[j + 1];
                    nummern[j + 1] = temp;

                    // vertausche die beiden Entfernungen im Feld 'namen3'
                    var temp = namen3[j];
                    namen3[j] = namen3[j + 1];
                    namen3[j + 1] = temp;
                }
            }
        }
    }

    bubblesort2(entfernungen3);

    var naechste = nummern[0];
    // console.log(nummern);
    // console.log(ergebnis2);

    var haltestellenAusgabe = [];
    for (i = 0; i < 10; i++) {
        haltestellenAusgabe.push(ergebnis2[i]);
    }

    // Entfernungen zu den Haltestellen ausgeben
    document.getElementById("Entfernungen3").innerHTML = "Entfernungen zu den Bushaltestellen in Metern: " + haltestellenAusgabe;
    //alert("geschafft");

    // Erstellen eines XHR-Objektes für die Anfrage der Abfahrten einer angegebenen Bushaltestelle Muensters
    var anfrage = "https://rest.busradar.conterra.de/prod/haltestellen/" + naechste + "/abfahrten?sekunden=300"
    var x = new XMLHttpRequest()
    x.onreadystatechange = "statechangecallback";
    x.open("GET", anfrage, true);
    x.send();

    // Variablendeklarationen
    let res2;
    let naechsteNummer = nummern[0];
    let linien = [];
    let abfahrten = [];
    let naechsteName = namen3[0];
    let naechsteRichtung = richtungen[0];

    /**
     * Funktion zur Umrechnung eines Timestamps in ein Datum
     * @param {number} UNIX_timestamp Timestamp
     * @returns {date} Datum
     */
    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    /**
     * Callback Funktion zur Anfrage und Ausgabe der Abfahrten der naechsten Haltestelle
     */
    x.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            res2 = JSON.parse(this.responseText);

            //console.log(res2);

            res2.forEach(element => {
                linien.push(element.linienid);
                abfahrtszeitDate = timeConverter(element.abfahrtszeit);
                abfahrten.push(abfahrtszeitDate);
            })

            var ergebnis3 = []; //Feld in dem die Linien mit Abfahrten gesammelt werden
            /* Felder von Linien und Abfahrten zusammenfügen */
            for (var i = 0; i < linien.length; i++) {
                ergebnis3.push(' ' + "Linie " + linien[i] + ': ' + "Abfahrt " + abfahrten[i])
            }

            //Ueberpruefungen in der Console
            //console.log(naechsteNummer);
            //console.log(linien);
            //console.log(abfahrten);

            // Ausgaben der naechsten Haltestelle und deren Abfahrten
            document.getElementById("naechsteHaltestelle").innerHTML = "Nächste Bushaltestelle: " + naechsteName + ' ' + naechsteRichtung;
            document.getElementById("naechsteLinien").innerHTML = "Abfahrende Busse in den nächsten 5 Minuten: " + ergebnis3;
        };
    }
})



// ------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------- Aufgabe 4 -----------------------------------------------------------------

// Leaflet initialisieren
var map = L.map('map', { drawControl: true }).setView([51.975, 7.61], 13);
// OpenStreetMap tile layer hinzufügen
var osmLayer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' });
osmLayer.addTo(map);

// Leaflet.draw hinzufügen
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

// Haltestellen Icon definieren
var haltestelleIcon = L.icon({
    iconUrl: 'haltestelle.png',
    iconSize: [20, 20], // size of the icon
});

var haltestellen = []; // Feld in dem alle Haltestellen gespeichert werden
var markers = []; // Feld in dem alle Marker der Haltestellen gespeichert werden

element.addEventListener("click", function () {

    ladeHaltestellen();

    /**
     * Funktion zu Anzeigen der übergebenen Haltestellen auf der Karte inklusive Popups
     * für die Popups wird die Entfernung zu der Haltestelle berechnet
     * @param {array} haltestellen 
     */
     function haltestellenAnzeigen(haltestellen) {
        //console.log(haltestellen);
        let eingabe = JSON.parse(document.getElementById("textfeld").value);
        var lat = eingabe.geometry.coordinates[1]; // Breitengrad der Eingabe
        var lon = eingabe.geometry.coordinates[0]; // Längengrad der Eingabe
        koords = [lat, lon];
        L.marker(koords).bindPopup("Nutzerstandort").addTo(map);
    
        haltestellen.features.forEach(element => {
            lat2 = element.geometry.coordinates[1];
            lon2 = element.geometry.coordinates[0];
            koords = [lat2, lon2];
            this.haltestellen.push(koords);
            entf = berechneEntfernung(lat, lon, lat2, lon2);   
        
    
    
            // Haltestellen zur Karte hinzufügen
            var marker = new L.marker(koords, { icon: haltestelleIcon }).bindPopup(element.properties.lbez + ' ' + element.properties.richtung + ': ' + entf + ' Meter');
            markers.push(marker);
            map.addLayer(marker);
        })
        // console.log(this.haltestellen);
        //console.log(markers);
    
    }

    // gezeichnetes Polygon initialisieren
    map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
        drawnItems.addLayer(layer);
        updateText();
    });
    map.on("draw:edited", function (event) {
        updateText();
    });

    var gezeichnetesPolygon = [];
    /**
    * generiert ein GeoJSON aus dem gezeichneten Polygon und speichert die Koordinaten in einem Array
    * und extrahiert nach dem Zeichnen die im Polygon enthaltenen Haltestellen
    */
    function updateText() {

        // to convert L.featureGroup to GeoJSON FeatureCollection
        document.getElementById("geojsontextarea").value = JSON.stringify(drawnItems.toGeoJSON());
        //console.log(drawnItems.toGeoJSON());
        var gezeichnetesGeojson = drawnItems.toGeoJSON();
        gezeichnetesGeojson.features.forEach(element1 => {
            element1.geometry.coordinates.forEach(element2 => {
                gezeichnetesPolygon.push(element2);
            })
        })
        //console.log(gezeichnetesPolygon);
        //console.log(this.haltestellen);
        extrahiereHaltestellen(this.haltestellen, gezeichnetesPolygon);
    }

    /**
     * Funktion zum Extrahieren der übergebenen Haltestellen
     * @param {array} gezeichnetesPolygon 
     * @param {array} haltestellen
     */
    function extrahiereHaltestellen(haltestellen, gezeichnetesPolygon) {
        var drin = []; // Array in dem für jede Haltestelle gespeichert werden soll, ob die Haltestelle im Polygon liegt
        // in ein turf.polygon umwandeln
        gezeichnetesPolygon = turf.polygon(gezeichnetesPolygon);
        //schauen, ob die Haltestellen drin liegen und die Ergebnisse in einem Array speichern
        for (var i = 0; i < haltestellen.length; i++) {
            lat2 = haltestellen[i][1];
            lon2 = haltestellen[i][0];
            var koords = turf.point([lat2, lon2]);
            x = turf.booleanPointInPolygon(koords, gezeichnetesPolygon);
            drin.push(x);
        }
        // Haltestellen ausserhalb entfernen
        for (var i = 0; i < drin.length; i++) {
            if (!drin[i]) {
                // console.log(drin[i]);
                map.removeLayer(markers[i]);
            }
        }
        //console.log(drin);
    }

    var bushalten;
    /**
     * Funktion um die Bushaltestellen aus der Conterra API mithilfe von fetch zu laden
     */
    function ladeHaltestellen() {
        fetch("https://rest.busradar.conterra.de/prod/haltestellen")
            .then(response => {
                resp = response.json() // return a Promise as a result
                //console.log(resp)
                resp.then(data => { // get the data in the promise result
                    //console.log(data)
                    resp = data;
                    bushalten = resp;
                    haltestellenAnzeigen(resp);
                })
            })
            .catch(error => console.log(error))
    }
})