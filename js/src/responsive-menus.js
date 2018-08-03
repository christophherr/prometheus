/* eslint camelcase:0 */

/**
 * Add the accessible responsive menu.
 *
 * @version 1.1.3
 *
 * @author StudioPress
 * @link https://github.com/copyblogger/responsive-menus/
 * @license GPL-2.0+
 * @package ChristophHerr\Prometheus2\JS
 */

( function( document, $, undefined ) {
	'use strict';

	const genesisMenuParams =
		'undefined' === typeof genesis_responsive_menu ?
			'' :
			genesis_responsive_menu;
	const genesisMenusUnchecked = genesisMenuParams.menuClasses;
	let genesisMenus = {};
	let menusToCombine = [];

	/**
	 * Validate the menus passed by the theme with what's being loaded on the page,
	 * and pass the new and accurate information to our new data.
	 *
	 * @param {genesisMenusUnchecked} Raw data from the localized script in the theme.
	 * @return {array} genesisMenus array gets populated with updated data.
	 * @return {array} menusToCombine array gets populated with relevant data.
	 */
	$.each( genesisMenusUnchecked, function( group ) {

		// Mirror our group object to populate.
		genesisMenus[group] = [];

		// Loop through each instance of the specified menu on the page.
		$.each( this, function( key, value ) {
			let menuString = value;
			let $menu = $( value );

			// If there is more than one instance, append the index and update array.
			if ( 1 < $menu.length ) {
				$.each( $menu, function( key, value ) {
					let newString = menuString + '-' + key;

					$( this ).addClass( newString.replace( '.', '' ) );

					genesisMenus[group].push( newString );

					if ( 'combine' === group ) {
						menusToCombine.push( newString );
					}
				});
			} else if ( 1 === $menu.length ) {
				genesisMenus[group].push( menuString );

				if ( 'combine' === group ) {
					menusToCombine.push( menuString );
				}
			}
		});
	});

	// Make sure there is something to use for the 'others' array.
	if ( 'undefined' === typeof genesisMenus.others ) {
		genesisMenus.others = [];
	}

	// If there's only one menu on the page for combining, push it to the 'others' array and nullify our 'combine' variable.
	if ( 1 === menusToCombine.length ) {
		genesisMenus.others.push( menusToCombine[0]);
		genesisMenus.combine = null;
		menusToCombine = null;
	}

	let genesisMenu = {};
	const mainMenuButtonClass = 'menu-toggle';
	const subMenuButtonClass = 'sub-menu-toggle';
	const responsiveMenuClass = 'genesis-responsive-menu';

	// Initialize.
	genesisMenu.init = function() {

		// Exit early if there are no menus to do anything.
		if ( 0 === $( _getAllMenusArray() ).length ) {
			return;
		}

		const menuIconClass =
			'undefined' !== typeof genesisMenuParams.menuIconClass ?
				genesisMenuParams.menuIconClass :
				'dashicons-before dashicons-menu';
		const subMenuIconClass =
			'undefined' !== typeof genesisMenuParams.subMenuIconClass ?
				genesisMenuParams.subMenuIconClass :
				'dashicons-before dashicons-arrow-down-alt2';
		const toggleButtons = {
			menu: $( '<button />', {
				class: mainMenuButtonClass,
				'aria-expanded': false,
				'aria-pressed': false
			}).append( genesisMenuParams.mainMenu ),
			submenu: $( '<button />', {
				class: subMenuButtonClass,
				'aria-expanded': false,
				'aria-pressed': false
			}).append(
				$( '<span />', {
					class: 'screen-reader-text',
					text: genesisMenuParams.subMenu
				})
			)
		};

		// Add the responsive menu class to the active menus.
		_addResponsiveMenuClass();

		// Add the main nav button to the primary menu, or exit the plugin.
		_addMenuButtons( toggleButtons );

		// Setup additional classes.
		$( '.' + mainMenuButtonClass ).addClass( menuIconClass );
		$( '.' + subMenuButtonClass ).addClass( subMenuIconClass );
		$( '.' + mainMenuButtonClass )
			.on( 'click.genesisMenu-mainbutton', _mainmenuToggle )
			.each( _addClassID );
		$( '.' + subMenuButtonClass ).on(
			'click.genesisMenu-subbutton',
			_submenuToggle
		);
		$( window )
			.on( 'resize.genesisMenu', _doResize )
			.triggerHandler( 'resize.genesisMenu' );
	};

	/**
	 * Add menu toggle button to appropriate menus.
	 *
	 * @param {toggleButtons} Object of menu buttons to use for toggles.
	 */
	function _addMenuButtons( toggleButtons ) {

		// Apply sub menu toggle to each sub-menu found in the menuList.
		$( _getMenuSelectorString( genesisMenus ) )
			.find( '.sub-menu' )
			.before( toggleButtons.submenu );

		if ( null !== menusToCombine ) {
			let menusToToggle = genesisMenus.others.concat( menusToCombine[0]);

			// Only add menu button the primary menu and navs NOT in the combine variable.
			$( _getMenuSelectorString( menusToToggle ) ).before( toggleButtons.menu );
		} else {

			// Apply the main menu toggle to all menus in the list.
			$( _getMenuSelectorString( genesisMenus.others ) ).before( toggleButtons.menu );
		}
	}

	/**
	 * Add the responsive menu class.
	 */
	function _addResponsiveMenuClass() {
		$( _getMenuSelectorString( genesisMenus ) ).addClass( responsiveMenuClass );
	}

	/**
	 * Execute our responsive menu functions on window resizing.
	 */
	function _doResize() {
		const buttons = $( 'button[id^="genesis-mobile-"]' ).attr( 'id' );
		if ( 'undefined' === typeof buttons ) {
			return;
		}
		_maybeClose( buttons );
		_superfishToggle( buttons );
		_changeSkipLink( buttons );
		_combineMenus( buttons );
	}

	/**
	 * Add the nav- class of the related navigation menu as
	 * an ID to associated button (helps target specific buttons outside of context).
	 */
	function _addClassID() {
		const $this = $( this );
		const nav = $this.next( 'nav' );
		const id = 'class';

		$this.attr(
			'id',
			'genesis-mobile-' +
				$( nav )
					.attr( id )
					.match( /nav-\w*\b/ )
		);
	}

	/**
	 * Combine our menus if the mobile menu is visible.
	 *
	 * @params buttons
	 */
	function _combineMenus( buttons ) {

		// Exit early if there are no menus to combine.
		if ( null === menusToCombine ) {
			return;
		}

		// Split up the menus to combine based on order of appearance in the array.
		const primaryMenu = menusToCombine[0];
		const combinedMenus = $( menusToCombine ).filter( function( index ) {
			if ( 0 < index ) {
				return index;
			}
		});

		// If the responsive menu is active, append items in 'combinedMenus' object to the 'primaryMenu' object.
		if ( 'none' !== _getDisplayValue( buttons ) ) {
			$.each( combinedMenus, function( key, value ) {
				$( value )
					.find( '.menu > li' )
					.addClass( 'moved-item-' + value.replace( '.', '' ) )
					.appendTo( primaryMenu + ' ul.genesis-nav-menu' );
			});
			$( _getMenuSelectorString( combinedMenus ) ).hide();
		} else {
			$( _getMenuSelectorString( combinedMenus ) ).show();
			$.each( combinedMenus, function( key, value ) {
				$( '.moved-item-' + value.replace( '.', '' ) )
					.appendTo( value + ' ul.genesis-nav-menu' )
					.removeClass( 'moved-item-' + value.replace( '.', '' ) );
			});
		}
	}

	/**
	 * Action to happen when the main menu button is clicked.
	 */
	function _mainmenuToggle() {
		const $this = $( this );
		_toggleAria( $this, 'aria-pressed' );
		_toggleAria( $this, 'aria-expanded' );
		$this.toggleClass( 'activated' );
		$this.next( 'nav' ).slideToggle( 'fast' );
	}

	/**
	 * Action for submenu toggles.
	 */
	function _submenuToggle() {
		const $this = $( this );
		const others = $this.closest( '.menu-item' ).siblings();
		_toggleAria( $this, 'aria-pressed' );
		_toggleAria( $this, 'aria-expanded' );
		$this.toggleClass( 'activated' );
		$this.next( '.sub-menu' ).slideToggle( 'fast' );

		others
			.find( '.' + subMenuButtonClass )
			.removeClass( 'activated' )
			.attr( 'aria-pressed', 'false' );
		others.find( '.sub-menu' ).slideUp( 'fast' );
	}

	/**
	 * Activate/deactivate superfish.
	 *
	 * @params buttons
	 */
	function _superfishToggle( buttons ) {
		const _superfish = $( '.' + responsiveMenuClass + ' .js-superfish' );
		let $args = 'destroy';
		if ( 'function' !== typeof _superfish.superfish ) {
			return;
		}
		if ( 'none' === _getDisplayValue( buttons ) ) {
			$args = {
				delay: 100,
				animation: { opacity: 'show', height: 'show' },
				dropShadows: false,
				speed: 'fast'
			};
		}
		_superfish.superfish( $args );
	}

	/**
	 * Modify skip link to match mobile buttons.
	 *
	 * @param buttons
	 */
	function _changeSkipLink( buttons ) {

		// Start with an empty array.
		let menuToggleList = _getAllMenusArray();

		// Exit out if there are no menu items to update.
		if ( 0 < ! $( menuToggleList ).length ) {
			return;
		}

		$.each( menuToggleList, function( key, value ) {
			let newValue = value.replace( '.', '' );
			let startLink = 'genesis-' + newValue;
			let endLink = 'genesis-mobile-' + newValue;

			if ( 'none' === _getDisplayValue( buttons ) ) {
				startLink = 'genesis-mobile-' + newValue;
				endLink = 'genesis-' + newValue;
			}

			let $item = $( '.genesis-skip-link a[href="#' + startLink + '"]' );

			if ( null !== menusToCombine && value !== menusToCombine[0]) {
				$item.toggleClass( 'skip-link-hidden' );
			}

			if ( 0 < $item.length ) {
				let link = $item.attr( 'href' );
				link = link.replace( startLink, endLink );

				$item.attr( 'href', link );
			} else {
				return;
			}
		});
	}

	/**
	 * Close all the menu toggles if buttons are hidden.
	 *
	 * @param buttons
	 */
	function _maybeClose( buttons ) {
		if ( 'none' !== _getDisplayValue( buttons ) ) {
			return true;
		}

		$(
			'.' +
				mainMenuButtonClass +
				', .' +
				responsiveMenuClass +
				' .sub-menu-toggle'
		)
			.removeClass( 'activated' )
			.attr( 'aria-expanded', false )
			.attr( 'aria-pressed', false );

		$(
			'.' + responsiveMenuClass + ', .' + responsiveMenuClass + ' .sub-menu'
		).attr( 'style', '' );
	}

	/**
	 * Generic function to get the display value of an element.
	 *
	 * @param  {id} $id ID to check
	 * @return {string}     CSS value of display property
	 */
	function _getDisplayValue( $id ) {
		const element = document.getElementById( $id );
		const style = window.getComputedStyle( element );
		return style.getPropertyValue( 'display' );
	}

	/**
	 * Toggle aria attributes.
	 *
	 * @param  {button} $this     passed through
	 * @param  {aria-xx} attribute aria attribute to toggle
	 * @return {bool}           from _ariaReturn
	 */
	function _toggleAria( $this, attribute ) {
		$this.attr( attribute, function( index, value ) {
			return 'false' === value;
		});
	}

	/**
	 * Helper function to return a comma separated string of menu selectors.
	 *
	 * @param {itemArray} Array of menu items to loop through.
	 * @param {ignoreSecondary} boolean of whether to ignore the 'secondary' menu item.
	 * @return {string} Comma-separated string.
	 */
	function _getMenuSelectorString( itemArray ) {
		let itemString = $.map( itemArray, function( value, key ) {
			return value;
		});

		return itemString.join( ',' );
	}

	/**
	 * Helper function to return a group array of all the menus in
	 * both the 'others' and 'combine' arrays.
	 *
	 * @return {array} Array of all menu items as class selectors.
	 */
	function _getAllMenusArray() {

		// Start with an empty array.
		let menuList = [];

		// If there are menus in the 'menusToCombine' array, add them to 'menuList'.
		if ( null !== menusToCombine ) {
			$.each( menusToCombine, function( key, value ) {
				menuList.push( value.valueOf() );
			});
		}

		// Add menus in the 'others' array to 'menuList'.
		$.each( genesisMenus.others, function( key, value ) {
			menuList.push( value.valueOf() );
		});

		if ( 0 < menuList.length ) {
			return menuList;
		} else {
			return null;
		}
	}

	$( document ).ready( function() {
		if ( null !== _getAllMenusArray() ) {
			genesisMenu.init();
		}
	});
}( document, jQuery ) );
