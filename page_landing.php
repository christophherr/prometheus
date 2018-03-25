<?php
/**
 * Prometheus 2.
 *
 * This file adds the landing page template to the Prometheus 2 Theme.
 *
 * Template Name: Landing
 *
 * @package ChristophHerr\Prometheus2
 * @since   1.0.0
 * @author  Christoph Herr
 * @license GPL-2.0+
 * @link    https://www.christophherr.com/
 */

namespace ChristophHerr\Prometheus2;

// Adds landing page body class.
add_filter( 'body_class', function( $classes ) {
	$classes[] = 'landing-page';
	return $classes;
});

// Removes Skip Links.
remove_action( 'genesis_before_header', 'genesis_skip_links', 5 );

// Dequeues Skip Links Script.
add_action( 'wp_enqueue_scripts', function() {
	wp_dequeue_script( 'skip-links' );
});

// Forces full width content layout.
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// Removes site header elements.
remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );

// Removes navigation.
remove_theme_support( 'genesis-menus' );

// Removes breadcrumbs.
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

// Removes footer widgets.
remove_action( 'genesis_before_footer', 'genesis_footer_widget_areas' );

// Removes site footer elements.
remove_action( 'genesis_footer', 'genesis_footer_markup_open', 5 );
remove_action( 'genesis_footer', 'genesis_do_footer' );
remove_action( 'genesis_footer', 'genesis_footer_markup_close', 15 );

// Runs the Genesis loop.
genesis();
