<?php
/**
 * This file registers the Customizer additions to Prometheus2.
 *
 * @package     ChristophHerr\Prometheus2\Customizer
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Customizer;

use WP_Customize_Color_Control;

// Registers settings and controls with the Customizer.
add_action( 'customize_register', function( $wp_customize ) {

	$wp_customize->add_setting(
		'prometheus2_link_color',
		array(
			'default'           => \ChristophHerr\Prometheus2\Customizer\get_default_link_color(),
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'prometheus2_link_color',
			array(
				'description' => __( 'Change the color of post info links, hover color of linked titles, hover color of menu items, and more.', 'prometheus2' ),
				'label'       => __( 'Link Color', 'prometheus2' ),
				'section'     => 'colors',
				'settings'    => 'prometheus2_link_color',
			)
		)
	);

	$wp_customize->add_setting(
		'prometheus2_accent_color',
		array(
			'default'           => \ChristophHerr\Prometheus2\Customizer\get_default_accent_color(),
			'sanitize_callback' => 'sanitize_hex_color',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'prometheus2_accent_color',
			array(
				'description' => __( 'Change the default hovers color for button.', 'prometheus2' ),
				'label'       => __( 'Accent Color', 'prometheus2' ),
				'section'     => 'colors',
				'settings'    => 'prometheus2_accent_color',
			)
		)
	);

	$wp_customize->add_setting(
		'prometheus2_logo_width',
		array(
			'default'           => 350,
			'sanitize_callback' => 'absint',
		)
	);

	// Add a control for the logo size.
	$wp_customize->add_control(
		'prometheus2_logo_width',
		array(
			'label'       => __( 'Logo Width', 'prometheus2' ),
			'description' => __( 'The maximum width of the logo in pixels.', 'prometheus2' ),
			'priority'    => 9,
			'section'     => 'title_tagline',
			'settings'    => 'prometheus2_logo_width',
			'type'        => 'number',
			'input_attrs' => array(
				'min' => 100,
			),

		)
	);
});
