<?php
/**
 * Prometheus 2.
 *
 * This file starts the Prometheus 2 Theme.
 *
 * @package ChristophHerr\Prometheus2
 * @author  Christoph Herr
 * @license GPL-2.0+
 * @link    https://www.christophherr.com/
 */

namespace ChristophHerr\Prometheus2;

// Start the Child Theme.
require_once 'lib/init.php';

// Load error messages.
require_once 'lib/error-messages.php';

// Load the Child Theme files.
require_once 'lib/functions/autoload.php';

// Start the Genesis Framework.
require_once get_template_directory() . '/lib/init.php';
