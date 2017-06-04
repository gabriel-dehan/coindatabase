import PropTypes from 'prop-types';
import React from 'react';
import {observer} from 'mobx-react';

import CoinListItem from './CoinListItem';

@observer
class CoinsList extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    selectCoin: PropTypes.func.isRequired
  };

  constructor(props, _railsContext) {
    super(props);
    this.state = {
    };
  };

  addCoin = (e) => {
    this.props.addCoin();
  };

  render() {
    const store = this.props.store.coins;

    return (
      <div className="coins-list">
        <input type="text" placeholder="Search"/>
        <ul>
          {store.coins.map((coin, i) => <CoinListItem key={`coin-list-${i}`} coin={coin} selectCoin={this.props.selectCoin} selected={this.props.currentCoin === coin.symbol} />)}
        </ul>
      </div>
    );
  }
};

export default CoinsList;
