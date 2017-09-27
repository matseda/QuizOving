/**
 * Created by medavidsen on 21.09.2017.
 */
$(document).ready(function() {

    //Hva som skjer når vi trykker på registrer Quiz
    $("#regQuiz").click(function (e) {
        e.preventDefault();
        if(sjekkInput()){
            $.ajax({
                type: "POST",
                url: "rest/quizService/addQuiz",
                data: dataJSON(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success : function(result) {
                    location.href = fiksURL(result);
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        }
        else{
            alert("Fyll ut alle feltene");
        }

    });

    //Gjør klar dataen som skal sendes inn
    function dataJSON(){
        var json = JSON.stringify(
            {
                navn: $("#quizInput").val(),
                startTid: new Date($("#datoInput").val())
            });
        console.log(json);
        return json;
    }

    //Fikser url til neste side
    function fiksURL(param){
        _url = 'LagSpm.html?'+ param;
        return _url;
    }

    //Sjekker at ingen av input feltene er tomme
    function sjekkInput(){
        var a=document.getElementById("quizInput").value;
        var b=document.getElementById("datoInput").value;

        return !(a=='' || b=='');
    }
});