import { decorate, observable, action, computed } from 'mobx';
// import { computedDecorator } from 'mobx/lib/internal';

class ProfileStore {
	id = '';
	name = '';
	email = '';
	avatar = '';
	language = 'ko'; // ko, en, jp, zh
	nation = 'Korea';
	city = 1; // 'Seoul'
	// filterList = [];
	filterList = '';

	constructor(root) {
		this.root = root;
	}

	filterListSplice(index) {
		console.log('!!!filterListSplice index: ' + index);
		console.log(this.filterList);
		this.filterList.splice(index, 1);
		// this.filterList = this.filterList.splice(index, 1);
		console.log(this.filterList);
	}

	filterListPush(name) {
		console.log('!!!filterListPush name: ' + name);
		console.log(this.filterList);
		this.filterList.push(name);
		// this.filterList = this.filterList.replace(name);
		console.log(this.filterList);
	}
}

decorate(ProfileStore, {
	id: observable,
	name: observable,
	email: observable,
	avatar: observable,
	language: observable,
	nation: observable,
	city: observable,
	filterList: observable,
	filterListSplice: action,
	filterListPush: action,
});

export default ProfileStore;
