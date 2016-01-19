$(document).ready( function() {

	// Logo
	var $logo 	= $('#logo');
	 if (location.href.indexOf("#") != 1000) {
        if(location.href.substr(location.href.indexOf("#"))!='#about'){
        	$logo.show();
        }
    }
    
	// Show logo
	$('#tab-container .tab a').click(function() {
	  $logo.slideDown('slow');
	});
	// Hide logo
	$('#tab-about').click(function() {
	  $logo.slideUp('slow');
	});	
function animMeter(){
    $(".meter > span").each(function() {
                $(this)
                    .data("origWidth", $(this).width())
                    .width(0)
                    .animate({
                        width: $(this).data("origWidth")
                    }, 1200);
            });
}
animMeter();

      $('#tab-container').easytabs({
        animate			: true,
        updateHash		: true,
        transitionIn	: 'slideDown',
        transitionOut	: 'slideUp',
        animationSpeed	: 600,
        tabActiveClass	: 'active'}).bind('easytabs:midTransition', function(event, $clicked, $targetPanel){
            if($targetPanel.selector=='#resume'){
                    animMeter();
            }
        });
    });

	
(function($) {

	jQuery.fn.autoResizeFbPost = function() {

		var fixWidth = function($container, $clonedContainer, doParse) {
            
            // default parameter. 
			doParse = typeof doParse == 'undefined' ? true : doParse; 

			var updatedWidth = $container.width();

			// update all div.fb-post with correct width of container
			$clonedContainer
			.find('div.fb-post')
			.each(function() {
				$(this).attr('data-width', updatedWidth);
			});

			// update page with adjusted markup
			$container.html( $clonedContainer.html() );

            // should we call FB.XFBML.parse? we don't want to do this at page load because it will happen automatically
			if (doParse && FB && FB.XFBML && FB.XFBML.parse)
				FB.XFBML.parse();
		};

		return this.each(function() {
			var $container = $(this),
				$clonedContainer = $container.clone();

			// make sure there is a .fb-post element before we do anything.
			if ( ! $container.find('div.fb-post').length) {
				return false;
			}

			// execute once (document.ready) and do not call FB.XFBML.parse()
			fixWidth($container, $clonedContainer, false);

			// on window resize, update and fix..
			$(window).on('resize', function() {

				// only trigger fixWidth once after window has not been resized for 1 second
				delayFireOnce(1000).done(function() {
					fixWidth($container, $clonedContainer);
				});

			});

			// helper function
			var	delayTimer;
			var delayFireOnce = function(timeout) {
				var d = $.Deferred();
				clearTimeout(delayTimer);

				t = setTimeout(function() {
					d.resolve();
				}, timeout);

				return d.promise();
			};
	
		});
	};
    
})(jQuery);

(function($) {
    $(document).ready(function() {
        $('#post').autoResizeFbPost();
    });    
})(jQuery);
