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
        $('.datepicker1').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            min: true,
            onOpen: function () {
              this.clear();
            },
            onSet: function () {
              var x,y,year,date,month;
              x = $('.datepicker1').pickadate().val().toString();
              y = x.split(/[ ,]+/);
              date = y[0];
              month = y[1];
              year = y[2];
              console.log(y[0]+" "+ y[1]+ " "+ y[2]);
              if(date && month && year){
                this.close();
              }
            }
          });

    }
)