/////////////////
// # type1, redux
// import configure from './configure';

// export default configure();

////////////////
// # type2, mobx
import ProfileStore from './ProfileStore';
import FoodStore from './FoodStore';
import RouterStore from './RouterStore';

// export const stores = {
//   foodStore: new FoodStore()
// }
class RootStore {
	constructor() {
		this.profileStore = new ProfileStore(this);
		this.foodStore = new FoodStore(this);
		this.routerStore = new RouterStore(this);
	}
}

export default RootStore;
