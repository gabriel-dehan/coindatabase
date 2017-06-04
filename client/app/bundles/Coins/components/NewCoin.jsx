import PropTypes from 'prop-types';
import React from 'react';
import Pikaday from 'pikaday';

class NewCoin extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  emptyCoin() {
    return {
      name: '',
      symbol: '',
      link: '',
      announcement_thread: '',
      description: '',
      algorithm: '',
      reward: '',
      max_cap: '',
      halving: 'Unknown',
      premined: 'Unknown',
      had_ico: 'Unknown',
      ethereum_token: 'Unknown',
      announcement_date: '',
      notable_facts: [],
      pros: [],
      cons: []
    };
  };

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      coin: this.emptyCoin(),
      expandForm: false
    };
  };

  componentDidMount() {
    new Pikaday({
      field: this.refs.announcement_date
    });

    $(this.refs.description).froalaEditor({
      toolbarButtons: ['bold', 'italic', 'underline', 'fontSize', '|',  'insertLink', 'insertTable', 'insertHR', '|', 'quote', 'formatOL', 'formatUL', '|', 'undo', 'redo', '|', 'help'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'fontSize', '|',  'insertLink', 'insertTable', 'insertHR', '|', 'quote', 'formatOL', 'formatUL', '|', 'undo', 'redo', '|', 'help'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'fontSize', '|', 'insertLink', 'insertHR', '|', 'undo', 'redo', '|', 'help'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'fontSize', '|', 'insertLink', 'insertHR', '|', 'undo', 'redo', '|', 'help'],
      pluginsEnabled: ['help', 'link', 'fontSize', 'inlineStyle', 'lists', 'url', 'lineBreaker', 'quote', 'entities', 'table']
    });
  }

  toggleExpandedForm = (e) => {
    this.setState({ expandForm: !this.state.expandForm });
  };

  updateCoin = (e) => {
    let {coin} = this.state;
    let value = e.target.value;

    if (e.target.type == "checkbox") {
      value = e.target.checked;
    }

    var attr_name = e.target.name ? e.target.name : $(e.target).parents('.form-group').find('input, textarea').attr('name');

    if (attr_name == "pros[]" ) {
      let i = $(e.target).parents('.pro-container').data("index");
      coin.pros[i] = value;
    } else if (attr_name == "cons[]" ) {
      let i = $(e.target).parents('.con-container').data("index");
      coin.cons[i] = value;
    } else if (attr_name == "description") {
      coin[attr_name] = $(e.target).html();
    } else {
      console.log(attr_name, value);
      coin[attr_name] = value;
    }

    this.setState({coin});
  };

  fetchCoinData = (e) => {
    console.log('Fetching data for ', e.target.value);
  };

  addPro = (e) => {
    let coin = this.state.coin;
    coin.pros.push("");
    this.setState({coin});
  };

  addCon = (e) => {
    let coin = this.state.coin;
    coin.cons.push("");
    this.setState({coin});
  };

  removePro = (e) => {
    let i = $(e.target).parents('.pro-container').data("index");
    let coin = this.state.coin;
    _.pullAt(coin.pros, i);
    this.setState({coin});
  }

  removeCon = (e) => {
    let i = $(e.target).parents('.con-container').data("index");
    let coin = this.state.coin;
    _.pullAt(coin.cons, i);
    this.setState({coin});
  }

  onSubmit = (e) => {
    e.preventDefault();
    var coin = this.state.coin;
    console.log('Before save', coin);
    this.props.actions.saveCoin(coin).then((data) => {
      const error = data.error;
      const status = !error ? 'success' : 'error';
      if (error) {
        this.props.actions.setAlert({ type: status, message: error });
      } else {
        this.props.actions.setAlert({ type: status, message: 'This coin has been successfully submitted.' });
        this.setState({ coin: this.emptyCoin() });
        $(this.refs.description).froalaEditor('html.set', '');
      }
    });
  };
  
  render() {
    const {actions} = this.props;

    return (
      <div className="new-coin-container">
        <form className="new-coin-form" onChange={this.updateCoin} onKeyUp={this.updateCoin} onSubmit={this.onSubmit}>
          <div className="basic-info">
            <div className="form-group">
              <input className="form-input" type="text" name="name" value={this.state.coin.name} placeholder="Coin's name (Bitcoin)" required="required" onBlur={this.fetchCoinData}/>
            </div>
            <div className="form-group">
              <input className="form-input" type="text" name="symbol" value={this.state.coin.symbol} placeholder="Coin's code (BTC)" required="required" />
            </div>
            <div className="form-group">
              <input className="form-input" type="text" name="link" value={this.state.coin.link} placeholder="Website (leave blank if none)"/>
            </div>
            <div className="form-group">
              <input className="form-input" type="text" name="announcement_thread" value={this.state.coin.announcement_thread} placeholder="Announcement thread (leave blank if none)"/>
            </div>
            <div className="form-group">
              <textarea className="form-input" name="description" ref="description" placeholder="Start describing this coin with what you know" required="required" value={this.state.coin.description}></textarea>
            </div>
          </div>

          <div className="more-information">
            <span className="btn toggle-more-info" onClick={this.toggleExpandedForm}>{this.state.expandForm ? 'Hide' : 'Add more information'}</span>
          </div>
          <div className={`coin-specs ${this.state.expandForm ? 'expanded' : 'collapsed'}`}>
            <div className="form-group">
              <input className="form-input" type="text" name="algorithm" value={this.state.coin.algorithm} placeholder="Algorithms used (PoS, PoW...)" />
            </div>
            <div className="form-group">
              <input className="form-input" type="text" name="reward" value={this.state.coin.reward} placeholder="Reward per block" />
            </div>
            <div className="form-group">
              <input className="form-input" type="text" name="max_cap" value={this.state.coin.max_cap} placeholder="Maximum number of coins (leave empty if none)" />
            </div>
            <div className="form-group">
              <label className="form-switch">
                <input type="checkbox" name="halving" defaultChecked={this.state.coin.halving} />
                <i className="form-icon"></i> Is the reward reduced over time ?
              </label>
            </div>
            <div className="form-group">
              <label className="form-switch">
                <input type="checkbox" name="premined" defaultChecked={this.state.coin.premined} />
                <i className="form-icon"></i> Is this coin premined ?
              </label>
            </div>
            <div className="form-group">
              <label className="form-switch">
                <input type="checkbox" name="had_ico" defaultChecked={this.state.coin.had_ico} />
                <i className="form-icon"></i> Did this coin have an ICO ?
              </label>
            </div>
            <div className="form-group">
              <label className="form-switch">
                <input type="checkbox" name="ethereum_token" defaultChecked={this.state.coin.ethereum_token} />
                <i className="form-icon"></i> Is this an Ethereum token ?
              </label>
            </div>
            <div className="form-group">
              <input className="form-input" type="text" ref="announcement_date" name="announcement_date" value={this.state.coin.announcement_date} placeholder="Announcement or Genesis date" />
            </div>
          </div>

          <div className="pros-cons columns">
            <div className="pros column col-6">
              Pros
              <span onClick={this.addPro}>Add a pro</span>
              <ul>
                {this.state.coin.pros.map((pro, i) => {
                  return (
                    <li key={`pro-${i}`}  data-index={i} className="pro-container">
                      <input type="text" name="pros[]" value={pro} placeholder="Great thing this coin does" />
                      <span onClick={this.removePro}>Remove</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="cons column col-6">
              Cons
              <span onClick={this.addCon}>Add a con</span>
              <ul>
                {this.state.coin.cons.map((con, i) => {
                  return (
                    <li key={`con-${i}`} data-index={i} className="con-container">
                      <input type="text" name="cons[]" value={con} placeholder="Not so great thing this coin does" />
                      <span onClick={this.removeCon}>Remove</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <button type="submit" disabled={!this.state.coin.symbol}>{this.state.coin.symbol ? `Submit ${this.state.coin.symbol}` : 'Submit coin'}</button>
        </form>

      </div>
    );
  }
};

export default NewCoin;
