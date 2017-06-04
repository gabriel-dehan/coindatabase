window.__corsProxyEnabled = false;
jQuery.ajaxPrefilter(function(options) {
  if (window.__corsProxyEnabled && options.crossDomain && jQuery.support.cors) {
    console.log("Setting up CORS", options.crossDomain);
    options.url = 'http://0.0.0.0:8080/' + options.url;
  } 
});
