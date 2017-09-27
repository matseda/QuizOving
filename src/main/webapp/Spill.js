/**
 * Created by medavidsen on 21.09.2017.
 */
var teller =0;
var riktig;
var tid;
var spm;
var valgt=-1;
var ferdig=false;

$(document).ready(function() {

    //Henter ut første spm med en gang vi kommer inn
    $.getJSON("rest/quizService/Oversikt/getSpm/"+skaffQuizId(), function (data) {
        spm = data;
        oppdaterSpm(spm);
    });

    //Brukes til å oppdatere spørsmålene med alternativer tid osv
    function oppdaterSpm(data){

        //Sjekker om brukeren fikk riktig på siste spm
        if(valgt==riktig){
            $.post("rest/quizService/addPoeng/"+skaffQuizId()+"/"+skaffSpillerId());
        }

        //Fjerner alle gamle spørsmålsalternativer
        var tabell = document.getElementById("Alternativer");
        while(tabell.rows.length > 0) {
            tabell.deleteRow(0);
        }

        //Sjekker om det er flere spørsmål
        if(teller<spm.length){

            var cell = "<tr>" + "<td class='alt'>" + data[teller].alt1 +"</td>" +"</tr>";
            $('#Alternativer').append(cell);
            var cell = "<tr>" + "<td class='alt'>" + data[teller].alt2 +"</td>" +"</tr>";
            $('#Alternativer').append(cell);
            var cell = "<tr>" + "<td class='alt'>" + data[teller].alt3 +"</td>" +"</tr>";
            $('#Alternativer').append(cell);
            var cell = "<tr>" + "<td class='alt'>" + data[teller].alt4 +"</td>" +"</tr>";
            $('#Alternativer').append(cell);
            spmTekst.innerText= data[teller].tekst;
            spmNr.innerText= "Spørsmål " + (teller+1);
            riktig = data[teller].riktig;
            tid = data[teller].tid;
            teller++;
            valgt=-1;
        }

        //Hva som skjer hvis det ikke er flere spørsmål
        else{
            ferdig=true;
            valgt=-1;
            location.href= "RegSpiller.html?"+skaffQuizId();
        }
    }

    //Sjekker hvor mye tid det er igjen av spørsmålet, kaller oppdaterSpm hvis tiden er ute
    var s = setInterval(function sjekkTid() {
        if (!ferdig) {
            if (tid == 0) {
                oppdaterSpm(spm);
            }
            tidIgjen.innerText = "Sekunder igjen: " + tid;
            tid = tid - 1;
        }
        else{
            clearInterval(s);
        }
    },1000);


    //Funksjon som oppdaterer scoreboard
    function scoreboard(){
        $.getJSON("rest/quizService/finnScoreboard/"+skaffQuizId(), function (data) {
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
    setInterval(scoreboard, 1000);

    //Brukes til å sortere scoreboard så vi får den med mest poeng øverst
    function sorterScore(a,b){
        return (b.poeng-a.poeng);
    }

    //Hva som skjer om vi klikker på et alternativ
    $('#Alternativer').on('click', 'tr', function () {
        if(valgt>0)
        {
            alert("Allerede svart")
        }
        else {
            valgt = $(this).index()+1;
            $(this).css("background-color", "slategray");
        }
    });


    //Finner id til quizen utifra url
    function skaffQuizId(){
        var tabell = location.href.split("?");
        return tabell[tabell.length-2];
    }

    //Finner id til spilleren utifra url
    function skaffSpillerId(){
        var tabell = location.href.split("?");
        return tabell[tabell.length-1];
    }
});
