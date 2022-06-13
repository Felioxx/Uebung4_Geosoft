/* JS Datei zu entfernungsberechnungen.html*/

console.log(document.title);


//------------------------- Aufgabe 1 (nicht bewerten) ---------------------------------------------------

const R = 6371e3; // Erdradius in Metern
const lat1 = point[1]; // Breitengrad vom Geo
const lon1 = point[0]; // Längengrad vom Geo

var entfernungen = []; // Array, in dem die Entfernungen gesammelt werden
var ergebnis = []; // Array, in dem die Städte mit den dazugehörigen Entfernungen gesammelt werden
var staedte = ["Köln", "Amsterdam", "Kassel", "Barcelona", "Tunis", "Kyoto", "Bucharest", "Graz", "Kairo", "Dublin", "Oslo"];


/* Mathematische Funktion zur Berechnung der Entfernung zwischen 'point' und 'cities'
nach https://www.movable-type.co.uk/scripts/latlong.html */

for(var i=0; i<cities.length; i++) {

    var lat2 = cities[i][1]; // Breitengrad der Stadt
    var lon2 = cities[i][0]; // Längengrad der Stadt

    var b1 = lat1 * Math.PI/180; // Breitengrad vom Geo in rad umrechnen
    var b2 = lat2 * Math.PI/180; // Breitengrad der Stadt in rad umrechnen
    var diffB = (lat2-lat1) * Math.PI/180; // Differenz der Breitengrade
    var diffL = (lon2-lon1) * Math.PI/180; // Differenz der Längengrade
    
    // Entfernung mit mit Erdrundung verrechnen
    var a = Math.sin(diffB/2) * Math.sin(diffB/2) +
              Math.cos(b1) * Math.cos(b2) *
              Math.sin(diffL/2) * Math.sin(diffL/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    var d = R * c; // finale Entfernung in Metern

    entfernungen.push(d);
}


/* Felder von Entfernungen und Städten zusammenfügen */

for (var i=0; i<staedte.length; i++) {
    ergebnis.push(' '+staedte[i]+': '+entfernungen[i]+' Meter')
}



/* Funktion zum Sortieren des Feldes mit Bubblesort */

function bubblesort(feld) { 
    for(var i=0; i<feld.length; i++) { // über das Feld iterieren
        for(var j=0; j<(feld.length-i-1); j++) { // zweidimensionale Iteration
            if(feld[j] > feld[j+1]) { // wenn die Entfernung größer als die Nachfolgende ist
                // vertausche die beiden Städte mit zugehörigen Entfernungen im Feld 'ergebnis'
                var temp = ergebnis[j];
                ergebnis[j] = ergebnis[j+1];
                ergebnis[j+1] = temp;

                // vertausche die beiden Entfernungen im Feld 'entfernungen'
                var temp = feld[j];
                feld[j] = feld[j+1];
                feld[j+1] = temp;
            }
        }
    }
}


// Ausgaben in der Console vor der Sortierung
console.log("unsortierte Entfernungen:  " + entfernungen);
console.log("unsortierte Städte:  " + ergebnis);

bubblesort(entfernungen); // Sortieren des Feldes

// Ausgaben in der Console nach der Sortierung
console.log("sortierte Entfernungen:  " + entfernungen);
console.log("sortierte Städte:  " + ergebnis);

// ------------------------------------------------------------------------------------------------




// --------------------- Aufgabe 2 (bewerten) -----------------------------------------------------

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
    x.innerHTML="Latitude: " + position.coords.latitude + 
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
element.addEventListener("click", function()
{
    let eingabe = JSON.parse(document.getElementById("textfeld").value);
    var lat = eingabe.geometry.coordinates[1]; // Breitengrad der Eingabe
    var lon = eingabe.geometry.coordinates[0]; // Längengrad der Eingabe

    const R = 6371e3; // Erdradius in Metern
    var entfernungen2 = []; // Array, in dem die Entfernungen gesammelt werden

    for(var i=0; i<poi.features.length; i++) {

    var lat2 = poi.features[i].geometry.coordinates[1]; // Breitengrad der poi
    var lon2 = poi.features[i].geometry.coordinates[0]; // Längengrad der poi

    var b1 = lat * Math.PI/180; // Breitengrad von der Eingabe in rad umrechnen
    var b2 = lat2 * Math.PI/180; // Breitengrad des poi in rad umrechnen
    var diffB = (lat2-lat) * Math.PI/180; // Differenz der Breitengrade
    var diffL = (lon2-lon) * Math.PI/180; // Differenz der Längengrade

    // Entfernung mit mit Erdrundung verrechnen
    var a = Math.sin(diffB/2) * Math.sin(diffB/2) +
            Math.cos(b1) * Math.cos(b2) *
            Math.sin(diffL/2) * Math.sin(diffL/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d;
    let multipliziere = (a, b) => a*b // Arrow-Function
    d = multipliziere(R, c); // finale Entfernung in Metern

    entfernungen2.push(d);
    }
    console.log(entfernungen2);
    document.getElementById("Entfernungen2").innerHTML = entfernungen2;
    alert ("geschafft");
})