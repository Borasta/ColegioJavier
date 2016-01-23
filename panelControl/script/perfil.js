var mostrarPerfil = function( data ) {
    if( data.tipo == "estudiante" ) {
        var estudiante = document.querySelector("#perfil .estudiante");

        var arrEst = data.estudiante;

        var length = Object.keys(data).length - 1; // - 1 Por el atributo "val"

        for( var atr in arrEst ) {
            var valor = arrEst[atr];
            if( atr == "edad" ) {
                valor = valor.split("-");
                valor = dateToEdad( valor[0], valor[1], valor[2] )
            }
            var li = estudiante.querySelector("." + atr);
            li.innerHTML += valor;
        }

        var representante = document.querySelector("#perfil .representante");

        var ul = representante.querySelector("ul").cloneNode(true);

        var arrRep = data.representantes;

        var length = arrRep.length;

        for( var i = 0; i < length; i++ ) {
            var elemento;
            if( i === 0 )
                elemento = representante.querySelector("ul");
            else {
                elemento = ul.cloneNode(true);
                representante.appendChild(elemento);
            }

            var arreglo = arrRep[i];

            for( var atr in arreglo ) {
                var li = elemento.querySelector("." + atr);
                li.innerHTML += arreglo[atr];
            }
        }
    }
    else if( data.tipo == "docente" ) {
        var docente = document.querySelector("#perfil .docente");

        for( var atr in data ) {
            if( atr != "tipo" && atr != "val") {
                var valor = data[atr];
                var li = docente.querySelector("." + atr);
                li.innerHTML += valor;
            }
        }
    }
};

var dateToEdad = function( _ano, _mes, _dia ){
    var dia = _dia;
    var mes = _mes;
    var ano = _ano;

    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth();
    var ahora_dia = fecha_hoy.getDate();
    var edad = (ahora_ano + 1900) - ano;

    if ( ahora_mes < (mes - 1)){
        edad--;
    }
    if (((mes - 1) == ahora_mes) && (ahora_dia < dia)){
        edad--;
    }
    if (edad > 1900){
        edad -= 1900;
    }
    return edad;
};

window.addEventListener("load", function() {
    var perfilMostradas = false;
    $("#perfilBtn").click( function() {

        if( window.innerWidth <= 768 )
            $("#wrapper-button").click();

        $(".menu").css("display", "none");

        $("#menuPerfil").css("display", "block");
        if( !perfilMostradas ) {
            sessionStatus( "../server/Views/verPerfil.php", mostrarPerfil, function() { console.log(); } );
            perfilMostradas = true;
        }
    });
});