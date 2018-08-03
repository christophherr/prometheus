'use strict';

/**
 * Prometheus 2 no-js script.
 *
 * @package ChristophHerr\Prometheus2\JS
 * @author  Christoph Herr
 * @license GPL-2.0+
 */

var prometheus2NoJs = ( function() {
  var changeClasses = function changeClasses() {
    var c = document.body.classList;
    c.remove( 'no-js' );
    c.add( 'js' );
  };

  return {
    changeClasses: changeClasses
  };
}() );

window.onload = setTimeout( prometheus2NoJs.changeClasses, 0 );
