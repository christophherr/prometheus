<?php
/**
 * Remove AdSense settings.
 *
 * Removal from Customizer is happening in 'customizer/customizer.php'
 *
 * @package     ChristophHerr\Prometheus2\Admin
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Admin;

// Sets AdSense ID to always be an empty string - stops meta box from appearing on Post screens.
add_filter( 'genesis_pre_get_option_adsense_id', '__return_empty_string' );

// Removes AdSense metabox from Theme Settings.
add_action( 'genesis_theme_settings_metaboxes', function () {
	remove_meta_box( 'genesis-theme-settings-adsense', 'toplevel_page_genesis', 'main' );
});

// Removal from Customizer is in 'customizer/customizer.php.
