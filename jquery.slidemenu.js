(function($) {
	
	$.fn.slidemenu = function( options ) {
		var defaults = {
			clearbutton : 'input.clearfilter',
			selectbutton : 'input.selectfilter',
			controls : "#categorycontrols",			// area to be hidden and revealed
			filterConfig : {
				interval: 100,
				sensitivity: 4,
				over: addHoverClass,
				timeout: 100,
				out: removeHoverClass
			}
		};
		
		var settings = $.extend(defaults, options);

		
		function evaluateChecks(selectedFilters) {
			if (selectedFilters.length === 0) {			// if no checkboxes are selected, show all of the divs
				$('.filterable').slideDown();
				$('input[name="categories"]').removeClass('current');
				return false;
			} else {
				$(".filterable").slideUp();
				$("input[name='categories']").removeClass('current');
				$.each(selectedFilters, function(index, val) {
					$("." + val.toLowerCase()).slideDown();
					$(this).addClass("current");
				});
			}
		}
		
		var clearbutton = $(settings.clearbutton);
		clearbutton.bind("click", function(e) {
			$('input:checked[class="filter"]').attr('checked', false); // clear checked items
			evaluateChecks([]);
		});
	
		var selectbutton = $(settings.selectbutton);
		selectbutton.bind("click", function(e) {
			var filters = $('input:checked[class="filter"]').map(function() {
				return $(this).val();
			});
		
			evaluateChecks(filters);
			return false;
		});
		
	
		function addHoverClass() {
			var $con = $(settings.controls);
			$con.css("display", "block").animate({"height": 200}, 200);
		}
	
		function removeHoverClass() {	
			var $con = $(settings.controls);
			$con.animate({"height":1 }).css("display", "none");
		}
		
		if (jQuery.fn.hoverIntent) {					// if HoverIntent plugin exists, use it
			$(this).hoverIntent(settings.filterConfig);	
		} else {										// else, fall back to jQuery.hover()
			$(this).hover(
				function() {
					addHoverClass();
				},
				function() {
					removeHoverClass();
				}
			);
		}

	};
})(jQuery);








