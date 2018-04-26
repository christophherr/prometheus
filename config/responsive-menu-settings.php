<?php
/**
 * Responsive menu settings.
 *
 * @package     ChristophHerr\Prometheus2\Config
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Config;

return [
	'mainMenu'         => __( 'Menu', 'prometheus2' ),
	'menuIconClass'    => 'dashicons-before dashicons-menu',
	'subMenu'          => __( 'Submenu', 'prometheus2' ),
	'subMenuIconClass' => 'dashicons-before dashicons-arrow-down-alt2',
	'menuClasses'      => [
		'combine' => [
			'.nav-primary',
		],
		'others'  => [],
	],
];
