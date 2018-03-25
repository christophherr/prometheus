<?php
/**
 * Responsive menu settings.
 *
 * @package     ChristophHerr\Prometheus2
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Config;

return array(
	'mainMenu'         => __( 'Menu', 'genesis-sample' ),
	'menuIconClass'    => 'dashicons-before dashicons-menu',
	'subMenu'          => __( 'Submenu', 'genesis-sample' ),
	'subMenuIconClass' => 'dashicons-before dashicons-arrow-down-alt2',
	'menuClasses'      => array(
		'combine' => array(
			'.nav-primary',
		),
		'others'  => array(),
	),
);
