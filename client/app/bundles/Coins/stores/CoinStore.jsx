import {observable, action, computed} from 'mobx';
import Coin from '../../../models/Coin';

class CoinStore {
  @observable coins = [];

  initialize(coins) {
    _.each(coins, this.create);
  };

  find(symbol) {
    return _.find(this.coins, (coin) => coin.symbol === symbol);
  };

  create = (data) => {
    return this.coins.push(new Coin(data));
  };

  @computed get display() {
    return this.coins.peek();
  };
}

const Store = new CoinStore();
export default Store;
