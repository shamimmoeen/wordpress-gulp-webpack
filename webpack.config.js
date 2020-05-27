const defaults = require( '@wordpress/scripts/config/webpack.config' );
const chokidar = require( 'chokidar' );

const devPort = 8083; // This should be an available port to listen hmr, socket connections.

module.exports = {
	...defaults,

	entry: './assets/typescript/main.ts',

	output: {
		path: __dirname + '/assets/build',
		publicPath: '/',
		filename: 'bundle.js',
	},

	module: {
		...defaults.module,
		rules: [
			...defaults.module.rules,
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},

	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
	},

	devServer: {
		before( app, server ) {
			chokidar.watch( [
				'./**/*.php',
			] ).on( 'all', function () {
				server.sockWrite( server.sockets, 'content-changed' );
			} );
		},

		// open: true,
		hot: false,
		// hotOnly: true,
		liveReload: true,
		publicPath: '/',
		port: devPort,
		proxy: {
			'/': {
				target: 'http://habijabi.test/', // This is the url of your wordpress website.
				changeOrigin: true,
			},
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	},
};
