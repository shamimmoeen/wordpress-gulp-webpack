<?php
/**
 * Plugin Name:     Wordpress Webpack
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     wordpress-webpack
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Wordpress_Webpack
 */

// Your code starts here.

function wordpress_webpack_enqueue_scripts() {

	// Automatically load dependencies and version.
	$asset_file = require_once plugin_dir_path( __FILE__ ) . 'assets/build/bundle.asset.php';

	if ( 'development' === WP_ENVIRONMENT) {
		// Load scripts when in development.
		wp_enqueue_script(
			'wordpress-webpack-scripts',
			'http://localhost:8083' . '/bundle.js',
			$asset_file['dependencies'],
			time(),
			true
		);
	} else {
		wp_enqueue_script(
			'wordpress-webpack-scripts',
			plugin_dir_url( __FILE__ ) . 'bundle.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}

}

add_action( 'wp_enqueue_scripts', 'wordpress_webpack_enqueue_scripts' );
