<?php
/**
 * Prometheus 2.
 *
 * This file adds functions to the Prometheus 2 Theme.
 *
 * @package ChristophHerr\Prometheus2
 * @author  Christoph Herr
 * @license GPL-2.0+
 * @link    https://www.christophherr.com/
 */

namespace ChristophHerr\Prometheus2;

// Start the Child Theme.
include_once( 'lib/init.php' );

// Load the Child Theme files.
include_once( 'lib/functions/autoload.php' );

// Start the Genesis Framework.
include_once( get_template_directory() . '/lib/init.php' );

//	add_filter( 'genesis_customizer_seo_settings_config', function( $config ) {
//		return require CHILD_THEME_DIR . '\config\customizer-settings.php';
//	});
