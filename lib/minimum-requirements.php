<?php
/**
 * Handle when minimum requirements are not met.
 *
 * @package     ChristophHerr\Prometheus2
 * @since       2.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

add_action( 'after_switch_theme', 'prometheus_2_switch_theme' );
/**
 * Switch to the Genesis parent theme after the theme has been activated.
 *
 * @since 2.0.0
 *
 * @return void
 */
function prometheus_2_switch_theme() {
	switch_theme( 'genesis' );
	unset( $_GET['activated'] );
	add_action( 'admin_notices', 'prometheus_2_show_deactivation_and_upgrade_notice' );
}

add_action( 'load-customize.php', 'prometheus_2_do_not_load_customizer' );
/**
 * Don't load the Customizer.
 *
 * @since 2.0.0
 *
 * @return void
 */
function prometheus_2_do_not_load_customizer() {
	wp_die( esc_html( prometheus_2_upgrade_message() ), '', array( 'back_link' => true ) );
}

add_action( 'template_redirect', 'prometheus_2_do_not_load_customizer_preview' );
/**
 * Don't load the Customizer preview on installs prior to WordPress 4.7.
 *
 * @since 2.0.0
 *
 * @return void
 */
function prometheus_2_do_not_load_customizer_preview() {
	if ( isset( $_GET['preview'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.NoNonceVerification -- Just checking, no processing going on.
		wp_die( esc_html( prometheus_2_upgrade_message() ) );
	}
}

/**
 * Show an admin notice.
 *
 * @since 2.0.0
 *
 * @return void
 */
function prometheus_2_show_deactivation_and_upgrade_notice() {
	printf( '<div class="error"><p>%s</p></div>', esc_html( prometheus_2_upgrade_message() ) );
}

/**
 * Content of the admin notice detailing that the theme was not activated and which requirement wasn't met.
 *
 * @since 2.0.0
 *
 * @return string
 */
function prometheus_2_upgrade_message() {
	$genesis_version = get_genesis_version();
	$compare_wp_version = version_compare( $GLOBALS['wp_version'], '4.8', '<' );
	$compare_php_version = version_compare( PHP_VERSION, '5.6', '<' );
	$compare_genesis_version = version_compare( $genesis_version, '2.6', '<' );

	if ( $compare_wp_version && $compare_php_version && $compare_genesis_version ) {
		return sprintf(
			// Translators: 1 is the required WordPress version and 2 is the user's current version.
			__( 'Prometheus 2 cannot be activated because it requires Genesis version %1$s, WordPress version %2$s and PHP version %3$s. The Genesis Framework (parent theme) has been activated instead. You are running Genesis version %4$s, WordPress version %5$s and PHP version %6$s. Please upgrade Genesis, WordPress and PHP and try again.', 'prometheus2' ),
			'2.6',
			'4.9.6',
			'5.6',
			$genesis_version,
			$GLOBALS['wp_version'],
			PHP_VERSION
		);
	} elseif ( $compare_wp_version && $compare_php_version ) {
		return sprintf(
			// Translators: 1 is the required WordPress version and 2 is the user's current version.
			__( 'Prometheus 2 cannot be activated because it requires WordPress version %1$s and PHP version %2$s. The Genesis Framework (parent theme) has been activated instead. You are running WordPress version %3$s and PHP version %4$s. Please upgrade WordPress and PHP and try again.', 'prometheus2' ),
			'4.9.6',
			'5.6',
			$GLOBALS['wp_version'],
			PHP_VERSION
		);
	} elseif ( $compare_genesis_version && $compare_wp_version ) {
		return sprintf(
			// Translators: 1 is the required WordPress version and 2 is the user's current version.
			__( 'Prometheus 2 was not activated because it requires Genesis version %1$s and WordPress version %2$s. The Genesis Framework (parent theme) has been activated instead. You are running Genesis version %3$s and WordPress version %4$s. Please upgrade Genesis and WordPress and try again.', 'prometheus2' ),
			'2.6',
			'4.9.6',
			$genesis_version,
			$GLOBALS['wp_version']
		);
	} elseif ( $compare_genesis_version && $compare_php_version ) {
		return sprintf(
			// Translators: 1 is the required PHP version and 2 is the user's current version.
			__( 'Prometheus 2 was not activated because it requires Genesis version %1$s and PHP version of %2$s. The Genesis Framework (parent theme) has been activated instead. You are running Genesis version %3$s and PHP version %4$s. Please upgrade Genesis and PHP and try again.', 'prometheus2' ),
			'2.6',
			'5.6',
			$genesis_version,
			PHP_VERSION
		);
	} elseif ( $compare_wp_version ) {
		return sprintf(
			// Translators: 1 is the required WordPress version and 2 is the user's current version.
			__( 'Prometheus 2 was not activated because it requires WordPress version %1$s. The Genesis Framework (parent theme) has been activated instead. You are running WordPress version %2$s. Please upgrade WordPress and try again.', 'prometheus2' ),
			'4.9.6',
			$GLOBALS['wp_version']
		);
	} elseif ( $compare_php_version ) {
		return sprintf(
			// Translators: 1 is the required PHP version and 2 is the user's current version.
			__( 'Prometheus 2 was not activated because it requires PHP version %1$s. The Genesis Framework (parent theme) has been activated instead. You are running PHP version %2$s. Please upgrade PHP and try again.', 'prometheus2' ),
			'5.6',
			PHP_VERSION
		);
	} elseif ( $compare_genesis_version ) {
		return sprintf(
			// Translators: 1 is the required PHP version and 2 is the user's current version.
			__( 'Prometheus 2 was not activated because it requires Genesis version %1$s. The Genesis Framework (parent theme) has been activated instead. You are running Genesis version %2$s. Please upgrade Genesis and try again.', 'prometheus2' ),
			'2.6',
			$genesis_version
		);
	}
	return '';
}
