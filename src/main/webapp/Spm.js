/**
 * Created by medavidsen on 21.09.2017.
 */
$(document).ready(function() {

    //Hva som skjer når vi trykker på registrer spørsmål
    $("#regSpm").click(function (e) {
        e.preventDefault();
        if(sjekkInput()){
            $.ajax({
                type: "POST",
                url: "rest/quizService/addSpm/"+skaffId(),
                data: dataJSON(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    toemInput();
                    alert("Spørsmål registrert");
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        }
        else{
            alert("Fyll ut alle feltene")
        }
    });

    //Gjør klar data som skal sendes inn
    function dataJSON() {
        return JSON.stringify(
            {
                tekst: $("#inputSpm").val(),
                alt1: $("#inputAlt1").val(),
                alt2: $("#inputAlt2").val(),
                alt3: $("#inputAlt3").val(),
                alt4: $("#inputAlt4").val(),
                riktig: $("#riktig").val(),
                tid: $("#inputTid").val()
            });
    }

    //Sjekker at inputen ikke er tom
    function sjekkInput(){
        var a = document.getElementById("inputSpm").value;
        var b = document.getElementById("inputAlt1").value;
        var c = document.getElementById("inputAlt2").value;
        var d = document.getElementById("inputAlt3").value;
        var e = document.getElementById("inputAlt4").value;
        var f = document.getElementById("riktig").value;
        var g = document.getElementById("inputTid").value;

        return !(a == '' || b == '' || c == '' || d == '' || e == '' || f == '' || g == '');
    }

    //Henter quiz id fra url
    function skaffId(){
        var tabell = location.href.split("?");
        return tabell[tabell.length-1];
    }

    //Tømmer input
    function toemInput(){
        document.getElementById("inputSpm").value = "";
        document.getElementById("inputAlt1").value = "";
        document.getElementById("inputAlt2").value = "";
        document.getElementById("inputAlt3").value = "";
        document.getElementById("inputAlt4").value = "";
        document.getElementById("riktig").value = "";
        document.getElementById("inputTid").value = "";
    }
});
