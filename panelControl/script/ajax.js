window.addEventListener("load", function() {
    Ajax = function() {
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
                } catch (e) {}
            }
        }
        if (!ajax)
        {
            alert("No ha sido posible crear una instancia de XMLHttpRequest");
        }
        return ajax;
    }
});