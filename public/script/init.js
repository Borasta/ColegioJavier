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
            $(".modal").closeModal();
        })
        $('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    }
)