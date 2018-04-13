/**
 * Prometheus 2 no-js script.
 *
 * @package ChristophHerr\Prometheus2\JS
 * @author  Christoph Herr
 * @license GPL-2.0+
 */

const prometheus2NoJs = ( () => {
	const changeClasses = () => {
		const c = document.body.classList;
		c.remove( 'no-js' );
		c.add( 'js' );
	};

	return {
		changeClasses
	};
})();

window.onload = setTimeout( prometheus2NoJs.changeClasses, 0 );
