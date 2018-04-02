<?php
/**
 * Load minidied CSS
 *
 * @package     ChristophHerr\Prometheus2\Functions
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Functions;

add_filter( 'stylesheet_uri', function( $stylesheet_uri, $stylesheet_dir_uri ) {
	return trailingslashit( $stylesheet_dir_uri ) . 'style.min.css';
}, 10, 2 );
