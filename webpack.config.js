import webpack from 'webpack';
import pkg from './package.json';

let banner = `
	${pkg.name} - ${pkg.description}
	Author: ${pkg.author}
	Version: v${pkg.version}
	Url: ${pkg.homepage}
	License(s): ${pkg.license}
`;

export default {
	output: {
		filename: `${pkg.name}.js`,
		libraryTarget: 'umd',
		library: pkg.name
	},
	externals: {},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				//query: {
				//	presets: ['latest']
				//}
			}
		]
	},
	devtool: '#inline-source-map',
	plugins: [
		new webpack.BannerPlugin(banner)
	]
};
