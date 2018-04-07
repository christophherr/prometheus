<?php
/**
 * Maybe require files
 *
 * @package     ChristophHerr\Prometheus2
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Utilities;

/**
 * Requires the file if it is readable. Throws an Exception if it is not.
 *
 * @since 1.0.0
 *
 * @param array $file Array of file names.
 *
 * @throws File_Exception If the config file does not exist or is not readable.
 *
 * @return array
 */
function maybe_require_files( $file ) {
	try {
		if ( ! is_readable( $file ) ) {
			throw File_Exception::config_is_not_readable( $file );
		}
		return require $file;
	} catch ( File_Exception $e ) {
		echo $e; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped -- Escaped in method.
	}
}
