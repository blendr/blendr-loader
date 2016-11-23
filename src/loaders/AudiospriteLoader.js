import AssetLoader from './AssetLoader';
import { Howl } from 'howler';

export default class AudiospriteLoader extends AssetLoader {

	constructor() {
		super();
	}

	prepare(url, id, manager) {
	}

	onComplete(files, loadr, id) {
		let howl = new Howl({
			src: [`${loadr.serverUrl}${id}.mp3`, `${loadr.serverUrl}${id}.mp3`],
			sprite: files.json.sprite,
			onload: function() {
				// declare files as loaded
				loadr.cache.set(id + '-audiosprite', howl);
			}
		});
	}

/*
	unload(id, cache) {
		let howl = cache.remove(id + '-audiosprite');

		if(howl) {
			howl.unload();
		}
	}
*/
}
