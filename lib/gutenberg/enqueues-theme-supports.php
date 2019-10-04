<?php
/**
 * Changes for Gutenberg.
 *
 * @package     ChristophHerr\Prometheus2\Gutenberg
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Gutenberg;

/**
 * Enqueue Gutenberg front-end styles.
 */
add_action( 'wp_enqueue_scripts', function() {
	wp_enqueue_style(
		'prometheues-2-gutenberg',
		get_stylesheet_directory_uri() . '/lib/gutenberg/front-end.css',
		[ 'prometheus-2' ],
		CHILD_THEME_VERSION
	);
} );

/**
 * Enqueue Gutenberg admin editor fonts and styles.
 */
add_action( 'enqueue_block_editor_assets', function() {
	wp_enqueue_style(
		'prometheus-2-gutenberg-fonts',
		'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,700',
		[],
		CHILD_THEME_VERSION
	);

	/**
	 * Enqueue a separate admin stylesheet from the main `style-editor.css` to
	 * style the admin editor title only, due to this issue:
	 * https://github.com/WordPress/gutenberg/issues/10485.
	 * TODO: move this to `style-editor.css` once it's possible to style
	 * elements outside `.editor-block-list__block` via `add_editor_styles`.
	 */
	wp_enqueue_style(
		'prometheus-2-editor-title',
		get_stylesheet_directory_uri() . '/lib/gutenberg/style-editor-title.css',
		[],
		CHILD_THEME_VERSION
	);

} );

// Add support for editor styles.
add_theme_support( 'editor-styles' );

// Enqueue editor styles.
add_editor_style( '/lib/gutenberg/style-editor.css' );

// Adds support for block alignments.
add_theme_support( 'align-wide' );

// Adds support for editor font sizes.
add_theme_support(
	'editor-font-sizes',
	[
		[
			'name'      => __( 'small', 'prometheus2' ),
			'shortName' => __( 'S', 'prometheus2' ),
			'size'      => 12,
			'slug'      => 'small',
		],
		[
			'name'      => __( 'regular', 'prometheus2' ),
			'shortName' => __( 'M', 'prometheus2' ),
			'size'      => 16,
			'slug'      => 'regular',
		],
		[
			'name'      => __( 'large', 'prometheus2' ),
			'shortName' => __( 'L', 'prometheus2' ),
			'size'      => 20,
			'slug'      => 'large',
		],

		[
			'name'      => __( 'larger', 'prometheus2' ),
			'shortName' => __( 'XL', 'prometheus2' ),
			'size'      => 24,
			'slug'      => 'larger',
		],
	]
);

// Adds support for editor color palette.
add_theme_support(
	'editor-color-palette',
	[
		[
			'name'  => __( 'Light gray', 'prometheus2' ),
			'slug'  => 'light-gray',
			'color' => '#f5f5f5',
		],
		[
			'name'  => __( 'Medium gray', 'prometheus2' ),
			'slug'  => 'medium-gray',
			'color' => '#999',
		],
		[
			'name'  => __( 'Dark gray', 'prometheus2' ),
			'slug'  => 'dark-gray',
			'color' => '#333',
		],
	]
);
