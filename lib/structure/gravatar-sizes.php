<?php
/**
 * Changes to Gravatar sizes.
 *
 * @package     ChristophHerr\Prometheus2\Structure
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Structure;

add_filter( 'genesis_author_box_gravatar_size', function( $size ) {
	return 90;
});

add_filter( 'genesis_comment_list_args', function( $args ) {
	$args['avatar_size'] = 60;
	return $args;
});
