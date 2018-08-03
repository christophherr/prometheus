'use strict';

/**
 * Prometheus 2 entry point.
 *
 * @package ChristophHerr\Prometheus2\JS
 * @author  Christoph Herr
 * @license GPL-2.0+
 */

var prometheus2 = ( function() {
  'use strict';

  /**
   * Adjust site inner margin top to compensate for sticky header height.
   *
   * @since 1.0.0
   */

  var moveContentBelowFixedHeader = function moveContentBelowFixedHeader() {
    var siteInnerMarginTop = 0;
    var siteHeader = document.querySelector( '.site-header' );
    var siteInner = document.querySelector( '.site-inner' );

    if ( 'fixed' === window.getComputedStyle( siteHeader ).position ) {
      siteInnerMarginTop = siteHeader.offsetHeight;
    }
    siteInner.style.marginTop = siteInnerMarginTop + 'px';
  };

  /**
   * Initialize Promethues 2.
   *
   * Internal functions to execute on document load can be called here.
   *
   * @since 1.0.0
   */
  var init = function init() {

    // Run on first load.
    moveContentBelowFixedHeader();

    // Run after window resize.
    window.addEventListener( 'resize', function() {
      moveContentBelowFixedHeader();
    });

    // Run after the Customizer updates.
    // 1.5s delay is to allow logo area reflow.
    if ( 'undefined' !== typeof wp && 'undefined' !== typeof wp.customize ) {
      wp.customize.bind( 'change', function( setting ) {
        setTimeout( function() {
          moveContentBelowFixedHeader();
        }, 1500 );
      });
    }
  };

  // Expose the init function only.
  return {
    init: init
  };
}() );

window.onload = prometheus2.init();
