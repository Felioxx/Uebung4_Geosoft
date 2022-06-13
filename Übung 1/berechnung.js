/* JS Datei zu entfernungsberechnungen.html*/

console.log(document.title);

const R = 6371e3; // Erdradius in Metern
const lat1 = point[1]; // Breitengrad vom Geo
const lon1 = point[0]; // Längengrad vom Geo

var entfernungen = []; // Array, in dem die Entfernungen gesammelt werden
var ergebnis = []; // Array, in dem die Städte mit den dazugehörigen Entfernungen gesammelt werden
var städte = ["Köln", "Amsterdam", "Kassel", "Barcelona", "Tunis", "Kyoto", "Bucharest", "Graz", "Kairo", "Dublin", "Oslo"];

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
for (var i=0; i<städte.length; i++) {
    ergebnis.push(' '+städte[i]+': '+entfernungen[i]+' Meter')
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