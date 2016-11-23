import AssetLoader from './AssetLoader';

export default class ImagesLoader extends AssetLoader {

	constructor() {
		super();
	}

	prepare(url, id, manager) {
		let pixelRatio = window.getDevicePixelRatio() < 1.5 ? 1 : 2;

		let files = manager.manifest.image[id];
		for(let i=0; i<files.length; i++) {
			let file = files[i];

			if(file.indexOf('@' + pixelRatio + 'x') >= 0) {
				let finalUrl = url + id + '/' + file;
				let name = file.substr(0, file.indexOf('@' + pixelRatio + 'x', ''));

				manager.load(finalUrl, {
					type: 'image',
					alias: id + '-image-' + name,
					onComplete: function() {
						let image = manager.getAlias(id + '-image-' + name);
						let baseTexture = new PIXI.BaseTexture(image, PIXI.SCALE_MODES.DEFAULT, pixelRatio);
						let texture = new PIXI.Texture(baseTexture);

						manager.cache.set('baseTexture#' + id + name, baseTexture);
						manager.cache.set('image#' + id + name, texture);
					}
				});
			}
		}
	}

	unload(id, cache) {
		for(let name in cache.cache) {
			if(name.startsWith('image#' + id) || name.startsWith('baseTexture#' + id)) {
				cache.remove(name);
			}
		}
	}

}
