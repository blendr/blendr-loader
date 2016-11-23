import AssetLoader from './AssetLoader';
import Unpacker from '../Unpacker.js';

export default class PackLoader extends AssetLoader {

	constructor() {
		super();

		// children files does not need to be physically present
		this.virtualChildren = true;
	}

	onComplete(files, loadr) {
		let pack = new Unpacker(files.pack, files.json);

		for(let file in pack.files) {

			let type = loadr.manifest.files[file] ? loadr.manifest.files[file].type : 'text';
			let url = `${loadr.serverUrl}${file}`;
			let data;

			switch(type) {
				case 'arraybuffer':
					data = pack.getData(file);
					break;
				case 'json':
					data = JSON.parse(pack.getString(file));
					break;
				case 'image':
					data = pack.getURI(file);
					break;
				case 'text':
				default:
					data = pack.getString(file);
			}

			loadr.cache.set(url, data);
		}
	}

}
