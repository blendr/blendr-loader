import AssetLoader from './AssetLoader';

export default class SpriteLoader extends AssetLoader {

	constructor() {
		super();
	}

	prepare(url, id, manager) {
		let pixelRatio = window.getDevicePixelRatio() < 1.5 ? 1 : 2;
		let pixelRatioSuffix = '@' + pixelRatio + 'x';

		// only load @1x frames definition
		manager.load(url + id + '@1x.json', {
			type: 'json',
			alias: id + '-json'
		});
		manager.load(url + id + pixelRatioSuffix + '.png', {
			type: 'image',
			alias: id + '-image'
		});
	}

	onComplete(id, manager) {
		let pixelRatio = window.getDevicePixelRatio() < 1.5 ? 1 : 2;

		let json = manager.getAlias(id + '-json');
		let image = manager.getAlias(id + '-image');

		let baseTexture = new PIXI.BaseTexture(image, PIXI.SCALE_MODES.DEFAULT, pixelRatio);
		manager.cache.set('sprite#' + id + '!baseTexture', baseTexture);

		for(let name in json.frames) {
			let frame = json.frames[name];
			let texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h));

			// remove extension
			//name = name.replace(/\.[^/.]+$/, "");
			let name = name.substr(0, name.lastIndexOf('@'));

			manager.cache.set('sprite#' + id + name, texture);
		}
	}

	unload(id, cache) {
		for(let name in cache.cache) {
			if(name.startsWith('sprite#' + id)) {
				let texture = cache.remove(name);
				texture.destroy();
			}
		}
	}

}
