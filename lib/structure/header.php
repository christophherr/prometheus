<?php
/**
 * Changes to the header area.
 *
 * @package     ChristophHerr\Prometheus2\Structure
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Structure;

// Displays custom logo.
add_action( 'genesis_site_title', 'the_custom_logo', 0 );
