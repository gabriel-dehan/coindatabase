import PropTypes from 'prop-types';
import React from 'react';
import {observer} from 'mobx-react';

@observer
class CoinListItem extends React.Component {
  static propTypes = {
    coin: PropTypes.object.isRequired,
    selectCoin: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
  };
  render() {
    const {coin} = this.props;

    return (
      <li className={`coin-list-item ${this.props.selected ? 'selected' : ''}`} onClick={() => this.props.selectCoin(coin.symbol)}>
        {coin.name} {[coin.symbol]}
      </li>
    );
  }
};

export default CoinListItem;
