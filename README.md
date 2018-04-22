# Prometheus 2 Theme

![Prometheus Statue](https://raw.githubusercontent.com/christophherr/prometheus/develop/screenshot.png)

Modular starter child theme with Sass partials for the Genesis Framework, based on the Genesis Sample Theme version 2.6.

Requires the Genesis Framework 2.6+ and PHP 5.6+

[![Build Status](https://travis-ci.org/christophherr/prometheus.svg?branch=develop)](https://travis-ci.org/christophherr/prometheus)

## Converkit 3 compatible Sass partials

Brian Johnson, @themustardseed, has done outstanding work converting the Sass partials to be compatible with Convertkit 3.
He also improved the partials for this repo, which can be seen in PR #20.
You can find Brian's Repo here: [https://github.com/themustardseed/prometheus](https://github.com/themustardseed/prometheus).

Thank you, Brian!

## Usage Notes - Please read

1.  The child theme files are loading before the Genesis Framework.
    You might have to wrap changes in a callback hooked to `genesis_setup`.
2.  The child theme has a more modular structure.
    Instead of cramming everything into functions.php, the code is spread over multiple files.
3.  The child theme uses a simple autoloader (see `/lib/functions/autoload.php`).
4.  The autoloader is 'fed' from two config files found in `config/autoload-admin-files.php` and `config/autoload-nonadmin-files.php`.
5.  Woocommerce and additional Customizer functionality are deactivated but can easily be activated by uncommenting the files in the autoloader config.
6.  AdSense settings are deactivated in `admin/remove-adsense.php` and in `customizer/remove-adsense.php`.
7.  The Sass partials for the theme are located in `scss`.
    The Sass partials for Woocommerce are located in `/lib/plugins/woocommerce/scss`.
8.  Print styles are commented out in `scss/styles.scss`.
9.  Gulp commands are available to lint and compile Sass, minify the stylesheet, lint and minify the JavaScript files.

    Please open `gulpfile.js` and configure Browser-Sync (in the watch task) to load the website you are working on.

    To use Gulp, you can either just type `gulp` in a terminal window or take a look at the available commands in `gulpfile.js`.

    Please be aware that the Javascript minifier expects ES2016+ syntax.

    More functionality (e.g. image optimization) may be added in the future.
    If you want more advanced Gulp features, take a look at Craig Simpson's [Gulp WP Toolkit](https://github.com/craigsimps/gulp-wp-toolkit/) or Lee Anthony's [gulpfile.js](https://github.com/seothemes/genesis-starter/blob/master/gulpfile.js).

10. The minified stylesheet is loaded from `functions/load-minified-css.php`. Please uncomment the file in the (nonadmin) config to use style.min.css. Unminified JavaScript files are loaded if `SCRIPT_DEBUG` is set to true in `wp-config.php`.
11. Stylelint and ESlint are configured to follow WordPress standards and available to check CSS and JavaScript.
    Four Stylelint rules were changed to allow including the HTML resets and the Genesis structure; one additional rule was changed because Stylelint can't autofix it, yet.
12. If you are using VS Code, you can automatically format CSS and JavaScript files with Prettier (e.g. using the `prettier-eslint` and `prettier-stylelint` extensions).
13. If Javascript ES5 style is required, please replace the files with copies from Genesis Sample.
14. The functionality of Gary Jones' [genesis-js-no-js](https://github.com/GaryJones/genesis-js-no-js) has been added/enqueued to the theme in order to help prevent a flash of the desktop menu on mobile devices.

    It can be deactivated by commenting out the line `functions/no-js.php` in the nonadmin files autoloader.
    If you need ES5 JavaScript syntax, please deactivate the feature and use Gary's plugin.

## Installation Instructions

### Zip File

1.  Download the .zip-file into the `wp-content/themes/` folder.
2.  Extract it.
3.  Make sure the Genesis parent theme is in the `wp-content/themes/` directory.
4.  Activate the Prometheus 2 child theme from the WordPress dashboard.

### Clone the Repository

1.  Open `wp-content/themes/` of your project in a terminal window.
2.  Type: `git clone https://github.com/christophherr/prometheus`.
3.  Activate the theme from the WordPress dashboard.

## Contributions

Feedback, bug reports, and pull requests are welcome.
Please refer to CONTRIBUTING.md for details.

## Contributors

Thank you to everyone contributing to this project.

### Hall of Fame

[@polishedwp](https://github.com/polishedwp), [@GaryJones](https://github.com/GaryJones), [@themustardseed](https://github.com/themustardseed), [@mjsdiaz](https://github.com/mjsdiaz), [@seothemes](https://github.com/seothemes), [@srikat](https://github.com/srikat), [@craigsimps](https://github.com/craigsimps)
