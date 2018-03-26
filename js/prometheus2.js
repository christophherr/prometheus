/**
 * Prometheus 2 entry point.
 *
 * @package ChristophHerr\Prometheus2\JS
 * @author  Christoph Herr
 * @license GPL-2.0+
 */

const prometheus2 = ( function( $ ) {
	'use strict';

	/**
	 * Adjust site inner margin top to compensate for sticky header height.
	 *
	 * @since 2.6.0
	 */
	const moveContentBelowFixedHeader = function() {
			let siteInnerMarginTop = 0;
			const siteHeader = $( document.getElementsByClassName( 'site-header' ) );
			const siteInner = $( document.getElementsByClassName( 'site-inner' ) );

			if ( 'fixed' === siteHeader.css( 'position' ) ) {
				siteInnerMarginTop = siteHeader.outerHeight();
			}

			siteInner.css( 'margin-top', siteInnerMarginTop );
		},

		/**
		 * Initialize Genesis Sample.
		 *
		 * Internal functions to execute on document load can be called here.
		 *
		 * @since 2.6.0
		 */
		init = () => {

			// Run on first load.
			moveContentBelowFixedHeader();

			// Run after window resize.
			$( window ).resize( () => {
				moveContentBelowFixedHeader();
			});

			// Run after the Customizer updates.
			// 1.5s delay is to allow logo area reflow.
			if ( 'undefined' !== typeof wp.customize ) {
				wp.customize.bind( 'change', setting => {
					setTimeout( () => {
						moveContentBelowFixedHeader();
					}, 1500 );
				});
			}
		};

	// Expose the init function only.
	return {
		init
	};
}( jQuery ) );

jQuery( window ).on( 'load', prometheus2.init );
