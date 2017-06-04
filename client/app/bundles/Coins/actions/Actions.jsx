import {observable, action, computed} from 'mobx';
import CoreActions from '../../Core/actions/Actions';
import {CoinAPI} from '../../../lib/api';
import CoinStore from '../stores/CoinStore';

var Actions = {
  connection: null,
  saveCoin(coin) {
    return CoinAPI.save(coin).then((data) => {
      if (data.coin) {
        CoinStore.create(data.coin);
      }
      return data;
    });
  },
};

Actions = {...Actions, ...CoreActions};

export default Actions;
