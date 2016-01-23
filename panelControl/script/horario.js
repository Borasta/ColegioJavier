var mostrarHorario = function( data ) {
    var table = document.getElementById("horario");

    var trProto = table.getElementsByClassName("semana")[0].cloneNode(true);

    for( var dia in data ) {
        if( typeof data[dia] == "object" ) {
            var thisDia = data[dia];

            for( var materias in thisDia ) {
                var trs = table.getElementsByTagName("tr");

                // Si faltan tr los creamos
                if( trs.length - 1 < thisDia.length ) {
                    var faltantes =  thisDia.length - (trs.length - 1);

                    for( var i = 0; i < faltantes; i++ ) {
                        var tr = trProto.cloneNode(true);
                        table.querySelector("tbody").appendChild(tr);
                    }
                }

                var ul = materiaToList( thisDia[materias] );
                trs[ Number( materias ) + 1].querySelector("." + thisDia[materias].dia).appendChild(ul);
            }
        }
    }
};

var materiaToList = function( json ) {
    var ul = document.createElement("ul");
    var li = [];
    for( var i = 0; i < 4; i++ ) {
        li[i] = document.createElement("li");
        ul.appendChild(li[i]);
    }

    li[0].innerHTML = "Materia: " + json.nombre_m;
    li[1].innerHTML = "Inicio: " + json.hora_inicio;
    li[2].innerHTML = "Final: " + json.hora_final;
    li[3].innerHTML = "Profesor: " + json.nombres_d;

    return ul;
};

window.addEventListener("load", function() {
    var horarioMostrado = false;
    $("#horarioBtn").click( function() {

        if( window.innerWidth <= 768 )
            $("#wrapper-button").click();

        $(".menu").css("display", "none");
        $("#menuHorario").css("display", "block");

        if( !horarioMostrado ) {
            sessionStatus( "../server/Views/verHorario.php", mostrarHorario, function() {} );
            horarioMostrado = true;
        }
    });
});
