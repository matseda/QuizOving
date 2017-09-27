/**
 * Created by medavidsen on 21.09.2017.
 */
var dato;
var nySide;
var startet=false;
var spillerRegistrert=false;
$(document).ready(function() {


    //Hva som skjer når man prøver å registrere Kallenavn
    $("#regSpiller").click(function (e) {
        e.preventDefault();
        if(!startet){
            if(sjekkInput()){
                $.ajax({
                type: "POST",
                url: "rest/quizService/addSpiller/" + skaffId(),
                data: dataJSON(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    nySide = fiksURL(skaffId(), result);
                    regSpiller.disabled=true;
                    spillerRegistrert=true;
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            })
            }
            else{
                alert("Fyll inn navn");
            }
        }
        else{
            alert("Kan ikke registrere spiller, quizen har begynt");
        }
    });

    //Sjekker om input feltene er tomme
    function sjekkInput(){
        var navn = document.getElementById("navnInput").value;
        return !(navn=='');
    }

    //Koden som følger henter ut startid(dato) for så å sjekke hvor lenge det er igjen
    var countDownDate;
    $.getJSON("rest/quizService/getQuiz/"+skaffId(), function (data) {
        dato = new Date(data.startTid);
        console.log(dato);
        countDownDate = dato.getTime();
    });

    var x = setInterval(function() {

        var naaTid = new Date().getTime();

        var tidIgjen = countDownDate - naaTid;

        var dager = Math.floor(tidIgjen / (1000 * 60 * 60 * 24));
        var timer = Math.floor((tidIgjen % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutter = Math.floor((tidIgjen % (1000 * 60 * 60)) / (1000 * 60));
        var sekunder = Math.floor((tidIgjen % (1000 * 60)) / 1000);
        document.getElementById("nedtelling").innerHTML = dager + "d " + timer + "t "
            + minutter + "m " + sekunder + "s ";

        var tolleranse=1001;

        //Hva som skjer hvis brukeren er inne og registrert på siden mens quizen starter
        if (tidIgjen <=tolleranse && tidIgjen>0) {
            clearInterval(x);
            startet=true;
            if(spillerRegistrert){
                location.href = nySide;
            }
            else{
                document.getElementById("nedtelling").innerHTML = "Quizen har allerede startet, ikke mulig å spille";
            }
        }
        else if(tidIgjen <0){
            clearInterval(x);
            startet=true;
            document.getElementById("nedtelling").innerHTML = "Quizen har allerede startet, ikke mulig å spille";
        }
    }, 1000);

    //Gjør klart dataen JSON skal sende inn
    function dataJSON(){
        return JSON.stringify(
            {
                navn: $("#navnInput").val()
            });
    }

    //Finner id til quizen utifra url
    function skaffId(){
        var tabell = location.href.split("?");
        return tabell[tabell.length-1];
    }

    //Gjør klar url til neste side så denne tar med to parametere
    function fiksURL(param1, param2){
        url = 'Spill.html?'+ param1 + '?'+param2;
        return url;
    }

    //Henter ut scoreboard, dette skjer hvert sekund og dermed får vi et live scoreboard
    function scoreboard(){
        $.getJSON("rest/quizService/finnScoreboard/"+skaffId(), function (data) {
            while(Spillere.rows.length > 0) {
                Spillere.deleteRow(0);
            }
            data.sort(sorterScore);
            var cell = "<tr>" + "<td> Spillernavn </td>" + "<td> Poeng </td>" + "</tr>";
            $('#Spillere').append(cell);
            for(var i=0;i <data.length;i++){
                cell = "<tr>" + "<td>" + data[i].navn+ "</td>" + "<td>" + data[i].poeng + "</td>" + "</tr>";
                $('#Spillere').append(cell);
            }

        });
    }
    setInterval(scoreboard,1000);

    //Brukes til å sortere scoreboard så vi får den med mest poeng øverst
    function sorterScore(a,b){
        return (b.poeng-a.poeng);
    }
});