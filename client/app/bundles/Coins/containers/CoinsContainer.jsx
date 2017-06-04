// Vendor
import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, action, computed} from 'mobx';
import _ from 'lodash';

// Libs
import {ifLoggedIn, ifLoggedOut} from '../../Core/lib/Auth';

// Actions
import Actions from '../actions/Actions';

// Components
import Coins from '../components/Coins';

// Stores
import CoinStore from '../stores/CoinStore';
import AlertsStore from '../../Core/stores/AlertsStore';

const Store = { coins: CoinStore, alerts: AlertsStore };

@observer
class CoinsContainer extends React.Component {
  constructor(props, _railsContext) {
    var {coins} = props;
    Store.coins.initialize(coins);

    super(props);
  };

  render() {
    var props = { actions: Actions, store: Store, ...this.props, ifLoggedIn, ifLoggedOut };
    return (<Coins {...props} />);
  }
};

export default CoinsContainer;

