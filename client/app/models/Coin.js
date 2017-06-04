class Coin {
  constructor(object) {
    this.name = object.name;
    this.symbol = object.symbol;
    this.link = object.link;
    this.announcement_thread = object.announcement_thread;
    this.description = object.description;
    this.algorithm = object.algorithm;
    this.reward = object.reward;
    this.max_cap = object.max_cap;
    this.halving = object.halving;
    this.premined = object.premined;
    this.had_ico = object.had_ico;
    this.ethereum_token = object.ethereum_token;
    this.announcement_date = object.announcement_date;
    this.notable_facts = object.notable_facts;
    this.pros = object.pros;
    this.cons = object.cons;

    this.price_usd = object.price_usd;
    this.price_btc = object.price_btc;
    this.volume_usd_24h = object.volume_usd_24h;
    this.market_cap_usd = object.market_cap_usd;
    this.available_supply = object.available_supply;
    this.total_supply = object.total_supply;
    this.percent_change_1h = object.percent_change_1h;
    this.percent_change_24h = object.percent_change_24h;
    this.percent_change_7d = object.percent_change_7d;
    this.cmc_last_updated = object.cmc_last_updated;
  }
};

export default Coin;
