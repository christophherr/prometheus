# Prometheus 2 Theme

Modular starter child theme with Sass partials for the Genesis Framework, based on the Genesis Sample Theme version 2.6.

Requires the Genesis Framework 2.6+ and PHP 5.6+

## Usage Notes - Please read

1.  The child theme files are loading before the Genesis Framework.
    You might have to wrap changes in a callback hooked to `genesis_setup`.
2.  The child theme has a more modular structure.
    Instead of cramming everything into functions.php, the code is spread over multiple files.
3.  The child theme uses a simple autoloader (see `/lib/functions/autoload.php`).
4.  The autoloader is 'fed' from two config files found in `config/autoload-admin-files.php` and `config/autoload-nonadmin-files.php`.
5.  Woocommerce and additional Customizer functionality are deactivated but can easily be activated by uncommenting the files in the autoloader config.
6.  Sass partials are located in `scss`. I might change the folder structure to just use partials.
7.  Print styles are commented out in `scss/styles.scss`.
8.  Basic Gulp commands are available to lint and compile Sass and minify the stylesheet. You can either just type `gulp` in a terminal window or take a look at the available commands in `gulpfile.js`.
More functionality (e.g. JavaScript processing, Browsersync) may be added in the future.
If you want more advanced Gulp features, take a look at Craig Simps' [Gulp WP Toolkit](https://github.com/craigsimps/gulp-wp-toolkit/) or Lee Anthony's [gulpfile.js](https://github.com/seothemes/genesis-starter/blob/master/gulpfile.js).
9.  Stylelint and ESlint are configured to follow WordPress standards and available to check CSS and JavaScript.
10. If you are using VS Code, you can automatically format CSS and JavaScript files with Prettier (e.g. using the `prettier-eslint` and `prettier-stylelint` extensions).
11. Gulp outputs the message `postcss-sorting: Invalid "order" option value`. This is caused by an incompatibility between postcss-sorting and the Stylelint Order plugin. It does not affect the CSS output.

## Installation Instructions

### Zip File
1. Download the .zip-file into the `wp-content/themes/` folder.
2. Extract it.
3. Make sure the Genesis parent theme is in the `wp-content/themes/` directory.
4. Activate the Prometheus 2 child theme from the WordPress dashboard.

### Clone the Repository
1. Open `wp-content/themes/` of your project in a terminal window.
2. Type: `git clone https://github.com/christophherr/prometheus`.
3. Activate the theme from the WordPress dashboard.

## Contributions

Feedback, bug reports, and pull requests are welcome.
