<?php
/**
 * Theme error functions
 *
 * @package     ChristophHerr\Prometheus2\Utilities
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Utilities;

/**
 * Class to handle exception.
 */
class File_Exception extends \Exception {
	/**
	 * Throws exceptions if config files do not exist or are not readable.
	 *
	 * @param string $file File name.
	 * @return static
	 */
	public static function config_is_not_readable( $file ) {
		return new self( sprintf(
			// translators: Configuration file name that does not exist or is not readable.
			esc_html__( 'Something went wrong loading the configuration files. The file "%s" does either not exist or is not readable', 'prometheus2' ),
			$file
		));
	}
}
