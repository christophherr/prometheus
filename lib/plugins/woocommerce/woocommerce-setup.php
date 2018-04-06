<?php
/**
 * This file adds the required WooCommerce setup functions
 *
 * @package     ChristophHerr\Prometheus2\Plugins\Woocommerce
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Plugins\Woocommerce;

// Adds product gallery support.
if ( class_exists( 'WooCommerce' ) ) {
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
	add_theme_support( 'wc-product-gallery-zoom' );
}

// Prints an inline script to the footer to keep products the same height.
add_action( 'wp_enqueue_scripts', function() {

	// If Woocommerce is not activated, or a product page isn't showing, exit early.
	if ( ! class_exists( 'WooCommerce' ) || ! is_shop() && ! is_product_category() && ! is_product_tag() ) {
		return;
	}

	wp_enqueue_script(
		'prometheus2-match-height',
		get_stylesheet_directory_uri() . '/js/jquery.matchHeight.min.js',
		[ 'jquery' ],
		CHILD_THEME_VERSION,
		true
	);
	wp_add_inline_script(
		'prometheus2-match-height',
		"jQuery(document).ready( function() { jQuery( '.product .woocommerce-LoopProduct-link').matchHeight(); });"
	);

}, 99 );

// Modifies the WooCommerce breakpoints.
add_filter( 'woocommerce_style_smallscreen_breakpoint', function() {
	$current = genesis_site_layout();
	$layouts = [
		'one-sidebar' => [
			'content-sidebar',
			'sidebar-content',
		],
	];

	if ( in_array( $current, $layouts['one-sidebar'], true ) ) {
		return '1200px';
	}

	return '860px';
});

// Sets the default products per page.
add_filter( 'genesiswooc_products_per_page', function() {
	return 8;
});

// Updates the next and previous arrows to the default Genesis style.
add_filter( 'woocommerce_pagination_args', function( $args ) {
	$args['prev_text'] = sprintf( '&laquo; %s', __( 'Previous Page', 'prometheus2' ) );
	$args['next_text'] = sprintf( '%s &raquo;', __( 'Next Page', 'prometheus2' ) );

	return $args;
});

// Defines WooCommerce image sizes on theme activation.
add_action( 'after_switch_theme', function() {
	global $pagenow;

	// Checks conditionally to see if we're activating the current theme and that WooCommerce is installed.
	if ( ! isset( $_GET['activated'] ) || 'themes.php' !== $pagenow || ! class_exists( 'WooCommerce' ) ) { // phpcs:ignore WordPress.CSRF.NonceVerification.NoNonceVerification -- low risk, follows official snippet at https://goo.gl/nnHHQa.
		return;
	}

	update_woocommerce_image_dimensions();
});

// Defines the WooCommerce image sizes on WooCommerce activation.
add_action( 'activated_plugin', function( $plugin ) {

	// Checks to see if WooCommerce is being activated.
	if ( 'woocommerce/woocommerce.php' !== $plugin ) {
		return;
	}

	update_woocommerce_image_dimensions();
}, 10, 2 );

/**
 * Updates WooCommerce image dimensions.
 *
 * @since 1.0.0
 *
 * @return void
 */
function update_woocommerce_image_dimensions() {
	// Updates image size options.
	update_option( 'woocommerce_single_image_width', 655 );    // Single product image.
	update_option( 'woocommerce_thumbnail_image_width', 500 ); // Catalog image.

	// Updates image cropping option.
	update_option( 'woocommerce_thumbnail_cropping', '1:1' );
}

// Filters the WooCommerce gallery image dimensions.
add_filter( 'woocommerce_get_image_size_gallery_thumbnail', function( $size ) {
	$size = [
		'width'  => 180,
		'height' => 180,
		'crop'   => 1,
	];

	return $size;
});
