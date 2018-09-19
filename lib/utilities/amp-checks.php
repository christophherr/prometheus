<?php
/**
 * Check if AMP is active
 *
 * @package     ChristophHerr\Prometheus2\Utilities
 * @since       2.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Utilities;

/**
 * Determine whether this is an AMP response.
 *
 * Note that this must only be called after the parse_query action.
 *
 * @link https://github.com/Automattic/amp-wp
 *
 * @since 2.0.0
 *
 * @return bool
 */
function is_amp_response() {
	return function_exists( 'is_amp_endpoint' ) && is_amp_endpoint();
}

/**
 * Determine whether amp-live-list should be used for the comment list.
 *
 * @since 2.0.0
 *
 * @return bool
 */
function maybe_use_amp_live_list_comments() {

	if ( ! is_amp_response() ) {
		return false;
	}

	$amp_theme_support = get_theme_support( 'amp' );

	return ! empty( $amp_theme_support[0]['comments_live_list'] );
}

