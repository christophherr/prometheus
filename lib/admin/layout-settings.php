<?php
/**
 * Changes to the Layout.
 *
 * @package     ChristophHerr\Prometheus2\Admin
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Admin;

genesis_unregister_layout( 'content-sidebar-sidebar' );
genesis_unregister_layout( 'sidebar-content-sidebar' );
genesis_unregister_layout( 'sidebar-sidebar-content' );

// Removes output of primary navigation right extras.
remove_filter( 'genesis_nav_items', 'genesis_nav_right', 10, 2 );
remove_filter( 'wp_nav_menu_items', 'genesis_nav_right', 10, 2 );

// Remove Header Right and Secondary Sidebars.
add_action('after_setup_theme', function() {

	// Removes header right widget area.
	unregister_sidebar( 'header-right' );

	// Removes secondary sidebar.
	unregister_sidebar( 'sidebar-alt' );
});
