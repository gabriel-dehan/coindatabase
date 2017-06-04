//import Trade from '../models/trade';
import _ from 'lodash';

const Network = {};

Network.API = (function() {
  this.headers = new Headers();

  this.headers.append('Accept', 'application/json');
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('X-User-Email', CoinDB.ENV.user);
  this.headers.append('X-User-Token', CoinDB.ENV.token);

  this.defaultPayload = {
    method: 'GET',
    headers: this.headers,
    body: {},
    mode: 'same-origin',
    cache: 'default'
  };
});

Network.API.prototype.call = (function(url, payload = {}) {
  var request = new Request(url);
  console.log(payload);
  var finalPayload = {...this.defaultPayload, ...payload};
  console.log(finalPayload);

  return fetch(request, finalPayload)
    .then((response) => {
      return response.text();
    })
    .then((raw) => {
      return JSON.parse(raw);
    });
});


Network.CoinAPI = (function() {
  this.client = new Network.API();
});

Network.CoinAPI.prototype.save = (function(coin) {
  const url = CoinDB.routes.api_v1_coins_path();
  return this.client.call(url, { method: "POST", body: JSON.stringify({coin}) });
});


export const API = new Network.API();
export const CoinAPI =  new Network.CoinAPI();

