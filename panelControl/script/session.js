var Ajax = function() {
    var ajax;
    if (window.XMLHttpRequest)
    {
        //El explorador implementa la interfaz de forma nativa
        ajax = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        //El explorador permite crear objetos ActiveX
        try {
            ajax = new ActiveXObject("MSXML2.XMLHTTP");
        } catch (e) {
            try {
                ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                ajax = null;
            }
        }
    }
    if (!ajax)
    {
        alert("No ha sido posible crear una instancia de XMLHttpRequest");
    }
    return ajax;
};

var sessionCreate = function() {
    var ajax = new Ajax();

    var user = document.querySelector("#usuario");
    var pass = document.querySelector("#contrasenia");
    var tipo = document.querySelector("#tipo");

    var json = {
        user: user.value,
        pass: pass.value,
        tipo: tipo.value
    };

    ajax.open("POST", "/server/Views/sessionCreation.php");
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send("json=" + encodeURI( JSON.stringify( json ) ));

    // Respuesta
    ajax.addEventListener("load", function () {
        var conectado = document.querySelector(".conectado");
        var desconectado = document.querySelector(".desconectado");
        var nombres = document.querySelector(".nombresPersona");
        var apellidos = document.querySelector(".apellidosPersona");
        var resp = JSON.parse(ajax.responseText);

        user.value = "";
        pass.value = "";
        tipo.value = "";

        if (resp.val) {
            direcciones( resp );
            $("#close").click();
            desconectado.style.display = "none";

            conectado.style.display = "block";
            nombres.innerHTML = resp.nombres.split(" ")[0];

            apellidos.innerHTML = resp.apellidos.split(" ")[0];
        }
        else {
            conectado.style.display = "none";
            desconectado.style.display = "block";

            nombres.innerHTML = "";
            apellidos.innerHTML = "";
        }
    });
};

var sessionDelete = function() {
    var ajax = new Ajax();

    ajax.open("POST", "/server/Views/sessionDelete.php");
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send(null);
    window.location.href="../../index.php";

    // Respuesta
    ajax.addEventListener("load", function () {
        var conectado = document.querySelector(".conectado");
        var desconectado = document.querySelector(".desconectado");
        var nombres = document.querySelector(".nombresPersona");
        var apellidos = document.querySelector(".apellidosPersona");

        conectado.style.display = "none";
        desconectado.style.display = "block";

        nombres.innerHTML = "";
        apellidos.innerHTML = "";
    });
};

var sessionStatus = function( url, conectadoFunc, desconectadoFunc ) {
    var ajax = new Ajax();

    ajax.open("POST", url);
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send();

    // Respuesta
    ajax.addEventListener("load", function () {
        var conectado = document.querySelector(".conectado");
        var desconectado = document.querySelector(".desconectado");
        var nombres = document.querySelector(".nombresPersona");
        var apellidos = document.querySelector(".apellidosPersona");
        var resp = JSON.parse( ajax.responseText );

        if( resp.val ) {
            desconectado.style.display = "none";
            conectado.style.display = "block";

            if( resp.nombres )
                nombres.innerHTML = resp.nombres.split(" ")[0];

            if( resp.apellidos )
                apellidos.innerHTML = resp.apellidos.split(" ")[0];

            conectadoFunc( resp );
        }
        else {
            desconectado.style.display = "block";
            conectado.style.display = "none";

            nombres.innerHTML = "";
            apellidos.innerHTML = "";

            desconectadoFunc();
        }
    });
};

var init = function() {

    var conectar = document.querySelector("#conectar");
    var desconectar = document.querySelector("#desconectar");

    conectar.addEventListener("click", function() {
        sessionCreate();
    });

    desconectar.addEventListener("click", function() {
        sessionDelete();
    });

    sessionStatus("/server/Views/sessionStatus.php", direcciones, function() {} );
};

var direcciones = function ( resp ) {
    var admin = document.querySelector("#admin");
    if(resp.tipo == "estudiante")
        admin.href = "/panelControl/panel_estudiante.html";
    else if(resp.tipo == "docente")
        admin.href = "/panelControl/panel_docente.html";
    else if(resp.tipo == "admin")
        admin.href = "/panelControl/panel_admin.html";
};

window.addEventListener("load", init);

























