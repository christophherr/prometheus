<?php
/**
 * Changes to the Sidebars.
 *
 * @package     ChristophHerr\Prometheus2\Structure
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Structure;

// Removes header right widget area.
unregister_sidebar( 'header-right' );

// Removes secondary sidebar.
unregister_sidebar( 'sidebar-alt' );
