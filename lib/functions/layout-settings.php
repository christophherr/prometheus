<?php
/**
 * Changes to the Layout Settings.
 *
 * @package     ChristophHerr\Prometheus2\Admin
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Functions;

// Needs to run before admin_init.
add_action( 'after_setup_theme', function() {

	// Removes header right widget area.
	unregister_sidebar( 'header-right' );

	// Removes secondary sidebar.
	unregister_sidebar( 'sidebar-alt' );
});
