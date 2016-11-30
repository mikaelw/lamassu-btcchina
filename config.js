'use strict';

var _ = require('lodash');

exports.NAME = 'BTCChina';
exports.SUPPORTED_MODULES = ['ticker'];
exports.API_ENDPOINT = 'https://data.btcchina.com/data/ticker';


exports.SATOSHI_FACTOR = 1e8;
exports.FUDGE_FACTOR = 1.05;

exports.config = function config(localConfig) {
  if (localConfig) _.merge(exports, localConfig);
};
