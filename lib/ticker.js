'use strict';

var Wreck = require('wreck');
var async = require('async');
var _ = require('lodash');


// copy relevant convienient constants
var config        = require('../config');
var API_ENDPOINT  = config.API_ENDPOINT;


function getTickerUrls(currencies) {

  var urls = [];

  if (currencies.indexOf('CNY') !== -1)
    urls.push(API_ENDPOINT + '?market=btccny');

  return urls;
}

function formatResponse(currencies, results, callback) {
  //console.log(results);
  var cnyRate = {};
  var response = {};

  if(!_.isEmpty(results)) {
    cnyRate.ask  =  parseFloat(results[0].ticker.sell);
    cnyRate.bid = parseFloat(results[0].ticker.buy);

    if (currencies.indexOf('CNY') !== -1)
      response.CNY = {
        currency: 'CNY',
        rates: {
          ask: cnyRate.ask,
          bid: cnyRate.bid
        }
      };
  }

  if (currencies.length !== Object.keys(response).length)
    return callback(new Error('Unsupported currency'));

  callback(null, response);
}


exports.ticker = function ticker(currencies, callback) {


  if (typeof currencies === 'string')
    currencies = [currencies];

  currencies.sort();

  if(currencies.length === 0)
    return callback(new Error('Currency not specified'));

  var urls = getTickerUrls(currencies);

  if (typeof currencies === 'string')
    currencies = [currencies];

  currencies.sort();

  if(currencies.length === 0)
    return callback(new Error('Currency not specified'));

  var urls = getTickerUrls(currencies);

  // change each url on the list into a download job
  var downloadList = urls.map(function(url) {
    return function(cb) {
      Wreck.get(url, { json:true }, function(err, res, payload) {
        cb(err, payload);
      });
    };
  });

  async.parallel(downloadList, function(err, results) {
    if (err) return callback(err);

    formatResponse(currencies, results, callback);
  });
};
