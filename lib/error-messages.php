<?php
/**
 * Theme error functions
 *
 * @package     ChristophHerr\Prometheus2
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2;

/**
 * Show a message when a config file is unavailable or unreadable.
 *
 * @return void
 */
function config_unavailable_message() {
	add_action( 'admin_notices', function() {
		$error = esc_html__( 'Sorry, something went wrong loading one of the config files. Please check your paths and filenames.', 'prometheus2' );
		printf( '<div class="error"><p>%s</p></div>', $error ); // phpcs:disable WordPress.XSS.EscapeOutput.OutputNotEscaped -- Escaped in previous line.
	});
}
