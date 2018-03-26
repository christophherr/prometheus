# Prometheus 2 Theme

Modularised, sassified child theme for the Genesis Framework, based on the Genesis Sample Theme version 2.6.

Requires the Genesis Framework 2.6+ and PHP 5.6+

## Please be aware that

1.  The child theme files are loading before the Genesis Framework.
    You might have to wrap changes in a callback hooked to `genesis_setup`.
2.  The child theme has a more modular structure.
    Instead of cramming everything into functions.php, the code is spread over multiple files.
3.  The child theme uses a simple autoloader (see `/lib/functions/autoload.php`).
4.  The autoloader is 'fed' from two config files found in `config/autoload-admin-files.php` and `config/autoload-nonadmin-files.php`.
5.  Woocommerce and additional Customizer functionality are deactivated but can easily be activated by uncommenting the files in the autoloader config.
6.  Sass partials are located in `scss`. I might change the folder structure to just use partials.
7.  Print styles are commented out in `scss/styles.scss`.
8.  Some basic Gulp commands are available to lint and compile Sass and minify the stylesheet. I might add functionality (e.g. JavaScript processing) in the future.
9.  Stylelint and ESlint are configured to WordPress standards and available to check CSS and JavaScript code.
10. If you are using VS Code, you can automatically format those files with Prettier (prettier-eslint and prettier-stylelint extensions).
11. Gulp outputs the message `postcss-sorting: Invalid "order" option value`. This is caused by an incompatibility between postcss-sorting and the Stylelint Order plugin. It does not affect the CSS output.

## Installation Instructions

1.  Upload the Prometheus 2 theme folder via FTP to your wp-content/themes/ directory. (The Genesis parent theme needs to be in the wp-content/themes/ directory as well.)
2.  Go to your WordPress dashboard and select Appearance.
3.  Activate the Prometheus 2 theme.
4.  Inside your WordPress dashboard, go to Genesis > Theme Settings and configure them to your liking.
