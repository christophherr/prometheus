<?php
/**
 * Changes to the menus.
 *
 * @package     ChristophHerr\Prometheus2\Functions
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Structure;

add_action( 'genesis_setup', function() {

	// Repositions primary navigation menu.
	remove_action( 'genesis_after_header', 'genesis_do_nav' );
	add_action( 'genesis_header', 'genesis_do_nav', 12 );

	// Repositions the secondary navigation menu.
	remove_action( 'genesis_after_header', 'genesis_do_subnav' );
	add_action( 'genesis_footer', 'genesis_do_subnav', 10 );

	add_filter( 'wp_nav_menu_args', function( $args ) {

		if ( 'secondary' !== $args['theme_location'] ) {
			return $args;
		}

		$args['depth'] = 1;
		return $args;
	});
});
