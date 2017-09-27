/**
 * Created by medavidsen on 21.09.2017.
 */


$(document).ready(function() {

    //Henter ut alle Quizer og viser disse i en tabell
    $.getJSON("rest/quizService/Oversikt/getOversikt", function (data) {
        var starttid1 = new Date;
            for(var i=0;i <data.length;i++){
                starttid1= new Date(data[i].startTid);
                var cell = "<tr>" + "<td class='alt'>" + "Quiz: "+ data[i].navn + ", starter: " + starttid1 +"</td>" +"</tr>";
                $('#tabell').append(cell);
            }
    });

    //Hva som skjer hvis vi trykker på et tabellelement
    $('#tabell').on('click', 'tr', function () {
        window.open(fiksURL($(this).index()), "_self");
    });
});

//Fikser url til neste side
function fiksURL(param){
    _url = 'RegSpiller.html?'+ param;
    return _url;
}
