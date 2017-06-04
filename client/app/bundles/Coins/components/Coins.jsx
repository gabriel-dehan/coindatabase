import PropTypes from 'prop-types';
import React from 'react';
import {observer} from 'mobx-react';

import CoinsList from './CoinsList';
import NewCoin from './NewCoin';
import Coin from './Coin';

@observer
class Coins extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      currentCoin: 'BTC',
      addCoinMode: false
    };
  };

  componentDidMount() {
    //this.props.actions.connect({ exchanges: this.props.exchanges, groupByOrder: true });
  };

  componentWillUnmount() {
    //this.props.actions.disconnect();
  };

  addCoin = () => {
    this.setState({ addCoinMode: true });
  };

  selectCoin = (symbol) => {
    this.setState({ addCoinMode: false, currentCoin: symbol });
  };

  render() {
    const {alerts, coins} = this.props.store;
    const props = {addCoin: this.addCoin, ...this.props};

    const currentCoin = coins.find(this.state.currentCoin);
    var currentCoinDisplay = null;
    var alertsDisplay = null;

    if (alerts.hasAlerts) {
      alertsDisplay = (
        <div className={`alert-container alert-${alerts.type}`}>
          {alerts[alerts.type].message}
        </div>
      );
    }

    if (currentCoin) {
      currentCoinDisplay = (<Coin {...this.props} coin={currentCoin} />);
    }

    return (
      <div className="columns">
        <div className="column col-3">
          {this.props.ifLoggedIn(() => (
              <div className="add-coin">
                <button onClick={this.addCoin}>Add a coin</button>
              </div>
          ))}

          <CoinsList {...props} selectCoin={this.selectCoin} currentCoin={this.state.currentCoin} />
        </div>
        <div className="column col-9">
          {alertsDisplay}
          {this.state.addCoinMode ? <NewCoin {...this.props} /> : currentCoinDisplay}
        </div>
      </div>
    );
  }
};

export default Coins;
