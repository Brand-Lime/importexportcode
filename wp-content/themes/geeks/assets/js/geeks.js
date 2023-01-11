/**
 * Geeks JS
 */
;(function ($) {
	'use strict';

	const theme = {

		/**
         * Theme's components/functions list
    	 */
    	init: () => {
    		theme.viewSwitcher();
    	},
		
		/**
		 * Switch visibility of an element
		 * @memberof theme
		 * @method viewSwitcher
		 */
		viewSwitcher: () => {
			let switcher = document.querySelectorAll('[data-view]'), hash = window.location.hash, defaultView = document.querySelector( '[data-view-default]');

			if (switcher.length > 0) {

				for (let i = 0; i < switcher.length; i++) {
					switcher[i].addEventListener('click', function(e) {
						let target = this.dataset.view;
						viewSwitch(target);
						if (this.getAttribute('href') === '#') e.preventDefault();
					});
				}
			}

			let viewSwitch = (target) => {
				let targetView = document.querySelector(target),
				targetParent = targetView.parentNode,
				siblingViews = targetParent.querySelectorAll('.view');

				for (let n = 0; n < siblingViews.length; n++) {
					siblingViews[n].classList.remove('show');
				}

				targetView.classList.add('show');
			}

			let defaultTarget = false;
			if ( hash ) {
				let hashTarget = document.querySelector( hash );
				if ( null !== hashTarget ) {
					defaultTarget = hash;
				} 
			} else if ( null !== defaultView ) {
				defaultTarget = '#' + defaultView.getAttribute( 'id' );
			}

			if ( false !== defaultTarget ) {
				viewSwitch( defaultTarget );
			}
		},
	};

	/**
	 * Typed Headline.
	 */
	var animatedHeadline = function() {
		// forEach function
		var forEach = function forEach( array, callback, scope ) {
			for ( var i = 0; i < array.length; i++ ) {
				callback.call(scope, i, array[i]); // passes back stuff we need
			}
		};

		var typeds = document.querySelectorAll( '.typed-text' );
		forEach( typeds, function ( index, value ) {
			var defaults = {
				typeSpeed: 40,
				backSpeed: 40,
				backDelay: 1000,
				loop: true
			};
			var userOptions;
			if ( value.dataset.typedOptions != undefined ) userOptions = JSON.parse( value.dataset.typedOptions );
			var options = Object.assign({}, defaults, userOptions);
			var animatedHeadline = new Typed( value, options );
		} );
	}();

	/**
	 * Content carousel with extensive options to control behaviour and appearance
	 * @requires https://github.com/ganlanyuan/tiny-slider
	 */
	var carousel = function () {
		// forEach function
		var forEach = function forEach( array, callback, scope ) {
			for ( var i = 0; i < array.length; i++ ) {
				callback.call(scope, i, array[i]); // passes back stuff we need
			}
		}; // Carousel initialisation

		var carousels = document.querySelectorAll( '.tns-carousel-wrapper .tns-carousel-inner' );
		forEach( carousels, function ( index, value ) {

			var defaults = {
				container: value,
				mouseDrag: true,
				speed: 500,
				autoplayHoverPause: true,
				autoplayButtonOutput: false
			};
		
			var userOptions;
			if ( value.dataset.tnsSettings != undefined ) userOptions = JSON.parse( value.dataset.tnsSettings );
			var options = Object.assign({}, defaults, userOptions);
			var carousel = tns( options );
			var carouselWrapper = value.closest( '.tns-carousel-wrapper' ),
				carouselItems = carouselWrapper.querySelectorAll( '.tns-item' ),
				carouselInfo = carousel.getInfo(),
				carouselCurrentSlide = carouselWrapper.querySelector( '.tns-current-slide' ),
				carouselTotalSlides = carouselWrapper.querySelector( '.tns-total-slides' ); // Center slide

			if ( carouselWrapper.classList.contains( 'tns-center' ) ) {
				var indexCurrentInitial = carouselInfo.index;
				carouselInfo.slideItems[indexCurrentInitial].classList.add('active');
				carousel.events.on( 'indexChanged', function () {
					var info = carousel.getInfo(),
					indexPrev = info.indexCached,
					indexCurrent = info.index;
					info.slideItems[indexPrev].classList.remove('active');
					info.slideItems[indexCurrent].classList.add('active');
				} );
			} // Slides count

			if ( carouselWrapper.querySelector('.tns-slides-count') === null ) return;
			carouselCurrentSlide.innerHTML = carouselInfo.displayIndex;
			carouselTotalSlides.innerHTML = carouselInfo.slideCount;
			carousel.events.on('indexChanged', function () {
				var info = carousel.getInfo();
				carouselCurrentSlide.innerHTML = info.displayIndex;
			});
		});
	}();

	if( typeof $.blockUI !== "undefined" ) {
        $.blockUI.defaults.message                   = null;
        $.blockUI.defaults.overlayCSS.background     = '#fff url(' + geeks_options.ajax_loader_url + ') no-repeat center';
        $.blockUI.defaults.overlayCSS.backgroundSize = '16px 16px';
        $.blockUI.defaults.overlayCSS.opacity        = 0.6;
    }

    $( 'body' ).on( 'adding_to_cart', function( e, $btn, data){
        $btn.closest( '.geeks-list-view, .product .card' ).block();
    });

    $( 'body' ).on( 'added_to_cart', function(){
        $( '.product .card, .geeks-list-view' ).unblock();
    });

    tippy('.geeks-wishlist', {
      content: "Add to Wishlist",
      animation: 'scale',
    });


    /*===================================================================================*/
    /*  Initialize Owl carousel
    /*===================================================================================*/
    $('[data-ride="owl-carousel"]').each(function() {
        var $owlElement = $(this),
            owlCarouselParams = $owlElement.data('carouselOptions');
        $owlElement.owlCarousel(owlCarouselParams);
    });


    
	theme.init();

})(jQuery);