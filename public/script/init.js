$( document ).ready(
    function() {
        $(".dropdown-button").dropdown();
        $(".modal-trigger").leanModal().click(function() {
        	$("#user").focus();
        });
        $(".button-collapse.mobile").sideNav();
        $(".button-collapse.right").sideNav({edge: "right"});
        $('.parallax').parallax();
        $('select').material_select();
        $('.close').click(function() {
            $("#modal1").closeModal();  
        })
    }
)