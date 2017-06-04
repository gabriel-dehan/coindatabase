const ifLoggedIn = (function(callback) {
  if (window.CoinDB.loggedIn) { return callback(); }
});

const ifLoggedOut = (function(callback) {
  if (!window.CoinDB.loggedIn) { return callback(); }
});


export { ifLoggedIn, ifLoggedOut };
