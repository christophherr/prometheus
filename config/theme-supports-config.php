<?php
/**
 * The theme supports config.
 *
 * @package     ChristophHerr\Prometheus2
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Config;

return array(
	'html5'                           => array(
		'caption',
		'comment-form',
		'comment-list',
		'gallery',
		'search-form',
	),
	'genesis-accessibility'           => array(
		'404-page',
		'drop-down-menu',
		'headings',
		'rems',
		'search-form',
		'skip-links',
	),
	'genesis-responsive-viewport'     => null,
	'custom-logo'                     => array(
		'height'      => 120,
		'width'       => 700,
		'flex-height' => true,
		'flex-width'  => true,
	),
	'genesis-menus'                   => array(
		'primary'   => __( 'Header Menu', 'prometheus2' ),
		'secondary' => __( 'Footer Menu', 'prometheus2' ),
	),
	'genesis-after-entry-widget-area' => null,
	'genesis-footer-widgets'          => 3,
);

