// import { createContext } from "react";
import { decorate, observable, action } from 'mobx';

class FoodStore {
	food_id = -1;
	store_id = -1;
	ingredient_list = [];
	cook_list = [];
	eat_list = [];
	history_list = [];
	caution_list = [];

	constructor(root) {
		this.root = root;
	}
}

decorate(FoodStore, {
	food_id: observable,
	store_id: observable,
	ingredient_list: observable,
	cook_list: observable,
	eat_list: observable,
	history_list: observable,
	caution_list: observable,
});

// export const FoodStoreContext = createContext(new FoodStore());
export default FoodStore;
