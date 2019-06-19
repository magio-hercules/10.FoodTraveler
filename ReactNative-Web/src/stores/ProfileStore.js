import { decorate, observable, action } from 'mobx';

class ProfileStore {
	language = 'ko'; // ko, en, jp, zh

	constructor(root) {
		this.root = root;
	}
}

decorate(ProfileStore, {
	language: observable,
});

export default ProfileStore;
