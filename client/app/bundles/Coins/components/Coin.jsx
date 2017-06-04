import PropTypes from 'prop-types';
import React from 'react';
import Pikaday from 'pikaday';

class Coin extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    coin: PropTypes.object.isRequired
  };

  constructor(props, _railsContext) {
    super(props);
    this.state = {
    };
  };

  render() {
    const {coin} = this.props;

    return (
      <div className="coin-wrapper">
        <div className="coin-container">
          <h2>{coin.name}</h2> - <h3>{coin.symbol}</h3>
          <div className="coin-links">
            {coin.website ? <a href="{coin.link}">Website</a> : '' }
            {coin.announcement_thread ? <a href="{coin.announcement_thread}">Announcement</a> : ''}
          </div>
          <div className="coin-market-cap-data">
            <h4>Coin data</h4>
            <ul>
              <li>USD: {coin.price_usd}$</li>
              <li>BTC: {coin.price_btc}BTC</li>
              <li>Volume (24h): {coin.volume_usd_24h}$</li>
              <li>Supply: {coin.available_supply}</li>
              <li>Change (1h): {coin.percent_change_1h}%</li>
              <li>Change (24h): {coin.percent_change_24h}%</li>
              <li>Change (7d): {coin.percent_change_7d}%</li>
            </ul>
          </div>
          <div className="coin-description-container">
            <h4>Description</h4>
            <div className="coin-description" dangerouslySetInnerHTML={{__html: coin.description}}></div>
          </div>
          <div className="coin-features">
            <h4>Features</h4>
          </div>

          <div className="coin-notable-facts">
            <h4>Notable facts</h4>
          </div>

          <div className="coin-pros-cons">
            <div className="coin-pros">
              <h4>Pros</h4>
            </div>
            <div className="coin-cons">
              <h4>Pros</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Coin;
