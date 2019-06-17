// import { createContext } from "react";
import { decorate, observable, action } from 'mobx';

class RouterStore {
	// @observable foodId = -1;
	screen = 'Food'; // food, test

	constructor(root) {
		this.root = root;
	}
}

decorate(RouterStore, {
	screen: observable,
});

// export const FoodStoreContext = createContext(new FoodStore());
export default RouterStore;
