"use strict";
	jQuery.noConflict();
    (function( $ ) {
        function animateFromLeft($el){
            var $parent = $el.parent();
            var $width = $parent.width();
            var $srcWidth = $el.width();
            
            $el.hide().css({left: $width, position: 'relative'})
            $el.show().animate({left: 0}, 500);
        }
        
        $(function() {
            $(window).on('load', function(){
                $(".slideCtxt").hide();
                $(".slideCtxt").children().hide();
            });
            
            $(".slideFx ul.slideMenu > li > button").click(function(){
                var el = $(this);
                
                var parent = el.parent();
                var id = parent.attr('id');
                
                var $trg_el = $("#"+id+"_pkg");
                $(".slideCtxt").show();
                $(".slideCtxt").children().hide();
                $trg_el.show();
                animateFromLeft($trg_el);
            });
          
        $("#scrollup").on("click", function() {
			$("body,html").animate({
				scrollTop: 0
			}, 3500);
			return false
		});
        /* Date Picker	*/
        $('#sandbox-container .input-group.date').datepicker({
            forceParse: false,
            autoclose: true,
            todayHighlight: true
        });

        $('#departureDate .input-group.date').datepicker({
            forceParse: false,
            autoclose: true,
            todayHighlight: true
        });


        $("#online-booking").hide();
        $(".open_form").click(function(){
            $("#online-booking").show(1000);
        });
        
        
      });
    })(jQuery);
	
	

